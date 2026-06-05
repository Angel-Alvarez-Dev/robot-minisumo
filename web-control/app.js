const pinout = [
  ["TCRT5000 Left", "D3", "TCRT_LEFT"],
  ["TCRT5000 Right", "D2", "TCRT_RIGHT"],
  ["TCRT5000 Back", "D0", "TCRT_BACK"],
  ["HC-SR04 Trig", "D4", "TRIG_HCSR04"],
  ["HC-SR04 Echo", "D5", "ECHO_HCSR04"],
  ["KY-012", "D7", "BUZZER_SIG"],
  ["SG90 Left", "D9", "SERVO_LEFT"],
  ["SG90 Right", "D10", "SERVO_RIGHT"],
];

document.querySelector("#pinout").innerHTML = `<tr><th>Componente</th><th>Pin</th><th>Senal</th></tr>` +
  pinout.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("");

const distance = document.querySelector("#distance");
const distanceOut = document.querySelector("#distanceOut");
const decision = document.querySelector("#decision");
const buzzerState = document.querySelector("#buzzerState");
const servoState = document.querySelector("#servoState");
const connectionDot = document.querySelector("#connectionDot");
const connectionState = document.querySelector("#connectionState");
const portState = document.querySelector("#portState");
const lastUpdate = document.querySelector("#lastUpdate");
const firmwareState = document.querySelector("#firmwareState");
const arduinoDistance = document.querySelector("#arduinoDistance");
const arduinoLeft = document.querySelector("#arduinoLeft");
const arduinoRight = document.querySelector("#arduinoRight");
const arduinoBack = document.querySelector("#arduinoBack");
const connectArduino = document.querySelector("#connectArduino");
const disconnectArduino = document.querySelector("#disconnectArduino");
const readArduino = document.querySelector("#readArduino");
const autoArduino = document.querySelector("#autoArduino");
const serialLog = document.querySelector("#serialLog");

let arduinoPort;
let arduinoReader;
let arduinoWriter;
let readLoopActive = false;
let autoTimer;
let serialBuffer = "";
let serialLines = [];

function render() {
  const edge = document.querySelector("#left").checked || document.querySelector("#right").checked || document.querySelector("#back").checked;
  const near = Number(distance.value) <= 35;
  distanceOut.textContent = `${distance.value} cm`;
  if (edge) decision.textContent = "Borde detectado: retroceder y girar.";
  else if (near) decision.textContent = "Oponente cerca: atacar.";
  else decision.textContent = "Buscando oponente.";
}

document.querySelectorAll("input").forEach((input) => input.addEventListener("input", render));
document.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
  const action = button.dataset.action;
  if (action === "forward") servoState.textContent = "Avanzar: Left 1700 us, Right 1300 us";
  if (action === "reverse") servoState.textContent = "Retroceder: Left 1300 us, Right 1700 us";
  if (action === "stop") servoState.textContent = "Servos detenidos: 1500 us";
  if (action === "buzzer") {
    buzzerState.textContent = "Buzzer ON";
    setTimeout(() => { buzzerState.textContent = "Buzzer OFF"; }, 450);
  }
}));
render();

function setConnection(connected, label) {
  connectionDot.classList.toggle("connected", connected);
  connectionState.textContent = label || (connected ? "Conectado" : "Desconectado");
  connectArduino.disabled = connected;
  disconnectArduino.disabled = !connected;
  readArduino.disabled = !connected;
  autoArduino.disabled = !connected;
}

function formatPortInfo(port) {
  const info = port.getInfo();
  if (info.usbVendorId || info.usbProductId) {
    const vendor = info.usbVendorId ? info.usbVendorId.toString(16).padStart(4, "0") : "----";
    const product = info.usbProductId ? info.usbProductId.toString(16).padStart(4, "0") : "----";
    return `USB ${vendor}:${product}`;
  }
  return "Puerto elegido";
}

function appendSerialLine(line) {
  if (!line) return;
  serialLines.push(line);
  if (serialLines.length > 80) serialLines = serialLines.slice(-80);
  serialLog.textContent = serialLines.join("\n");
  serialLog.scrollTop = serialLog.scrollHeight;
}

