const processDefs = [
  ["INIT", "Inicializacion"],
  ["START_WAIT", "Espera de arranque"],
  ["READ_LINE", "Lectura de sensores de linea"],
  ["READ_ULTRA", "Lectura de sensor ultrasonico"],
  ["BUSCAR", "Busqueda de oponente"],
  ["ATACAR", "Ataque"],
  ["EVITAR_BORDE", "Evasion de borde"],
  ["RETROCEDER", "Retroceso"],
  ["GIRO_IZQUIERDO", "Giro izquierdo"],
  ["GIRO_DERECHO", "Giro derecho"],
  ["DETENER", "Detencion"],
  ["BUZZER", "Buzzer activo"],
];

const state = {
  demo: false,
  connection: "Desconectado",
  firmware: "Esperando",
  action: "INIT",
  tcrtLeft: 0,
  tcrtRight: 0,
  tcrtBack: 0,
  tcrtStability: "stable",
  distanceCm: -1,
  opponent: 0,
  motorLeft: "DETENIDO",
  motorRight: "DETENIDO",
  buzzer: "OFF",
  buzzerReason: "Sin sonido activo",
  completed: new Set(),
};

let arduinoPort;
let arduinoReader;
let arduinoWriter;
let readLoopActive = false;
let serialBuffer = "";
let buzzerTimer;
let unstableTimer;
const eventLines = [];

const els = {
  demoToggle: document.querySelector("#demoToggle"),
  demoNotice: document.querySelector("#demoNotice"),
  connectArduino: document.querySelector("#connectArduino"),
  disconnectArduino: document.querySelector("#disconnectArduino"),
  connectionDot: document.querySelector("#connectionDot"),
  connectionState: document.querySelector("#connectionState"),
  firmwareState: document.querySelector("#firmwareState"),
  currentAction: document.querySelector("#currentAction"),
  distanceValue: document.querySelector("#distanceValue"),
  distanceMeter: document.querySelector("#distanceMeter"),
  distanceDetail: document.querySelector("#distanceDetail"),
  opponentDetail: document.querySelector("#opponentDetail"),
  ultrasonicStatus: document.querySelector("#ultrasonicStatus"),
  processList: document.querySelector("#processList"),
  lineLeft: document.querySelector("#lineLeft"),
  lineRight: document.querySelector("#lineRight"),
  lineBack: document.querySelector("#lineBack"),
  motorLeft: document.querySelector("#motorLeft"),
  motorRight: document.querySelector("#motorRight"),
  buzzerIndicator: document.querySelector("#buzzerIndicator"),
  buzzerStatus: document.querySelector("#buzzerStatus"),
  buzzerReason: document.querySelector("#buzzerReason"),
  eventLog: document.querySelector("#eventLog"),
  lastUpdate: document.querySelector("#lastUpdate"),
  modeDescription: document.querySelector("#modeDescription"),
  nodes: {
    arduino: document.querySelector("#nodeArduino"),
    shield: document.querySelector("#nodeShield"),
    hcsr04: document.querySelector("#nodeHcsr04"),
    tcrtLeft: document.querySelector("#nodeTcrtLeft"),
    tcrtRight: document.querySelector("#nodeTcrtRight"),
    tcrtBack: document.querySelector("#nodeTcrtBack"),
    servoLeft: document.querySelector("#nodeServoLeft"),
    servoRight: document.querySelector("#nodeServoRight"),
    buzzer: document.querySelector("#nodeBuzzer"),
    power: document.querySelector("#nodePower"),
  },
  cards: {
    ultrasonic: document.querySelector("#cardUltrasonic"),
    line: document.querySelector("#cardLine"),
    motors: document.querySelector("#cardMotors"),
    buzzer: document.querySelector("#cardBuzzer"),
  },
};

function initProcesses() {
  els.processList.innerHTML = processDefs.map(([key, label]) => `
    <div class="process-item" data-process="${key}">
      <span class="process-light"></span>
      <strong>${label}</strong>
      <span>Inactivo</span>
    </div>
  `).join("");
}

function actionLabel(action) {
  const found = processDefs.find(([key]) => key === action);
  return found ? found[1] : action;
}

function logEvent(message) {
  const line = `${new Date().toLocaleTimeString()}  ${message}`;
  eventLines.unshift(line);
  if (eventLines.length > 80) eventLines.pop();
  els.eventLog.textContent = eventLines.join("\n");
  els.lastUpdate.textContent = line;
}

function setAction(action, source = "panel") {
  if (!action) return;
  if (state.action !== action) {
    state.completed.add(state.action);
    state.action = action;
    logEvent(`${source}: ${actionLabel(action)}`);
  } else {
    state.action = action;
  }
}

