# Registro KiCad

Fecha: 2026-06-05

| Item | Estado | Evidencia / accion |
| --- | --- | --- |
| Proyecto KiCad | Creado | `hardware/kicad/robot_minisumo.kicad_pro` |
| Esquematico documental | Actualizado | `hardware/kicad/robot_minisumo.kicad_sch` con pinout D3/D2/D0, D4/D5, D7, D9/D10 |
| Net labels | Documentadas | `VCC_5V`, `GND`, `TRIG_HCSR04`, `ECHO_HCSR04`, `TCRT_LEFT`, `TCRT_RIGHT`, `TCRT_BACK`, `SERVO_LEFT`, `SERVO_RIGHT`, `BUZZER_SIG` |
| ERC | No ejecutado automaticamente | `kicad-cli` no disponible en PATH |
| Exportacion PDF/SVG | No ejecutada automaticamente | `kicad-cli` no disponible en PATH |
| Procedimiento manual | Documentado | `hardware/kicad/exports/README.md` |

Pendiente real: abrir el proyecto en KiCad de escritorio y ejecutar Inspeccion electrica, exportacion PDF y exportacion SVG si se requiere evidencia grafica oficial de KiCad.
