/*
  Robot Sumo - Arduino Nano + Expansion I/O Shield
  Hardware final:
    - 2 servomotores de traccion en D9/D10
    - 1 sensor ultrasonico HC-SR04 frontal en D5/D6
    - 3 sensores infrarrojos/linea en D2/D3/D4
    - 1 buzzer activo KY-012 en D12

  Protocolo Serial 9600 baudios:
    ENABLE, DISABLE, KILL, F, B, L, R, S, SPEED 0-255, PING

  Nota de hardware:
    Para ruedas, los servos deben ser de rotacion continua 360 grados.
    Si son servos comunes de 180 grados, se moveran por posicion y no serviran
    como traccion continua.
*/

#include <Arduino.h>
#include <avr/interrupt.h>

const byte PIN_IR_IZQ = 2;
const byte PIN_IR_DER = 3;
const byte PIN_IR_TRASERO = 4;
const byte PIN_US_TRIG = 5;
const byte PIN_US_ECHO = 6;
const byte PIN_SERVO_DER = 9;
const byte PIN_SERVO_IZQ = 10;
const byte PIN_BUZZER = 12;

const int IR_BORDE_ACTIVO = LOW;
const int SERVO_IZQ_STOP_US = 1500;
const int SERVO_DER_STOP_US = 1500;
const int SERVO_RANGO_US = 400;
const int DISTANCIA_SIN_ECO_CM = 999;
const int DISTANCIA_OPONENTE_CM = 35;
const int VELOCIDAD_ESCAPE = 90;

const unsigned long SERVO_PERIODO_US = 20000UL;
const unsigned long TELEMETRIA_MS = 250UL;
const unsigned long COMANDO_TIMEOUT_MS = 1500UL;
const unsigned long ECO_TIMEOUT_US = 25000UL;
const unsigned long ESCAPE_BORDE_MS = 350UL;

volatile bool bordeTraseroIrq = false;
volatile bool bordeIzquierdoIrq = false;
volatile bool bordeDerechoIrq = false;

bool movimientoHabilitado = false;
bool escapeBordeActivo = false;
int velocidadManual = 0;
int pulsoServoIzq = SERVO_IZQ_STOP_US;
int pulsoServoDer = SERVO_DER_STOP_US;
String comandoActual = "STOP";
String bufferSerial = "";
unsigned long ultimaTelemetria = 0;
unsigned long ultimoComandoMovimiento = 0;
unsigned long ultimoPulsoServos = 0;
unsigned long finEscapeBorde = 0;

void configurarPines();
void configurarInterrupcionesLinea();
void procesarSerial();
void ejecutarComando(String comando);
void enviarTelemetria();
long medirDistanciaCm();
bool hayBordeIzquierdo();
bool hayBordeDerecho();
bool hayBordeTrasero();
bool hayOponente(long distanciaCm);
void revisarSeguridadBorde();
void habilitarMovimiento();
void paradaSegura();
void setMovimiento(int izquierda, int derecha);
void setServos(int izquierda, int derecha);
void actualizarServos();
void emitirPulsoServo(byte pin, int anchoUs);
void tonoInicio();
void tonoBorde();

ISR(PCINT2_vect) {
  if ((PIND & _BV(PD2)) == 0) {
    bordeIzquierdoIrq = true;
  }
  if ((PIND & _BV(PD3)) == 0) {
    bordeDerechoIrq = true;
  }
  if ((PIND & _BV(PD4)) == 0) {
    bordeTraseroIrq = true;
  }
}

void setup() {
  Serial.begin(9600);
  configurarPines();
  configurarInterrupcionesLinea();
  paradaSegura();
  tonoInicio();

  Serial.println(F("READY Robot Sumo Controller"));
  Serial.println(F("HW=NanoShield Servos:D9,D10 US:D5,D6 IR:D2,D3,D4 Buzzer:D12"));
}

void loop() {
  actualizarServos();
  procesarSerial();
  revisarSeguridadBorde();

  if (movimientoHabilitado && comandoActual != "STOP" &&
      millis() - ultimoComandoMovimiento > COMANDO_TIMEOUT_MS) {
    setMovimiento(0, 0);
    comandoActual = "STOP";
    Serial.println(F("ACK AUTO_STOP timeout"));
  }

  if (millis() - ultimaTelemetria >= TELEMETRIA_MS) {
    ultimaTelemetria = millis();
    enviarTelemetria();
  }
}

