# Registro De Carga Arduino

Fecha: 2026-06-05

Herramienta usada:

```text
A:\robot-minisumo\tools\arduino-cli\arduino-cli.exe
arduino-cli 1.5.0
Core arduino:avr 1.8.8
```

## Puerto detectado

`arduino-cli board list` detecto:

```text
COM8 serial Serial Port (USB) Unknown
```

## Resultado de carga y confirmacion

| Elemento | Resultado |
| --- | --- |
| Puerto detectado | COM8 |
| FQBN usado | `arduino:avr:nano` |
| Compilacion | OK |
| Carga al Arduino | OK |
| Version reportada por Serial | `1.0.0-funcional` |
| Estado final | Cargado y confirmado |

## Version confirmada por Serial

Lectura capturada desde COM8 a 9600 baudios:

```text
Robot Minisumo Final
1.0.0-funcional
FUNCIONAL_PROBADO
Robot Minisumo - Pinout real: TCRT L/R/B D3/D2/D0
Prototipo fisico funcional: SG90 D9/D10 y sensores finales confirmados.
Advertencia: TCRT Back usa D0/RX; desconectar para cargar firmware si es necesario.
```

## Nota D0/RX

El prototipo final usa D0 para `TCRT_BACK`. D0 corresponde a RX Serial del Arduino Nano y puede interferir con carga o depuracion; si ocurre, desconectar temporalmente el cable DO del TCRT Back.
