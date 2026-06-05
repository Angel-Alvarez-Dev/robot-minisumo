const byte PIN_SERVO_LEFT = 9;
const byte PIN_SERVO_RIGHT = 10;

const int SERVO_STOP_US = 1500;
const int SERVO_LEFT_FORWARD_US = 1700;
const int SERVO_LEFT_REVERSE_US = 1300;
const int SERVO_RIGHT_FORWARD_US = 1300;
const int SERVO_RIGHT_REVERSE_US = 1700;
const unsigned long SERVO_PERIOD_US = 20000UL;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_SERVO_LEFT, OUTPUT);
  pinMode(PIN_SERVO_RIGHT, OUTPUT);
  detener();
  Serial.println("Prueba SG90 D9/D10 sin libreria Servo. Requiere rotacion continua para traccion.");
}

void loop() {
  Serial.println("Avanzar");
  moverDurante(SERVO_LEFT_FORWARD_US, SERVO_RIGHT_FORWARD_US, 800);
  detenerDurante(700);
  Serial.println("Retroceder");
  moverDurante(SERVO_LEFT_REVERSE_US, SERVO_RIGHT_REVERSE_US, 800);
  detenerDurante(1200);
}

void moverDurante(int pulsoLeft, int pulsoRight, unsigned long duracionMs) {
  unsigned long inicio = millis();
  while (millis() - inicio < duracionMs) {
    emitirPulsoServo(PIN_SERVO_LEFT, pulsoLeft);
    emitirPulsoServo(PIN_SERVO_RIGHT, pulsoRight);
    delayMicroseconds(SERVO_PERIOD_US - pulsoLeft - pulsoRight);
  }
}

void detenerDurante(unsigned long duracionMs) {
  moverDurante(SERVO_STOP_US, SERVO_STOP_US, duracionMs);
}

void detener() {
  digitalWrite(PIN_SERVO_LEFT, LOW);
  digitalWrite(PIN_SERVO_RIGHT, LOW);
}

void emitirPulsoServo(byte pin, int anchoUs) {
  digitalWrite(pin, HIGH);
  delayMicroseconds(anchoUs);
  digitalWrite(pin, LOW);
}