function setTelemetryLabel(element, active) {
  element.textContent = active ? "Borde" : "Libre";
  element.classList.toggle("alert", active);
}

function parseArduinoLine(line) {
  appendSerialLine(line);
  if (line.includes("Robot Minisumo")) {
    firmwareState.textContent = "Detectado";
  }

  const match = line.match(/Distancia=(-?\d+)\s+L=(\d)\s+R=(\d)\s+B=(\d)/);
  if (!match) return;

  const cm = Number(match[1]);
  const left = match[2] === "1";
  const right = match[3] === "1";
  const back = match[4] === "1";

  arduinoDistance.textContent = cm > 0 ? `${cm} cm` : "Sin eco";
  setTelemetryLabel(arduinoLeft, left);
  setTelemetryLabel(arduinoRight, right);
  setTelemetryLabel(arduinoBack, back);

  if (cm > 0) distance.value = Math.min(Math.max(cm, Number(distance.min)), Number(distance.max));
  document.querySelector("#left").checked = left;
  document.querySelector("#right").checked = right;
  document.querySelector("#back").checked = back;
  lastUpdate.textContent = new Date().toLocaleTimeString();
  render();
}

function handleSerialText(text) {
  serialBuffer += text;
  const lines = serialBuffer.split(/\r?\n/);
  serialBuffer = lines.pop();
  lines.forEach((line) => parseArduinoLine(line.trim()));
}

async function sendArduinoCommand(command) {
  if (!arduinoWriter) return;
  await arduinoWriter.write(new TextEncoder().encode(command));
}

async function readArduinoLoop() {
  const decoder = new TextDecoder();
  while (readLoopActive && arduinoPort?.readable) {
    arduinoReader = arduinoPort.readable.getReader();
    try {
      while (readLoopActive) {
        const { value, done } = await arduinoReader.read();
        if (done) break;
        handleSerialText(decoder.decode(value, { stream: true }));
      }
    } catch (error) {
      appendSerialLine(`Error serial: ${error.message}`);
    } finally {
      arduinoReader.releaseLock();
      arduinoReader = undefined;
    }
  }
}

async function connectToArduino() {
  if (!("serial" in navigator)) {
    setConnection(false, "Web Serial no disponible");
    appendSerialLine("Este navegador no expone Web Serial.");
    return;
  }

  arduinoPort = await navigator.serial.requestPort();
  await arduinoPort.open({ baudRate: 9600 });
  arduinoWriter = arduinoPort.writable.getWriter();
  readLoopActive = true;
  setConnection(true);
  portState.textContent = formatPortInfo(arduinoPort);
  firmwareState.textContent = "Conectado";
  readArduinoLoop();
  setTimeout(() => sendArduinoCommand("s").catch(() => {}), 1500);
}

async function disconnectFromArduino() {
  clearInterval(autoTimer);
  autoTimer = undefined;
  autoArduino.textContent = "Auto OFF";
  readLoopActive = false;
  if (arduinoReader) await arduinoReader.cancel().catch(() => {});
  if (arduinoWriter) {
    arduinoWriter.releaseLock();
    arduinoWriter = undefined;
  }
  if (arduinoPort) await arduinoPort.close().catch(() => {});
  arduinoPort = undefined;
  portState.textContent = "Sin seleccionar";
  firmwareState.textContent = "Esperando";
  setConnection(false);
}

connectArduino.addEventListener("click", () => {
  connectToArduino().catch((error) => {
    setConnection(false, "Error de conexion");
    appendSerialLine(`Error de conexion: ${error.message}`);
  });
});

disconnectArduino.addEventListener("click", () => {
  disconnectFromArduino().catch((error) => appendSerialLine(`Error al desconectar: ${error.message}`));
});

readArduino.addEventListener("click", () => {
  sendArduinoCommand("s").catch((error) => appendSerialLine(`Error al leer: ${error.message}`));
});

autoArduino.addEventListener("click", () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = undefined;
    autoArduino.textContent = "Auto OFF";
    return;
  }
  sendArduinoCommand("s").catch(() => {});
  autoTimer = setInterval(() => sendArduinoCommand("s").catch(() => {}), 1000);
  autoArduino.textContent = "Auto ON";
});

setConnection(false);

