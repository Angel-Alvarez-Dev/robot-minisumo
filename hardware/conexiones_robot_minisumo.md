# Conexiones Robot Minisumo

![Diagrama de conexiones](assets/diagrama_conexiones.png)

| Bloque | Componente | Senal | Pin Arduino/Shield | Nota |
| --- | --- | --- | --- | --- |
| Linea | TCRT5000 Left | TCRT_LEFT | D2 | DO digital |
| Linea | TCRT5000 Right | TCRT_RIGHT | D3 | Reasignado desde D1 |
| Linea | TCRT5000 Back | TCRT_BACK | D6 | Reasignado desde D0 |
| Oponente | HC-SR04 Trig | TRIG_HCSR04 | D4 | Pulso de disparo |
| Oponente | HC-SR04 Echo | ECHO_HCSR04 | D5 | Pulso de retorno |
| Indicador | KY-012 | BUZZER_SIG | D7 | Buzzer activo |
| Traccion | SG90 Left | SERVO_LEFT | D9 | Servo continuo requerido |
| Traccion | SG90 Right | SERVO_RIGHT | D10 | Servo continuo requerido |

D0/D1 quedan reservados para Serial. Todos los modulos comparten GND comun.
