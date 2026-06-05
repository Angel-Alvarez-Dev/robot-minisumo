const pinout = [
  ["TCRT5000 Left", "D2", "TCRT_LEFT"],
  ["TCRT5000 Right", "D3", "TCRT_RIGHT"],
  ["TCRT5000 Back", "D6", "TCRT_BACK"],
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
