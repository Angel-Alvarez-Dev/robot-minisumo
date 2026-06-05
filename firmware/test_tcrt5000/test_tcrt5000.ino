const byte PIN_TCRT_LEFT = 3;
const byte PIN_TCRT_RIGHT = 2;
const byte PIN_TCRT_BACK = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TCRT_LEFT, INPUT_PULLUP);
  pinMode(PIN_TCRT_RIGHT, INPUT_PULLUP);
  pinMode(PIN_TCRT_BACK, INPUT_PULLUP);
  Serial.println("Prueba RAW TCRT5000: Left D3, Right D2, Back D0");
  Serial.println("Nota: Back usa D0/RX; si falla carga o Serial, desconectar temporalmente Back.");
}

void loop() {
  int left = digitalRead(PIN_TCRT_LEFT);
  int right = digitalRead(PIN_TCRT_RIGHT);
  int back = digitalRead(PIN_TCRT_BACK);
  Serial.print("RAW Left=");
  Serial.print(left);
  Serial.print(" Right=");
  Serial.print(right);
  Serial.print(" Back=");
  Serial.println(back);
  delay(250);
}
