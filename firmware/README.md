# Firmware

## Pinout

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

D0 se usa para TCRT_BACK segun pinout real probado; D1 queda libre. Si falla la carga, desconectar temporalmente Back de D0.

## Sketches

- `test_hcsr04`
- `test_tcrt5000`
- `test_servos`
- `test_buzzer`
- `robot_minisumo_final`

PENDIENTE CRITICO: confirmar fisicamente si los SG90 son de rotacion continua.

