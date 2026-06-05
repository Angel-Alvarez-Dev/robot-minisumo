const byte PIN_TCRT_LEFT = 2;
const byte PIN_TCRT_RIGHT = 3;
const byte PIN_TCRT_BACK = 6;
const bool LINE_ACTIVE_LOW = true;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TCRT_LEFT, INPUT);
  pinMode(PIN_TCRT_RIGHT, INPUT);
  pinMode(PIN_TCRT_BACK, INPUT);
  Serial.println("Prueba TCRT5000: Left D2, Right D3, Back D6");
}

void loop() {
  Serial.print("Left=");
  Serial.print(detectarLinea(PIN_TCRT_LEFT) ? "BORDE" : "OK");
  Serial.print(" Right=");
  Serial.print(detectarLinea(PIN_TCRT_RIGHT) ? "BORDE" : "OK");
  Serial.print(" Back=");
  Serial.println(detectarLinea(PIN_TCRT_BACK) ? "BORDE" : "OK");
  delay(300);
}

bool detectarLinea(byte pin) {
  int lectura = digitalRead(pin);
  return LINE_ACTIVE_LOW ? lectura == LOW : lectura == HIGH;
}