void configurarPines() {
  pinMode(PIN_IR_IZQ, INPUT);
  pinMode(PIN_IR_DER, INPUT);
  pinMode(PIN_IR_TRASERO, INPUT);
  pinMode(PIN_US_TRIG, OUTPUT);
  pinMode(PIN_US_ECHO, INPUT);
  pinMode(PIN_SERVO_DER, OUTPUT);
  pinMode(PIN_SERVO_IZQ, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  digitalWrite(PIN_US_TRIG, LOW);
  digitalWrite(PIN_SERVO_DER, LOW);
  digitalWrite(PIN_SERVO_IZQ, LOW);
}

void configurarInterrupcionesLinea() {
  PCICR |= _BV(PCIE2);
  PCMSK2 |= _BV(PCINT18);
  PCMSK2 |= _BV(PCINT19);
  PCMSK2 |= _BV(PCINT20);
}

void procesarSerial() {
  while (Serial.available() > 0) {
    char c = (char)Serial.read();
    if (c == '\n' || c == '\r') {
      bufferSerial.trim();
      if (bufferSerial.length() > 0) {
        ejecutarComando(bufferSerial);
      }
      bufferSerial = "";
    } else if (bufferSerial.length() < 48) {
      bufferSerial += c;
    }
  }
}

void ejecutarComando(String comando) {
  comando.trim();
  comando.toUpperCase();

  if (comando == "ENABLE") {
    habilitarMovimiento();
    Serial.println(F("ACK ENABLE"));
    return;
  }

  if (comando == "DISABLE" || comando == "KILL") {
    paradaSegura();
    Serial.println(comando == "KILL" ? F("ACK KILL") : F("ACK DISABLE"));
    return;
  }

  if (comando.startsWith("SPEED")) {
    int espacio = comando.indexOf(' ');
    if (espacio > 0) {
      velocidadManual = constrain(comando.substring(espacio + 1).toInt(), 0, 255);
      Serial.print(F("ACK SPEED "));
      Serial.println(velocidadManual);
    } else {
      Serial.println(F("ERR SPEED requiere valor 0-255"));
    }
    return;
  }

  if (comando == "PING") {
    Serial.println(F("ACK PING"));
    enviarTelemetria();
    return;
  }

  if (!movimientoHabilitado && comando != "S") {
    Serial.println(F("ERR MOVEMENT_DISABLED"));
    return;
  }

  if (comando == "F") {
    setMovimiento(velocidadManual, velocidadManual);
    comandoActual = "FORWARD";
  } else if (comando == "B") {
    setMovimiento(-velocidadManual, -velocidadManual);
    comandoActual = "BACKWARD";
  } else if (comando == "L") {
    setMovimiento(-velocidadManual, velocidadManual);
    comandoActual = "LEFT";
  } else if (comando == "R") {
    setMovimiento(velocidadManual, -velocidadManual);
    comandoActual = "RIGHT";
  } else if (comando == "S") {
    setMovimiento(0, 0);
    comandoActual = "STOP";
  } else {
    Serial.print(F("ERR UNKNOWN "));
    Serial.println(comando);
    return;
  }

  ultimoComandoMovimiento = millis();
  Serial.print(F("ACK "));
  Serial.println(comandoActual);
}

void revisarSeguridadBorde() {
  bool bordeIzq = hayBordeIzquierdo();
  bool bordeDer = hayBordeDerecho();
  bool bordeTrasero = hayBordeTrasero();

  if (!bordeIzq && !bordeDer && !bordeTrasero && !escapeBordeActivo) {
    return;
  }

  if (bordeIzquierdoIrq || bordeIzq) {
    bordeIzquierdoIrq = false;
    tonoBorde();
    if (movimientoHabilitado) {
      setMovimiento(-VELOCIDAD_ESCAPE, -VELOCIDAD_ESCAPE);
      delay(120);
      setMovimiento(VELOCIDAD_ESCAPE, -VELOCIDAD_ESCAPE);
      comandoActual = "EDGE_LEFT";
      escapeBordeActivo = true;
      finEscapeBorde = millis() + ESCAPE_BORDE_MS;
    }
  } else if (bordeDerechoIrq || bordeDer) {
    bordeDerechoIrq = false;
    tonoBorde();
    if (movimientoHabilitado) {
      setMovimiento(-VELOCIDAD_ESCAPE, -VELOCIDAD_ESCAPE);
      delay(120);
      setMovimiento(-VELOCIDAD_ESCAPE, VELOCIDAD_ESCAPE);
      comandoActual = "EDGE_RIGHT";
      escapeBordeActivo = true;
      finEscapeBorde = millis() + ESCAPE_BORDE_MS;
    }
  } else if (bordeTraseroIrq || bordeTrasero) {
    bordeTraseroIrq = false;
    tonoBorde();
    if (movimientoHabilitado) {
      setMovimiento(VELOCIDAD_ESCAPE, VELOCIDAD_ESCAPE);
      comandoActual = "EDGE_BACK";
      escapeBordeActivo = true;
      finEscapeBorde = millis() + ESCAPE_BORDE_MS;
    }
  }

  if (escapeBordeActivo && millis() > finEscapeBorde) {
    setMovimiento(0, 0);
    comandoActual = "STOP";
    escapeBordeActivo = false;
  }
}

void enviarTelemetria() {
  long distancia = medirDistanciaCm();
  bool bordeIzquierdo = hayBordeIzquierdo();
  bool bordeDerecho = hayBordeDerecho();
  bool bordeTrasero = hayBordeTrasero();
  bool oponente = hayOponente(distancia);

  Serial.print(F("TEL {\"enabled\":"));
  Serial.print(movimientoHabilitado ? F("true") : F("false"));
  Serial.print(F(",\"cmd\":\""));
  Serial.print(comandoActual);
  Serial.print(F("\",\"speed\":"));
  Serial.print(velocidadManual);
  Serial.print(F(",\"lineLeft\":"));
  Serial.print(bordeIzquierdo ? F("true") : F("false"));
  Serial.print(F(",\"lineRight\":"));
  Serial.print(bordeDerecho ? F("true") : F("false"));
  Serial.print(F(",\"lineBack\":"));
  Serial.print(bordeTrasero ? F("true") : F("false"));
  Serial.print(F(",\"rearEdge\":"));
  Serial.print(bordeTrasero ? F("true") : F("false"));
  Serial.print(F(",\"distanceCm\":"));
  Serial.print(distancia);
  Serial.print(F(",\"opponent\":"));
  Serial.print(oponente ? F("true") : F("false"));
  Serial.println(F("}"));
}

long medirDistanciaCm() {
  digitalWrite(PIN_US_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_US_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_US_TRIG, LOW);

  unsigned long duracion = pulseIn(PIN_US_ECHO, HIGH, ECO_TIMEOUT_US);
  if (duracion == 0) {
    return DISTANCIA_SIN_ECO_CM;
  }
  return (long)(duracion / 58UL);
}

bool hayBordeIzquierdo() {
  return digitalRead(PIN_IR_IZQ) == IR_BORDE_ACTIVO;
}

bool hayBordeDerecho() {
  return digitalRead(PIN_IR_DER) == IR_BORDE_ACTIVO;
}

bool hayBordeTrasero() {
  return digitalRead(PIN_IR_TRASERO) == IR_BORDE_ACTIVO;
}

bool hayOponente(long distanciaCm) {
  return distanciaCm > 0 && distanciaCm <= DISTANCIA_OPONENTE_CM;
}

void habilitarMovimiento() {
  movimientoHabilitado = true;
  comandoActual = "STOP";
  setMovimiento(0, 0);
}

void paradaSegura() {
  movimientoHabilitado = false;
  velocidadManual = 0;
  comandoActual = "STOP";
  escapeBordeActivo = false;
  setMovimiento(0, 0);
}

void setMovimiento(int izquierda, int derecha) {
  setServos(izquierda, derecha);
}

void setServos(int izquierda, int derecha) {
  pulsoServoIzq = SERVO_IZQ_STOP_US +
    map(constrain(izquierda, -255, 255), -255, 255, -SERVO_RANGO_US, SERVO_RANGO_US);
  pulsoServoDer = SERVO_DER_STOP_US -
    map(constrain(derecha, -255, 255), -255, 255, -SERVO_RANGO_US, SERVO_RANGO_US);
}

void actualizarServos() {
  if (micros() - ultimoPulsoServos < SERVO_PERIODO_US) {
    return;
  }
  ultimoPulsoServos = micros();
  emitirPulsoServo(PIN_SERVO_IZQ, pulsoServoIzq);
  emitirPulsoServo(PIN_SERVO_DER, pulsoServoDer);
}

void emitirPulsoServo(byte pin, int anchoUs) {
  digitalWrite(pin, HIGH);
  delayMicroseconds(constrain(anchoUs, 1000, 2000));
  digitalWrite(pin, LOW);
}

void tonoInicio() {
  tone(PIN_BUZZER, 1600, 80);
  delay(120);
  tone(PIN_BUZZER, 2200, 80);
}

void tonoBorde() {
  tone(PIN_BUZZER, 2600, 80);
}
