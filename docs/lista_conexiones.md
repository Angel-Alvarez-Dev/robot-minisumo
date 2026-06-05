# Lista De Conexiones

Fuente: BOM/tabla de conexiones actualizada e imagen del diagrama. Se aplico una reasignacion documentada para no usar D0/D1, porque corresponden a RX/TX Serial del Arduino Nano.

| Componente | Pin del componente | Pin en Shield/Arduino | Senal | Voltaje | Observaciones |
| --- | --- | --- | --- | --- | --- |
| Sensor TCRT5000 Left | GND | GND | GND | 0 V | Tierra comun |
| Sensor TCRT5000 Left | VCC | VCC | VCC_5V | 3.3 V a 5 V | Alimentado desde Shield |
| Sensor TCRT5000 Left | DO | D3 | TCRT_LEFT | Nivel logico | Salida digital |
| Sensor TCRT5000 Right | GND | GND | GND | 0 V | Tierra comun |
| Sensor TCRT5000 Right | VCC | VCC | VCC_5V | 3.3 V a 5 V | Alimentado desde Shield |
| Sensor TCRT5000 Right | DO | D2 | TCRT_RIGHT | Nivel logico | Reasignado desde D1 para liberar TX |
| Sensor TCRT5000 Back | GND | GND | GND | 0 V | Tierra comun |
| Sensor TCRT5000 Back | VCC | VCC | VCC_5V | 3.3 V a 5 V | Alimentado desde Shield |
| Sensor TCRT5000 Back | DO | D0 | TCRT_BACK | Nivel logico | Reasignado desde D0 para liberar RX |
| Sensor HC-SR04 | GND | GND | GND | 0 V | Tierra comun |
| Sensor HC-SR04 | VCC | VCC | VCC_5V | 5 V | Modulo ultrasonico frontal |
| Sensor HC-SR04 | Trig | D4 | TRIG_HCSR04 | 5 V logico | Pulso de disparo |
| Sensor HC-SR04 | Echo | D5 | ECHO_HCSR04 | 5 V logico | Pulso proporcional a distancia |
| Buzzer activo KY-012 | GND | GND | GND | 0 V | Tierra comun |
| Buzzer activo KY-012 | VCC | VCC | VCC_5V | 3.5 V a 5.5 V | Alimentado desde Shield |
| Buzzer activo KY-012 | S | D7 | BUZZER_SIG | Nivel logico | Buzzer activo |
| Servomotor SG90 Left | GND | GND | GND | 0 V | Tierra comun |
| Servomotor SG90 Left | VCC | VCC/servo rail | VCC_SERVO | 4.8 V a 6 V recomendado | Verificar corriente |
| Servomotor SG90 Left | Signal | D9 | SERVO_LEFT | PWM servo | Traccion si es rotacion continua |
| Servomotor SG90 Right | GND | GND | GND | 0 V | Tierra comun |
| Servomotor SG90 Right | VCC | VCC/servo rail | VCC_SERVO | 4.8 V a 6 V recomendado | Verificar corriente |
| Servomotor SG90 Right | Signal | D10 | SERVO_RIGHT | PWM servo | Traccion si es rotacion continua |

## Validacion

- D0 se usa por TCRT Back y D1 queda libre para TX Serial.
- Todos los modulos comparten GND comun.
- Los servos pueden requerir fuente externa de 5 V con GND comun.

