# Registro De Compilacion

Fecha: 2026-06-05

Herramienta:

```text
arduino-cli 1.5.0
Core arduino:avr 1.8.8 instalado
```

| Sketch | FQBN | Resultado | Memoria programa | RAM |
| --- | --- | --- | ---: | ---: |
| `firmware/test_hcsr04` | `arduino:avr:nano` | Compila | 3188 bytes | 236 bytes |
| `firmware/test_tcrt5000` | `arduino:avr:nano` | Compila | 2160 bytes | 262 bytes |
| `firmware/test_servos` | `arduino:avr:nano` | Compila | 2258 bytes | 288 bytes |
| `firmware/test_buzzer` | `arduino:avr:nano` | Compila | 1988 bytes | 208 bytes |
| `firmware/robot_minisumo_final` | `arduino:avr:nano` | Compila | 4338 bytes | 316 bytes |

Nota: se elimino la dependencia de `Servo.h` porque no estaba disponible en esta instalacion local; los pulsos de servo se generan manualmente.
