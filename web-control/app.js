const processDefs = [
  ["INIT", "Inicializacion"],
  ["READ_LINE", "Lectura linea"],
  ["READ_ULTRA", "Lectura US"],
  ["BUSCAR", "Buscar"],
  ["ATACAR", "Atacar"],
  ["EVITAR_BORDE", "Evadir borde"],
  ["RETROCEDER", "Retroceso"],
  ["GIRO_IZQUIERDO", "Giro izq."],
  ["GIRO_DERECHO", "Giro der."],
  ["DETENER", "Detenido"],
];

const testDefs = {
  TEST_SENSORES: {
    command: "CMD:TEST_SENSORES",
    label: "Test sensores",
    demo: () => applyTelemetry({ state: "READ_LINE", left: 0, right: 0, back: 0, distance: 42, opponent: 0 }, "panel"),
  },
  TEST_SERVOS: {
    command: "CMD:TEST_SERVOS",
    label: "Test servos",
    demo: () => applyTelemetry({ state: "GIRO_DERECHO", motorLeft: "AVANZAR", motorRight: "RETROCEDER" }, "panel"),
  },
  TEST_BUZZER: {
    command: "CMD:TEST_BUZZER",
    label: "Test buzzer",
    demo: () => activateBuzzer("Prueba rapida"),
  },
  TEST_ULTRASONICO: {
    command: "CMD:TEST_ULTRASONICO",
    label: "Test ultrasonico",
    demo: () => applyTelemetry({ state: "READ_ULTRA", distance: 23, opponent: 1 }, "panel"),
  },
  DEMO_BORDE: {
    command: "CMD:DEMO_BORDE",
    label: "Demo borde",
    demo: () => {
      applyTelemetry({
        state: "EVITAR_BORDE",
        left: 1,
        right: 0,
        back: 0,
        distance: 70,
        opponent: 0,
        motorLeft: "RETROCEDER",
        motorRight: "RETROCEDER",
      }, "demo");
      activateBuzzer("Alerta borde");
    },
  },
  DEMO_ATAQUE: {
    command: "CMD:DEMO_ATAQUE",
    label: "Demo ataque",
    demo: () => {
      applyTelemetry({
        state: "ATACAR",
        left: 0,
        right: 0,
        back: 0,
        distance: 18,
        opponent: 1,
        motorLeft: "ATAQUE",
        motorRight: "ATAQUE",
      }, "demo");
      activateBuzzer("Ataque");
    },
  },
  DEMO_BUSCAR: {
    command: "CMD:DEMO_BUSCAR",
    label: "Demo buscar",
    demo: () => applyTelemetry({
      state: "BUSCAR",
      left: 0,
      right: 0,
      back: 0,
      distance: 90,
      opponent: 0,
      motorLeft: "GIRANDO",
      motorRight: "GIRANDO",
      buzzer: "OFF",
    }, "demo"),
  },
  STOP: {
    command: "CMD:STOP",
    label: "Stop",
    demo: () => applyTelemetry({
      state: "DETENER",
      motorLeft: "DETENIDO",
      motorRight: "DETENIDO",
      buzzer: "OFF",
      distance: -1,
      opponent: 0,
    }, "panel"),
  },
};

const state = {
  demo: false,
  connection: "Desconectado",
  firmware: "No detectado",
  action: "INIT",
  tcrtLeft: 0,
  tcrtRight: 0,
  tcrtBack: 0,
  lineUnstable: false,
  distanceCm: -1,
  opponent: 0,
  motorLeft: "DETENIDO",
  motorRight: "DETENIDO",
  buzzer: "OFF",
  buzzerReason: "Sin sonido",
};

let arduinoPort;
let arduinoReader;
let arduinoWriter;
let readLoopActive = false;
let serialBuffer = "";
let buzzerTimer;
const eventLines = [];

