const byte PIN_TRIG_HCSR04 = 4;
const byte PIN_ECHO_HCSR04 = 5;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TRIG_HCSR04, OUTPUT);
  pinMode(PIN_ECHO_HCSR04, INPUT);
  digitalWrite(PIN_TRIG_HCSR04, LOW);
  Serial.println("Prueba HC-SR04: Trig D4, Echo D5");
}

void loop() {
  long distancia = leerUltrasonico();
  Serial.print("Distancia cm: ");
  Serial.println(distancia);
  delay(300);
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
