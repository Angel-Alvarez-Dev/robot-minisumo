#define FIRMWARE_NAME "Robot Minisumo Final"
#define FIRMWARE_VERSION "1.0.0-funcional"
#define FIRMWARE_STATUS "FUNCIONAL_PROBADO"

const byte PIN_TCRT_LEFT = 3;
const byte PIN_TCRT_RIGHT = 2;
const byte PIN_TCRT_BACK = 0;
const byte PIN_TRIG_HCSR04 = 4;
const byte PIN_ECHO_HCSR04 = 5;
const byte PIN_BUZZER = 7;
const byte PIN_SERVO_LEFT = 9;
const byte PIN_SERVO_RIGHT = 10;

// Calibracion final probada:
// - TCRT5000 activo en LOW con los modulos conectados a D3/D2/D0.
// - D0 corresponde a RX Serial; desconectar TCRT Back durante carga si interfiere.
// - SG90 de rotacion continua: 1700 us avanza en D9, 1300 us retrocede.
const bool LINE_ACTIVE_LOW = true;
const unsigned int DISTANCIA_ATAQUE_CM = 35;
const unsigned int TIEMPO_ARRANQUE_MS = 3000;
const unsigned long PANEL_INTERVALO_MS = 250;

const int SERVO_STOP_US = 1500;
const int SERVO_LEFT_FORWARD_US = 1700;
const int SERVO_LEFT_REVERSE_US = 1300;
const int SERVO_RIGHT_FORWARD_US = 1300;
const int SERVO_RIGHT_REVERSE_US = 1700;
const unsigned long SERVO_PERIOD_US = 20000UL;

struct LecturaLinea {
  bool left;
  bool right;
  bool back;
};

int pulsoServoLeft = SERVO_STOP_US;
int pulsoServoRight = SERVO_STOP_US;
unsigned long ultimoPulsoServo = 0;
unsigned long ultimoEstadoPanel = 0;
LecturaLinea ultimaLinea = {false, false, false};
long ultimaDistanciaCm = -1;
bool ultimoOponenteDetectado = false;
const char* estadoPanel = "INIT";
const char* motorLeftPanel = "DETENIDO";
const char* motorRightPanel = "DETENIDO";
const char* buzzerPanel = "OFF";

void configurarPines();
long leerUltrasonico();
LecturaLinea leerSensoresLinea();
bool leerLineaDigital(byte pin);
void avanzar();
void retroceder();
void girarIzquierda();
void girarDerecha();
void detenerRobot();
void buscarOponente();
void atacar();
void evitarBorde();
void sonarBuzzer();
void sonarBuzzer(unsigned int duracionMs);
void pruebaSensores();
void pruebaServos();
void procesarComandoSerial();
void actualizarServos();
void emitirPulsoServo(byte pin, int anchoUs);
void setServos(int leftUs, int rightUs);
void publicarEstadoPanel();

void setup() {
  Serial.begin(9600);
  configurarPines();
  detenerRobot();
  Serial.println(FIRMWARE_NAME);
  Serial.println(FIRMWARE_VERSION);
  Serial.println(FIRMWARE_STATUS);
  Serial.println("Robot Minisumo - Pinout real: TCRT L/R/B D3/D2/D0");
  Serial.println("Prototipo fisico funcional: SG90 D9/D10 y sensores finales confirmados.");
  Serial.println("Advertencia: TCRT Back usa D0/RX; desconectar para cargar firmware si es necesario.");
  estadoPanel = "START_WAIT";
  ultimaLinea = leerSensoresLinea();
  publicarEstadoPanel();
  sonarBuzzer(120);
  delay(TIEMPO_ARRANQUE_MS);
  estadoPanel = "BUSCAR";
  publicarEstadoPanel();
  sonarBuzzer(80);
}

