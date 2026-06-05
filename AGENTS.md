# AGENTS.md

## Reglas Del Proyecto

- Trabajar en `A:\robot-minisumo`.
- Mantener trazabilidad entre BOM, lista de conexiones, firmware, KiCad y reporte.
- No usar motores DC N20 ni driver de motores como configuracion principal de esta version.
- No usar D0/D1 para sensores, servos o buzzer; quedan reservados para RX/TX Serial.
- Documentar cualquier cambio en `CHANGELOG.md`.
- No cargar firmware sin confirmar puerto y condicion segura del robot.

## Pinout Definitivo

| Senal | Pin |
| --- | --- |
| TCRT_LEFT | D2 |
| TCRT_RIGHT | D3 |
| TCRT_BACK | D6 |
| TRIG_HCSR04 | D4 |
| ECHO_HCSR04 | D5 |
| BUZZER_SIG | D7 |
| SERVO_LEFT | D9 |
| SERVO_RIGHT | D10 |
