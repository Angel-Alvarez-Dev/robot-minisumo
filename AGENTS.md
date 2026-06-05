# AGENTS.md

## Reglas Del Proyecto

- Trabajar en `A:\robot-minisumo`.
- Mantener trazabilidad entre BOM, lista de conexiones, firmware, KiCad y reporte.
- No usar motores DC N20 ni driver de motores como configuracion principal de esta version.
- D0 se usa para TCRT_BACK segun pinout real probado; D1 queda libre para TX. Si la carga falla, desconectar temporalmente TCRT_BACK de D0.
- Documentar cualquier cambio en `CHANGELOG.md`.
- No cargar firmware sin confirmar puerto y condicion segura del robot.

## Pinout Definitivo

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