const els = {
  demoToggle: document.querySelector("#demoToggle"),
  demoNotice: document.querySelector("#demoNotice"),
  connectArduino: document.querySelector("#connectArduino"),
  disconnectArduino: document.querySelector("#disconnectArduino"),
  connectionState: document.querySelector("#connectionState"),
  firmwareState: document.querySelector("#firmwareState"),
  distanceValue: document.querySelector("#distanceValue"),
  currentAction: document.querySelector("#currentAction"),
  modeState: document.querySelector("#modeState"),
  processStatus: document.querySelector("#processStatus"),
  activeProcess: document.querySelector("#activeProcess"),
  processList: document.querySelector("#processList"),
  opponentState: document.querySelector("#opponentState"),
  commandState: document.querySelector("#commandState"),
  lastUpdate: document.querySelector("#lastUpdate"),
  eventLog: document.querySelector("#eventLog"),
  cards: {
    tcrtLeft: document.querySelector("#cardTcrtLeft"),
    tcrtRight: document.querySelector("#cardTcrtRight"),
    tcrtBack: document.querySelector("#cardTcrtBack"),
    ultrasonic: document.querySelector("#cardUltrasonic"),
    motorLeft: document.querySelector("#cardMotorLeft"),
    motorRight: document.querySelector("#cardMotorRight"),
    buzzer: document.querySelector("#cardBuzzer"),
    motion: document.querySelector("#cardMotion"),
  },
  values: {
    lineLeft: document.querySelector("#lineLeftState"),
    lineRight: document.querySelector("#lineRightState"),
    lineBack: document.querySelector("#lineBackState"),
    ultrasonic: document.querySelector("#ultrasonicStatus"),
    distanceDetail: document.querySelector("#distanceDetail"),
    motorLeft: document.querySelector("#motorLeftState"),
    motorRight: document.querySelector("#motorRightState"),
    buzzer: document.querySelector("#buzzerStatus"),
    buzzerReason: document.querySelector("#buzzerReason"),
    motion: document.querySelector("#motionState"),
    motionDetail: document.querySelector("#motionDetail"),
  },
};

function initProcesses() {
  els.processList.innerHTML = processDefs.map(([key, label]) => (
    `<div class="process-chip" data-process="${key}">${label}</div>`
  )).join("");
}

function normalizeAction(action) {
  const aliases = {
    START_WAIT: "INIT",
    READ_ULTRASONICO: "READ_ULTRA",
    RETROCESO: "RETROCEDER",
    DETENIDO: "DETENER",
    STOP: "DETENER",
    BUZZER: "INIT",
  };
  return aliases[action] || action;
}

function actionLabel(action) {
  const key = normalizeAction(action);
  const found = processDefs.find(([processKey]) => processKey === key);
  return found ? found[1] : key;
}

function logEvent(message) {
  const line = `${new Date().toLocaleTimeString()} ${message}`;
  eventLines.unshift(line);
  if (eventLines.length > 8) eventLines.pop();
  els.eventLog.textContent = eventLines.join("\n");
  els.lastUpdate.textContent = line;
}

function setCardState(card, status) {
  card.classList.remove("ok", "active", "alert", "warn");
  if (status) card.classList.add(status);
}

function setAction(action, source = "panel") {
  const normalized = normalizeAction(action);
  if (state.action !== normalized) {
    state.action = normalized;
    logEvent(`${source} STATE:${normalized}`);
  } else {
    state.action = normalized;
  }
}

function lineLabel(value) {
  if (state.lineUnstable) return "INESTABLE";
  return value ? "BORDE" : "LIBRE";
}

function lineClass(value) {
  if (state.lineUnstable) return "warn";
  return value ? "alert" : "ok";
}

function motorLabel(value) {
  const labels = {
    AVANZAR: "AVANZA",
    RETROCEDER: "ATRAS",
    GIRANDO: "GIRA",
    ATAQUE: "ATAQUE",
    DETENIDO: "STOP",
  };
  return labels[value] || value || "STOP";
}

function motionSummary() {
  if (state.motorLeft === "DETENIDO" && state.motorRight === "DETENIDO") {
    return ["DETENIDO", "Motores quietos"];
  }
  if (state.motorLeft === "ATAQUE" || state.motorRight === "ATAQUE") {
    return ["ATAQUE", "Avance frontal"];
  }
  if (state.motorLeft === "RETROCEDER" && state.motorRight === "RETROCEDER") {
    return ["RETROCESO", "Ambos motores atras"];
  }
  if (state.motorLeft === "AVANZAR" && state.motorRight === "RETROCEDER") {
    return ["GIRO DER.", "D9 avanza / D10 atras"];
  }
  if (state.motorLeft === "RETROCEDER" && state.motorRight === "AVANZAR") {
    return ["GIRO IZQ.", "D9 atras / D10 avanza"];
  }
  if (state.motorLeft === "GIRANDO" || state.motorRight === "GIRANDO") {
    return ["BUSQUEDA", "Giro de rastreo"];
  }
  return ["MOVIENDO", "Servos activos"];
}