function classifyLine(value, unstable = false) {
  if (unstable) return "warn";
  return value ? "alert" : "ok";
}

function setClassGroup(element, stateClass) {
  element.classList.remove("active", "alert", "warn", "ok", "moving", "reverse", "pulse");
  if (stateClass) stateClass.split(" ").forEach((name) => element.classList.add(name));
}

function renderProcessList() {
  document.querySelectorAll(".process-item").forEach((item) => {
    const key = item.dataset.process;
    const label = item.querySelector("span:last-child");
    item.classList.remove("active", "done", "alert");
    if (key === state.action || (key === "BUZZER" && state.buzzer === "ON")) {
      item.classList.add(key === "EVITAR_BORDE" ? "alert" : "active");
      label.textContent = key === "EVITAR_BORDE" ? "Alerta" : "Activo";
    } else if (state.completed.has(key)) {
      item.classList.add("done");
      label.textContent = "Completado";
    } else {
      label.textContent = "Inactivo";
    }
  });
}

function renderLineSensor(element, label, value) {
  const unstable = state.tcrtStability === "unstable";
  const cls = classifyLine(value, unstable);
  element.className = `sensor-pill ${cls}`;
  if (unstable) element.textContent = `${label}: Lectura inestable`;
  else element.textContent = `${label}: ${value ? "Borde detectado" : "Sin borde"}`;
}

function renderMotor(element, value) {
  const em = element.querySelector("em");
  element.classList.remove("moving", "reverse");
  let label = "Detenido";
  if (value === "AVANZAR") {
    label = "Avanzando";
    element.classList.add("moving");
  } else if (value === "RETROCEDER") {
    label = "Retrocediendo";
    element.classList.add("reverse");
  } else if (value === "GIRANDO") {
    label = "Girando";
    element.classList.add("moving");
  } else if (value === "ATAQUE") {
    label = "Ataque";
    element.classList.add("moving");
  }
  em.textContent = label;
}

function render() {
  const connected = state.connection === "Conectado";
  els.connectionDot.classList.toggle("connected", connected);
  els.connectionState.innerHTML = `<span id="connectionDot" class="dot ${connected ? "connected" : ""}"></span> ${state.connection}`;
  els.connectArduino.disabled = connected;
  els.disconnectArduino.disabled = !connected;
  els.firmwareState.textContent = state.firmware;
  els.currentAction.textContent = actionLabel(state.action);
  els.demoToggle.textContent = state.demo ? "Modo demo ON" : "Modo demo OFF";
  els.demoNotice.classList.toggle("hidden", !state.demo);
  els.modeDescription.textContent = state.demo
    ? "Modo demo activo: los estados son simulados desde el panel."
    : "Datos reales por Web Serial cuando se conecte Arduino; modo demo disponible para video.";

  const distanceText = state.distanceCm >= 0 ? `${state.distanceCm} cm` : "Sin eco";
  els.distanceValue.textContent = distanceText;
  els.distanceDetail.textContent = distanceText;
  els.distanceMeter.value = state.distanceCm > 0 ? Math.min(state.distanceCm, 120) : 0;
  els.opponentDetail.textContent = state.opponent ? "Si" : "No";

  let ultraClass = "";
  let ultraStatus = "Sin objeto";
  if (state.distanceCm < 0) {
    ultraClass = "warn";
    ultraStatus = "Error de lectura / sin eco";
  } else if (state.distanceCm <= 15) {
    ultraClass = "alert";
    ultraStatus = "Objeto cerca / atacar";
  } else if (state.distanceCm <= 35) {
    ultraClass = "active";
    ultraStatus = "Objeto en rango";
  } else if (state.distanceCm <= 80) {
    ultraStatus = "Objeto lejos";
  }
  els.ultrasonicStatus.textContent = ultraStatus;

  renderLineSensor(els.lineLeft, "Left D3", state.tcrtLeft);
  renderLineSensor(els.lineRight, "Right D2", state.tcrtRight);
  renderLineSensor(els.lineBack, "Back D0", state.tcrtBack);

  renderMotor(els.motorLeft, state.motorLeft);
  renderMotor(els.motorRight, state.motorRight);

  els.buzzerIndicator.classList.toggle("on", state.buzzer === "ON");
  els.buzzerStatus.textContent = state.buzzer === "ON" ? "Activo" : "Apagado";
  els.buzzerReason.textContent = state.buzzerReason;

  setClassGroup(els.cards.ultrasonic, ultraClass);
  setClassGroup(els.cards.line, (state.tcrtLeft || state.tcrtRight || state.tcrtBack) ? "alert" : "");
  setClassGroup(els.cards.motors, (state.motorLeft !== "DETENIDO" || state.motorRight !== "DETENIDO") ? "active" : "");
  setClassGroup(els.cards.buzzer, state.buzzer === "ON" ? "warn" : "");

  setClassGroup(els.nodes.arduino, connected ? "active" : "");
  setClassGroup(els.nodes.shield, "active");
  setClassGroup(els.nodes.power, "active");
  setClassGroup(els.nodes.hcsr04, ultraClass || "active");
  setClassGroup(els.nodes.tcrtLeft, classifyLine(state.tcrtLeft, state.tcrtStability === "unstable"));
  setClassGroup(els.nodes.tcrtRight, classifyLine(state.tcrtRight, state.tcrtStability === "unstable"));
  setClassGroup(els.nodes.tcrtBack, classifyLine(state.tcrtBack, state.tcrtStability === "unstable"));
  setClassGroup(els.nodes.servoLeft, state.motorLeft === "DETENIDO" ? "" : "active pulse");
  setClassGroup(els.nodes.servoRight, state.motorRight === "DETENIDO" ? "" : "active pulse");
  setClassGroup(els.nodes.buzzer, state.buzzer === "ON" ? "warn pulse" : "");

  renderProcessList();
}