void loop() {
  actualizarServos();
  procesarComandoSerial();

  estadoPanel = "READ_LINE";
  LecturaLinea linea = leerSensoresLinea();
  ultimaLinea = linea;
  publicarEstadoPanel();
  if (linea.left || linea.right || linea.back) {
    estadoPanel = "EVITAR_BORDE";
    publicarEstadoPanel();
    evitarBorde();
    publicarEstadoPanel();
    return;
  }

  estadoPanel = "READ_ULTRA";
  long distancia = leerUltrasonico();
  ultimaDistanciaCm = distancia;
  ultimoOponenteDetectado = distancia > 0 && distancia <= DISTANCIA_ATAQUE_CM;
  publicarEstadoPanel();
  if (ultimoOponenteDetectado) {
    atacar();
  } else {
    buscarOponente();
  }
  publicarEstadoPanel();
}

void configurarPines() {
  pinMode(PIN_TCRT_LEFT, INPUT_PULLUP);
  pinMode(PIN_TCRT_RIGHT, INPUT_PULLUP);
  pinMode(PIN_TCRT_BACK, INPUT_PULLUP);
  pinMode(PIN_TRIG_HCSR04, OUTPUT);
  pinMode(PIN_ECHO_HCSR04, INPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_SERVO_LEFT, OUTPUT);
  pinMode(PIN_SERVO_RIGHT, OUTPUT);
  digitalWrite(PIN_TRIG_HCSR04, LOW);
  digitalWrite(PIN_BUZZER, LOW);
  digitalWrite(PIN_SERVO_LEFT, LOW);
  digitalWrite(PIN_SERVO_RIGHT, LOW);
}

long leerUltrasonico() {
  digitalWrite(PIN_TRIG_HCSR04, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG_HCSR04, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG_HCSR04, LOW);
  unsigned long duracion = pulseIn(PIN_ECHO_HCSR04, HIGH, 25000UL);
  if (duracion == 0) return -1;
  return (long)(duracion * 0.0343 / 2.0);
}

LecturaLinea leerSensoresLinea() {
  LecturaLinea lectura;
  lectura.left = leerLineaDigital(PIN_TCRT_LEFT);
  lectura.right = leerLineaDigital(PIN_TCRT_RIGHT);
  lectura.back = leerLineaDigital(PIN_TCRT_BACK);
  return lectura;
}

bool leerLineaDigital(byte pin) {
  int valor = digitalRead(pin);
  return LINE_ACTIVE_LOW ? valor == LOW : valor == HIGH;
}

void avanzar() {
  setServos(SERVO_LEFT_FORWARD_US, SERVO_RIGHT_FORWARD_US);
  motorLeftPanel = "AVANZAR";
  motorRightPanel = "AVANZAR";
}

void retroceder() {
  setServos(SERVO_LEFT_REVERSE_US, SERVO_RIGHT_REVERSE_US);
  motorLeftPanel = "RETROCEDER";
  motorRightPanel = "RETROCEDER";
}

void girarIzquierda() {
  setServos(SERVO_LEFT_REVERSE_US, SERVO_RIGHT_FORWARD_US);
  motorLeftPanel = "RETROCEDER";
  motorRightPanel = "AVANZAR";
}

void girarDerecha() {
  setServos(SERVO_LEFT_FORWARD_US, SERVO_RIGHT_REVERSE_US);
  motorLeftPanel = "AVANZAR";
  motorRightPanel = "RETROCEDER";
}

void detenerRobot() {
  setServos(SERVO_STOP_US, SERVO_STOP_US);
  motorLeftPanel = "DETENIDO";
  motorRightPanel = "DETENIDO";
}

void buscarOponente() {
  estadoPanel = "BUSCAR";
  girarDerecha();
  publicarEstadoPanel();
  delay(80);
}

void atacar() {
  estadoPanel = "ATACAR";
  avanzar();
  motorLeftPanel = "ATAQUE";
  motorRightPanel = "ATAQUE";
  publicarEstadoPanel();
  sonarBuzzer(25);
  delay(120);
}

void evitarBorde() {
  estadoPanel = "EVITAR_BORDE";
  LecturaLinea linea = leerSensoresLinea();
  ultimaLinea = linea;
  sonarBuzzer(120);
  estadoPanel = "RETROCEDER";
  retroceder();
  publicarEstadoPanel();
  delay(350);
  if (linea.left && !linea.right) {
    estadoPanel = "GIRO_DERECHO";
    girarDerecha();
  } else if (linea.right && !linea.left) {
    estadoPanel = "GIRO_IZQUIERDO";
    girarIzquierda();
  } else {
    estadoPanel = "GIRO_DERECHO";
    girarDerecha();
  }
  publicarEstadoPanel();
  delay(linea.back ? 500 : 350);
  estadoPanel = "DETENER";
  detenerRobot();
  publicarEstadoPanel();
}

