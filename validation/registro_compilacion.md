# Registro De Compilacion

Fecha: 2026-06-05

Herramienta:

```text
arduino-cli 1.5.0
Core arduino:avr 1.8.8 instalado
Puerto detectado: COM8 serial Serial Port (USB) Unknown
```

| Sketch | FQBN | Resultado | Error si aplica | Accion tomada |
| --- | --- | --- | --- | --- |
| `firmware/test_hcsr04` | `arduino:avr:nano` | Compila: 3188 bytes programa, 236 bytes RAM | No aplica | Verificado final |
| `firmware/test_tcrt5000` | `arduino:avr:nano` | Compila: 2544 bytes programa, 340 bytes RAM | No aplica | Verificado final con D3/D2/D0 |
| `firmware/test_servos` | `arduino:avr:nano` | Compila: 2322 bytes programa, 344 bytes RAM | No aplica | Verificado final con D9/D10 |
| `firmware/test_buzzer` | `arduino:avr:nano` | Compila: 1988 bytes programa, 208 bytes RAM | No aplica | Verificado final con D7 |
| `firmware/test_servo_d9` | `arduino:avr:nano` | Compila: 2192 bytes programa, 310 bytes RAM | No aplica | Incluido como evidencia de calibracion D9 |
| `firmware/robot_minisumo_final` | `arduino:avr:nano` | Compila: 5812 bytes programa, 742 bytes RAM | No aplica | Firmware final con telemetria Serial para panel web verificado |

Nota: se mantiene generacion manual de pulsos para SG90; no se requiere `Servo.h`.