function applyTelemetry(update, source = "serial") {
  if (update.state) setAction(update.state, source);
  if ("left" in update) state.tcrtLeft = Number(update.left);
  if ("right" in update) state.tcrtRight = Number(update.right);
  if ("back" in update) state.tcrtBack = Number(update.back);
  if ("distance" in update) {
    state.distanceCm = Number(update.distance);
    state.opponent = state.distanceCm > 0 && state.distanceCm <= 35 ? 1 : 0;
  }
  if ("opponent" in update) state.opponent = Number(update.opponent);
  if (update.motorLeft) state.motorLeft = update.motorLeft;
  if (update.motorRight) state.motorRight = update.motorRight;
  if (update.buzzer) {
    state.buzzer = update.buzzer;
    state.buzzerReason = update.reason || (update.buzzer === "ON" ? "Evento del robot" : "Sin sonido activo");
  }
  render();
}

function parseArduinoLine(line) {
  if (!line) return;
  logEvent(`Serial: ${line}`);
  if (line.includes("Robot Minisumo") || line.includes("FUNCIONAL_PROBADO")) state.firmware = "Detectado";

  const legacy = line.match(/Distancia=(-?\d+)\s+L=(\d)\s+R=(\d)\s+B=(\d)/);
  if (legacy) {
    applyTelemetry({
      distance: Number(legacy[1]),
      left: Number(legacy[2]),
      right: Number(legacy[3]),
      back: Number(legacy[4]),
    }, "serial");
    return;
  }

  const [rawKey, ...rest] = line.split(":");
  const key = rawKey.trim();
  const value = rest.join(":").trim();
  if (!key || !rest.length) return;

  const update = {};
  if (key === "STATE") update.state = value;
  if (key === "TCRT_LEFT") update.left = Number(value);
  if (key === "TCRT_RIGHT") update.right = Number(value);
  if (key === "TCRT_BACK") update.back = Number(value);
  if (key === "DIST_CM") update.distance = Number(value);
  if (key === "OPONENTE") update.opponent = Number(value);
  if (key === "MOTOR_LEFT") update.motorLeft = value;
  if (key === "MOTOR_RIGHT") update.motorRight = value;
  if (key === "BUZZER") update.buzzer = value;
  applyTelemetry(update, "serial");
}

function handleSerialText(text) {
  serialBuffer += text;
  const lines = serialBuffer.split(/\r?\n/);
  serialBuffer = lines.pop();
  lines.forEach((line) => parseArduinoLine(line.trim()));
}

async function connectToArduino() {
  if (!("serial" in navigator)) {
    state.connection = "Web Serial no disponible";
    logEvent("Este navegador no expone Web Serial API. Usa modo demo.");
    render();
    return;
  }
  arduinoPort = await navigator.serial.requestPort();
  await arduinoPort.open({ baudRate: 9600 });
  arduinoWriter = arduinoPort.writable?.getWriter();
  readLoopActive = true;
  state.connection = "Conectado";
  state.demo = false;
  logEvent("Arduino conectado por Web Serial.");
  render();
  readArduinoLoop();
}

async function disconnectFromArduino() {
  readLoopActive = false;
  if (arduinoReader) await arduinoReader.cancel().catch(() => {});
  if (arduinoWriter) {
    arduinoWriter.releaseLock();
    arduinoWriter = undefined;
  }
  if (arduinoPort) await arduinoPort.close().catch(() => {});
  arduinoPort = undefined;
  state.connection = "Desconectado";
  logEvent("Arduino desconectado.");
  render();
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
      logEvent(`Error serial: ${error.message}`);
    } finally {
      arduinoReader.releaseLock();
      arduinoReader = undefined;
    }
  }
}