void sonarBuzzer(unsigned int duracionMs) {
  buzzerPanel = "ON";
  digitalWrite(PIN_BUZZER, HIGH);
  ultimoEstadoPanel = 0;
  publicarEstadoPanel();
  delay(duracionMs);
  digitalWrite(PIN_BUZZER, LOW);
  buzzerPanel = "OFF";
  ultimoEstadoPanel = 0;
  publicarEstadoPanel();
}

void sonarBuzzer() {
  sonarBuzzer(80);
}

void pruebaSensores() {
  long distancia = leerUltrasonico();
  LecturaLinea linea = leerSensoresLinea();
  ultimaDistanciaCm = distancia;
  ultimaLinea = linea;
  ultimoOponenteDetectado = distancia > 0 && distancia <= DISTANCIA_ATAQUE_CM;
  Serial.print("Distancia=");
  Serial.print(distancia);
  Serial.print(" L=");
  Serial.print(linea.left);
  Serial.print(" R=");
  Serial.print(linea.right);
  Serial.print(" B=");
  Serial.println(linea.back);
  ultimoEstadoPanel = 0;
  publicarEstadoPanel();
}

void pruebaServos() {
  avanzar();
  delay(500);
  detenerRobot();
  delay(300);
  retroceder();
  delay(500);
  detenerRobot();
}

void procesarComandoSerial() {
  if (!Serial.available()) return;
  char comando = Serial.read();
  switch (comando) {
    case 's': pruebaSensores(); break;
    case 'v': estadoPanel = "INIT"; pruebaServos(); publicarEstadoPanel(); break;
    case 'b': estadoPanel = "BUZZER"; sonarBuzzer(); break;
    case 'a': estadoPanel = "ATACAR"; avanzar(); publicarEstadoPanel(); delay(500); detenerRobot(); break;
    case 'd': estadoPanel = "DETENER"; detenerRobot(); publicarEstadoPanel(); break;
    default: break;
  }
}

void setServos(int leftUs, int rightUs) {
  pulsoServoLeft = constrain(leftUs, 1000, 2000);
  pulsoServoRight = constrain(rightUs, 1000, 2000);
}

void actualizarServos() {
  if (micros() - ultimoPulsoServo < SERVO_PERIOD_US) return;
  ultimoPulsoServo = micros();
  emitirPulsoServo(PIN_SERVO_LEFT, pulsoServoLeft);
  emitirPulsoServo(PIN_SERVO_RIGHT, pulsoServoRight);
}

void emitirPulsoServo(byte pin, int anchoUs) {
  digitalWrite(pin, HIGH);
  delayMicroseconds(anchoUs);
  digitalWrite(pin, LOW);
}

void publicarEstadoPanel() {
  unsigned long ahora = millis();
  if (ultimoEstadoPanel != 0 && ahora - ultimoEstadoPanel < PANEL_INTERVALO_MS) return;
  ultimoEstadoPanel = ahora;

  Serial.print("STATE:");
  Serial.println(estadoPanel);
  Serial.print("TCRT_LEFT:");
  Serial.println(ultimaLinea.left ? 1 : 0);
  Serial.print("TCRT_RIGHT:");
  Serial.println(ultimaLinea.right ? 1 : 0);
  Serial.print("TCRT_BACK:");
  Serial.println(ultimaLinea.back ? 1 : 0);
  Serial.print("DIST_CM:");
  Serial.println(ultimaDistanciaCm);
  Serial.print("OPONENTE:");
  Serial.println(ultimoOponenteDetectado ? 1 : 0);
  Serial.print("MOTOR_LEFT:");
  Serial.println(motorLeftPanel);
  Serial.print("MOTOR_RIGHT:");
  Serial.println(motorRightPanel);
  Serial.print("BUZZER:");
  Serial.println(buzzerPanel);
}

