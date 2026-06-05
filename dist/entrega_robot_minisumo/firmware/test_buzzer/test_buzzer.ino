const byte PIN_BUZZER = 7;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_BUZZER, LOW);
  Serial.println("Prueba KY-012 en D7");
}

void loop() {
  digitalWrite(PIN_BUZZER, HIGH);
  delay(250);
  digitalWrite(PIN_BUZZER, LOW);
  delay(1000);
}
