const byte PIN_SERVO_D9 = 9;
const unsigned long SERVO_PERIOD_US = 20000UL;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_SERVO_D9, OUTPUT);
  digitalWrite(PIN_SERVO_D9, LOW);
  Serial.println("Prueba aislada servo en D9");
  Serial.println("Secuencia: 1700 us, 1500 us, 1300 us, 1500 us");
}

void loop() {
  Serial.println("D9 pulso 1700 us");
  moverDurante(1700, 2000);
  Serial.println("D9 stop 1500 us");
  moverDurante(1500, 1200);
  Serial.println("D9 pulso 1300 us");
  moverDurante(1300, 2000);
  Serial.println("D9 stop 1500 us");
  moverDurante(1500, 1500);
}

void moverDurante(int pulsoUs, unsigned long duracionMs) {
  unsigned long inicio = millis();
  while (millis() - inicio < duracionMs) {
    digitalWrite(PIN_SERVO_D9, HIGH);
    delayMicroseconds(pulsoUs);
    digitalWrite(PIN_SERVO_D9, LOW);
    delayMicroseconds(SERVO_PERIOD_US - pulsoUs);
  }
}
