# Lista Final De Conexiones

Fuente valida: `Conexiones_Robot_Minisumo.xlsx` anexo e imagen final `diagrama_conexiones_final.png`.

Version PDF del diagrama: `hardware/assets/diagrama_conexiones_final.pdf`.

Pinout final probado:

- TCRT5000 Left: D3.
- TCRT5000 Right: D2.
- TCRT5000 Back: D0.
- HC-SR04: Trig D4, Echo D5.
- Buzzer KY-012: D7.
- SG90 Left: D9.
- SG90 Right: D10.

> Advertencia: D0 y D1 corresponden a RX/TX del Arduino Nano. D0 se usa por `TCRT_BACK` en el prototipo real y puede interferir con la carga de firmware o el Serial Monitor. Si ocurre, desconectar temporalmente el cable DO del TCRT Back durante la carga.

| Componente | Pin del componente | Pin Arduino/Shield | Senal | Tipo | Observaciones |
| --- | --- | --- | --- | --- | --- |
| TCRT5000 Left | VCC | VCC | VCC_5V | Alimentacion | Modulo de linea izquierdo. |
| TCRT5000 Left | GND | GND | GND | Alimentacion | GND comun. |
| TCRT5000 Left | DO | D3 | TCRT_LEFT | Digital entrada | Pinout final real probado. |
| TCRT5000 Right | VCC | VCC | VCC_5V | Alimentacion | Modulo de linea derecho. |
| TCRT5000 Right | GND | GND | GND | Alimentacion | GND comun. |
| TCRT5000 Right | DO | D2 | TCRT_RIGHT | Digital entrada | Pinout final real probado. |
| TCRT5000 Back | VCC | VCC | VCC_5V | Alimentacion | Modulo de linea trasero. |
| TCRT5000 Back | GND | GND | GND | Alimentacion | GND comun. |
| TCRT5000 Back | DO | D0 | TCRT_BACK | Digital entrada | D0 es RX Serial; desconectar durante carga si interfiere. |
| HC-SR04 | VCC | VCC | VCC_5V | Alimentacion | Sensor frontal de distancia. |
| HC-SR04 | GND | GND | GND | Alimentacion | GND comun. |
| HC-SR04 | Trig | D4 | TRIG_HCSR04 | Digital salida | Pulso de disparo ultrasonico. |
| HC-SR04 | Echo | D5 | ECHO_HCSR04 | Digital entrada | Medicion con pulseIn. |
| Buzzer KY-012 | VCC | VCC | VCC_5V | Alimentacion | Indicador sonoro activo. |
| Buzzer KY-012 | GND | GND | GND | Alimentacion | GND comun. |
| Buzzer KY-012 | S | D7 | BUZZER_SIG | Digital salida | Prueba fisica aprobada. |
| SG90 Left | VCC | VCC | VCC_SERVO/5V | Alimentacion | Verificar corriente estable para servo. |
| SG90 Left | GND | GND | GND | Alimentacion | GND comun con Arduino. |
| SG90 Left | Signal | D9 | SERVO_LEFT | PWM manual | 1700 us avanza; 1300 us retrocede. |
| SG90 Right | VCC | VCC | VCC_SERVO/5V | Alimentacion | Verificar corriente estable para servo. |
| SG90 Right | GND | GND | GND | Alimentacion | GND comun con Arduino. |
| SG90 Right | Signal | D10 | SERVO_RIGHT | PWM manual | Acompana invertido por montaje: 1300 us para avance. |

## Alimentacion

- Todos los modulos comparten GND comun.
- La Shield de expansion organiza conexiones, pero no aumenta la capacidad de corriente del Arduino Nano.
- Si los servos SG90 presentan reinicios o vibracion, alimentar servos con fuente estable de 5 V y unir GND con Arduino.