function renderProcesses() {
  document.querySelectorAll(".process-chip").forEach((chip) => {
    const key = chip.dataset.process;
    chip.classList.remove("active", "alert");
    if (key === state.action) {
      chip.classList.add(key === "EVITAR_BORDE" ? "alert" : "active");
    }
  });
}

function render() {
  const connected = state.connection === "Conectado";
  els.connectionState.innerHTML = `<span id="connectionDot" class="dot ${connected ? "connected" : ""}"></span>${state.connection}`;
  els.connectArduino.disabled = connected;
  els.disconnectArduino.disabled = !connected;
  els.firmwareState.textContent = state.firmware;
  els.currentAction.textContent = actionLabel(state.action);
  els.modeState.textContent = state.demo ? "Demo" : "Real";
  els.demoToggle.textContent = state.demo ? "Modo demo ON" : "Modo demo OFF";
  els.demoNotice.classList.toggle("hidden", !state.demo);
  els.activeProcess.textContent = actionLabel(state.action);
  els.processStatus.textContent = state.action === "EVITAR_BORDE" ? "Alerta" : "Activo";
  els.opponentState.textContent = `Oponente: ${state.opponent ? "Si" : "No"}`;

  const distanceText = state.distanceCm >= 0 ? `${state.distanceCm} cm` : "Sin eco";
  els.distanceValue.textContent = distanceText;
  els.values.distanceDetail.textContent = distanceText;

  els.values.lineLeft.textContent = lineLabel(state.tcrtLeft);
  els.values.lineRight.textContent = lineLabel(state.tcrtRight);
  els.values.lineBack.textContent = lineLabel(state.tcrtBack);
  setCardState(els.cards.tcrtLeft, lineClass(state.tcrtLeft));
  setCardState(els.cards.tcrtRight, lineClass(state.tcrtRight));
  setCardState(els.cards.tcrtBack, lineClass(state.tcrtBack));

  let ultraClass = "warn";
  let ultraLabel = "SIN ECO";
  if (state.distanceCm > 35) {
    ultraClass = "ok";
    ultraLabel = "LEJOS";
  } else if (state.distanceCm > 15) {
    ultraClass = "active";
    ultraLabel = "EN RANGO";
  } else if (state.distanceCm >= 0) {
    ultraClass = "alert";
    ultraLabel = "CERCA";
  }
  els.values.ultrasonic.textContent = ultraLabel;
  setCardState(els.cards.ultrasonic, ultraClass);

  els.values.motorLeft.textContent = motorLabel(state.motorLeft);
  els.values.motorRight.textContent = motorLabel(state.motorRight);
  setCardState(els.cards.motorLeft, state.motorLeft === "DETENIDO" ? "ok" : "active");
  setCardState(els.cards.motorRight, state.motorRight === "DETENIDO" ? "ok" : "active");

  els.values.buzzer.textContent = state.buzzer;
  els.values.buzzerReason.textContent = state.buzzerReason;
  setCardState(els.cards.buzzer, state.buzzer === "ON" ? "warn" : "ok");

  const [motion, detail] = motionSummary();
  els.values.motion.textContent = motion;
  els.values.motionDetail.textContent = detail;
  setCardState(els.cards.motion, motion === "DETENIDO" ? "ok" : (motion === "ATAQUE" ? "alert" : "active"));

  renderProcesses();
}

