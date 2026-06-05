# Firmware

## Pinout final

| Senal | Pin |
| --- | --- |
| TCRT_LEFT | D3 |
| TCRT_RIGHT | D2 |
| TCRT_BACK | D0 |
| TRIG_HCSR04 | D4 |
| ECHO_HCSR04 | D5 |
| BUZZER_SIG | D7 |
| SERVO_LEFT | D9 |
| SERVO_RIGHT | D10 |

D0 se usa para `TCRT_BACK` segun el pinout real probado. D0 corresponde a RX Serial; si falla la carga o el monitor serial, desconectar temporalmente el cable DO del TCRT Back.

## Calibracion final

- `LINE_ACTIVE_LOW = true`.
- Distancia de ataque: 35 cm.
- SG90 Left en D9: 1700 us avanza y 1300 us retrocede.
- SG90 Right en D10: 1300 us acompana el avance y 1700 us retrocede por montaje invertido.
- Detencion: 1500 us.

## Sketches

- `test_hcsr04`: prueba Trig D4 / Echo D5.
- `test_tcrt5000`: prueba RAW Left D3, Right D2, Back D0.
- `test_servos`: prueba D9/D10 con pulsos manuales.
- `test_buzzer`: prueba KY-012 en D7.
- `test_servo_d9`: prueba aislada de calibracion D9.
- `robot_minisumo_final`: firmware autonomo final.

## Comandos Serial del firmware final

- `s`: imprimir sensores en formato `Distancia=<cm> L=<0/1> R=<0/1> B=<0/1>`.
- `v`: prueba breve de servos.
- `b`: sonar buzzer.
- `a`: avanzar 500 ms.
- `d`: detener.