function setDemoEnabled(enabled) {
  state.demo = enabled;
  if (enabled) {
    state.connection = "Modo demo";
    logEvent("Modo demo activado.");
  } else {
    state.connection = arduinoPort ? "Conectado" : "Desconectado";
    logEvent("Modo demo desactivado.");
  }
  render();
}

function resetLineSensors() {
  state.tcrtLeft = 0;
  state.tcrtRight = 0;
  state.tcrtBack = 0;
  state.tcrtStability = "stable";
}

function activateBuzzer(reason) {
  clearTimeout(buzzerTimer);
  state.buzzer = "ON";
  state.buzzerReason = reason;
  buzzerTimer = setTimeout(() => {
    state.buzzer = "OFF";
    state.buzzerReason = "Sin sonido activo";
    render();
  }, 1200);
}

function demoScenario(name) {
  setDemoEnabled(true);
  clearTimeout(unstableTimer);
  resetLineSensors();
  state.distanceCm = 70;
  state.opponent = 0;
  state.motorLeft = "DETENIDO";
  state.motorRight = "DETENIDO";
  state.buzzer = "OFF";
  state.buzzerReason = "Sin sonido activo";

  if (name === "EDGE_LEFT") {
    state.tcrtLeft = 1;
    setAction("EVITAR_BORDE", "demo");
    state.motorLeft = "RETROCEDER";
    state.motorRight = "RETROCEDER";
    activateBuzzer("Alerta borde izquierdo");
  }
  if (name === "EDGE_RIGHT") {
    state.tcrtRight = 1;
    setAction("EVITAR_BORDE", "demo");
    state.motorLeft = "RETROCEDER";
    state.motorRight = "RETROCEDER";
    activateBuzzer("Alerta borde derecho");
  }
  if (name === "EDGE_BACK") {
    state.tcrtBack = 1;
    setAction("EVITAR_BORDE", "demo");
    state.motorLeft = "RETROCEDER";
    state.motorRight = "RETROCEDER";
    activateBuzzer("Alerta borde trasero");
  }
  if (name === "UNSTABLE_LINE") {
    state.tcrtStability = "unstable";
    setAction("READ_LINE", "demo");
    logEvent("demo: sensores de linea con lectura inestable.");
  }
  if (name === "OPPONENT_CLOSE") {
    state.distanceCm = 20;
    state.opponent = 1;
    setAction("READ_ULTRA", "demo");
  }
  if (name === "ATTACK") {
    state.distanceCm = 18;
    state.opponent = 1;
    setAction("ATACAR", "demo");
    state.motorLeft = "ATAQUE";
    state.motorRight = "ATAQUE";
    activateBuzzer("Ataque");
  }
  if (name === "SEARCH") {
    state.distanceCm = 90;
    setAction("BUSCAR", "demo");
    state.motorLeft = "GIRANDO";
    state.motorRight = "GIRANDO";
  }
  if (name === "REVERSE") {
    setAction("RETROCEDER", "demo");
    state.motorLeft = "RETROCEDER";
    state.motorRight = "RETROCEDER";
  }
  if (name === "TURN_LEFT") {
    setAction("GIRO_IZQUIERDO", "demo");
    state.motorLeft = "RETROCEDER";
    state.motorRight = "AVANZAR";
  }
  if (name === "TURN_RIGHT") {
    setAction("GIRO_DERECHO", "demo");
    state.motorLeft = "AVANZAR";
    state.motorRight = "RETROCEDER";
  }
  if (name === "BUZZER") {
    setAction("BUZZER", "demo");
    activateBuzzer("Activado manualmente");
  }
  if (name === "STOP") {
    setAction("DETENER", "demo");
    state.motorLeft = "DETENIDO";
    state.motorRight = "DETENIDO";
    state.distanceCm = -1;
  }
  render();
}

els.demoToggle.addEventListener("click", () => setDemoEnabled(!state.demo));
els.connectArduino.addEventListener("click", () => {
  connectToArduino().catch((error) => {
    state.connection = "Error de conexion";
    logEvent(`Error de conexion: ${error.message}`);
    render();
  });
});
els.disconnectArduino.addEventListener("click", () => {
  disconnectFromArduino().catch((error) => logEvent(`Error al desconectar: ${error.message}`));
});

document.querySelectorAll("[data-demo]").forEach((button) => {
  button.addEventListener("click", () => demoScenario(button.dataset.demo));
});

initProcesses();
logEvent("Panel listo para monitoreo y grabacion.");
render();