function applyTelemetry(update, source = "serial") {
  if (update.state) setAction(update.state, source);
  if ("left" in update) state.tcrtLeft = Number(update.left);
  if ("right" in update) state.tcrtRight = Number(update.right);
  if ("back" in update) state.tcrtBack = Number(update.back);
  if ("unstable" in update) state.lineUnstable = Boolean(update.unstable);
  if ("distance" in update) {
    state.distanceCm = Number(update.distance);
    state.opponent = state.distanceCm > 0 && state.distanceCm <= 35 ? 1 : 0;
  }
  if ("opponent" in update) state.opponent = Number(update.opponent);
  if (update.motorLeft) state.motorLeft = update.motorLeft;
  if (update.motorRight) state.motorRight = update.motorRight;
  if (update.buzzer) {
    state.buzzer = update.buzzer;
    state.buzzerReason = update.buzzer === "ON" ? (update.reason || "Activo") : "Sin sonido";
  }
  render();
}

function parseArduinoLine(line) {
  if (!line) return;
  logEvent(line);
  if (line.includes("Robot Minisumo") || line.includes("FUNCIONAL_PROBADO")) {
    state.firmware = "Detectado";
    render();
    return;
  }

  const legacy = line.match(/Distancia=(-?\d+)\s+L=(\d)\s+R=(\d)\s+B=(\d)/);
  if (legacy) {
    applyTelemetry({
      distance: Number(legacy[1]),
      left: Number(legacy[2]),
      right: Number(legacy[3]),
      back: Number(legacy[4]),
      unstable: false,
    }, "serial");
    return;
  }

  const [rawKey, ...rest] = line.split(":");
  if (!rest.length) return;
  const key = rawKey.trim();
  const value = rest.join(":").trim();
  const update = { unstable: false };

  if (key === "STATE") update.state = value;
  else if (key === "TCRT_LEFT") update.left = Number(value);
  else if (key === "TCRT_RIGHT") update.right = Number(value);
  else if (key === "TCRT_BACK") update.back = Number(value);
  else if (key === "DIST_CM") update.distance = Number(value);
  else if (key === "OPONENTE") update.opponent = Number(value);
  else if (key === "MOTOR_LEFT") update.motorLeft = value;
  else if (key === "MOTOR_RIGHT") update.motorRight = value;
  else if (key === "BUZZER") update.buzzer = value;
  else return;

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
    logEvent("Web Serial no disponible; usar modo demo.");
    render();
    return;
  }
  arduinoPort = await navigator.serial.requestPort();
  await arduinoPort.open({ baudRate: 9600 });
  arduinoWriter = arduinoPort.writable?.getWriter();
  readLoopActive = true;
  state.connection = "Conectado";
  state.demo = false;
  logEvent("Arduino conectado.");
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
  state.connection = enabled ? "Modo demo" : (arduinoPort ? "Conectado" : "Desconectado");
  logEvent(enabled ? "Modo demo ON" : "Modo demo OFF");
  render();
}

function activateBuzzer(reason) {
  clearTimeout(buzzerTimer);
  applyTelemetry({ buzzer: "ON", reason }, "panel");
  buzzerTimer = setTimeout(() => {
    applyTelemetry({ buzzer: "OFF" }, "panel");
  }, 900);
}

async function sendCommand(command) {
  if (!arduinoWriter) return false;
  const encoder = new TextEncoder();
  await arduinoWriter.write(encoder.encode(`${command}\n`));
  return true;
}

async function runQuickTest(name) {
  const test = testDefs[name];
  if (!test) return;

  if (!arduinoPort) setDemoEnabled(true);
  test.demo();
  els.commandState.textContent = test.command;

  try {
    const sent = await sendCommand(test.command);
    logEvent(sent ? `Enviado ${test.command}` : `Preparado ${test.command}`);
  } catch (error) {
    logEvent(`CMD error: ${error.message}`);
  }
  render();
}

els.demoToggle.addEventListener("click", () => setDemoEnabled(!state.demo));
els.connectArduino.addEventListener("click", () => {
  connectToArduino().catch((error) => {
    state.connection = "Error conexion";
    logEvent(`Error conexion: ${error.message}`);
    render();
  });
});
els.disconnectArduino.addEventListener("click", () => {
  disconnectFromArduino().catch((error) => logEvent(`Error desconectar: ${error.message}`));
});

document.querySelectorAll("[data-test]").forEach((button) => {
  button.addEventListener("click", () => runQuickTest(button.dataset.test));
});

initProcesses();
logEvent("Panel compacto listo.");
render();
