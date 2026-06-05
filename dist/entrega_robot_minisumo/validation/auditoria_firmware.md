# Auditoria Firmware

Fecha: 2026-06-05

Ruta auditada: `A:\robot-minisumo\firmware`

## Sketches identificados

| Archivo | Funcion | Estado | Accion |
| ------- | ------- | ------ | ------ |
| `firmware/robot_minisumo_final/robot_minisumo_final.ino` | Firmware final autonomo: lee HC-SR04, TCRT5000, controla SG90, buzzer, busqueda, ataque y evasion de borde | firmware final | Se agrego identificacion `Robot Minisumo Final`, version `1.0.0-funcional` y estado `FUNCIONAL_PROBADO` por Serial |
| `firmware/test_hcsr04/test_hcsr04.ino` | Prueba individual HC-SR04 Trig D4 / Echo D5 | prueba | Conservado |
| `firmware/test_tcrt5000/test_tcrt5000.ino` | Prueba individual TCRT5000 Left D3, Right D2, Back D0 | prueba | Conservado con advertencia D0/RX |
| `firmware/test_servos/test_servos.ino` | Prueba conjunta servos SG90 D9/D10 con pulsos manuales | prueba | Conservado |
| `firmware/test_servo_d9/test_servo_d9.ino` | Prueba aislada de calibracion del servo D9 | prueba | Conservado como evidencia de calibracion |
| `firmware/test_buzzer/test_buzzer.ino` | Prueba individual buzzer KY-012 en D7 | prueba | Conservado |

## Versiones antiguas o duplicadas

No se encontraron duplicados del firmware funcional dentro de `firmware/`. No se movio ningun archivo a `archive/firmware/`.

## Verificacion de pinout final

| Senal | Pin en firmware | Pin en conexiones finales | Estado |
| --- | --- | --- | --- |
| `TCRT_LEFT` | D3 | D3 | Coincide |
| `TCRT_RIGHT` | D2 | D2 | Coincide |
| `TCRT_BACK` | D0 | D0 | Coincide, con advertencia RX Serial |
| `TRIG_HCSR04` | D4 | D4 | Coincide |
| `ECHO_HCSR04` | D5 | D5 | Coincide |
| `BUZZER_SIG` | D7 | D7 | Coincide |
| `SERVO_LEFT` | D9 | D9 | Coincide |
| `SERVO_RIGHT` | D10 | D10 | Coincide |

## Riesgo D0/D1

D0 y D1 corresponden a RX/TX del Arduino Nano. El prototipo final usa D0 para `TCRT_BACK`, por lo que puede interferir con la carga de firmware o el Serial Monitor. Si ocurre, se debe desconectar temporalmente el cable DO del TCRT Back durante la carga o la depuracion Serial.
