# Estado Arduino CLI

Fecha: 2026-06-04

## Instalacion

Arduino CLI quedo instalado localmente en el proyecto:

```text
A:\robot-minisumo\tools\arduino-cli\arduino-cli.exe
```

Version instalada:

```text
arduino-cli Version: 1.5.0
```

Configuracion local:

```text
A:\robot-minisumo\.arduino-cli\arduino-cli.yaml
```

Directorios usados:

| Configuracion | Ruta |
|---|---|
| `directories.data` | `A:\robot-minisumo\.arduino-cli\data` |
| `directories.downloads` | `A:\robot-minisumo\.arduino-cli\downloads` |
| `directories.user` | `A:\robot-minisumo\.arduino-cli\sketchbook` |

## Core instalado

| ID | Version instalada | Nombre |
|---|---|---|
| `arduino:avr` | 1.8.8 | Arduino AVR Boards |

FQBN disponible para Arduino Nano:

```text
arduino:avr:nano
```

## Compilacion

Los sketches compilaron correctamente con:

```powershell
$Cli = 'A:\robot-minisumo\tools\arduino-cli\arduino-cli.exe'
$Config = 'A:\robot-minisumo\.arduino-cli\arduino-cli.yaml'
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/test_sensores_linea
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/test_sensores_oponente
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/test_buzzer
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/test_motores
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/robot_minisumo_final
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware/robot_minisumo_serial_control
```

| Sketch | Programa | RAM | Estado |
|---|---:|---:|---|
| `test_sensores_linea` | 2680 bytes | 188 bytes | Compila |
| `test_sensores_oponente` | 2632 bytes | 188 bytes | Compila |
| `test_buzzer` | 3172 bytes | 205 bytes | Compila |
| `test_motores` | 2308 bytes | 188 bytes | Compila |
| `robot_minisumo_final` | 4584 bytes | 233 bytes | Compila |
| `robot_minisumo_serial_control` | 7762 bytes | 308 bytes | Compila |

## Puerto detectado

Arduino CLI detecto:

```text
COM8 serial Serial Port (USB) Unknown
```

Interpretacion:

- `COM8` parece ser un puerto USB serial.
- Arduino CLI no identifica automaticamente la placa.
- Puede ser Arduino Nano o un clon USB-serial, pero debe confirmarse antes de cargar codigo.

El usuario confirmo que `COM8` corresponde a un Arduino Nano V3 conectado por USB con Shield para Arduino Nano Expansion I/O.

## Cargas realizadas

| Sketch | Puerto | Resultado | Observacion Serial |
|---|---|---|---|
| `firmware/test_sensores_linea` | COM8 | Carga correcta | IZQ=1, DER=1, TRASERO=0; trasero aparece como borde activo con `LOW` |
| `firmware/test_sensores_oponente` | COM8 | Carga correcta | `Sin eco o fuera de rango` |
| `firmware/robot_minisumo_final` | COM8 | Carga correcta | `SAFE_STOP`, TB6612FNG, STBY D3, motores detenidos |
| `firmware/robot_minisumo_serial_control` | COM8 | Carga correcta | `READY Robot Minisumo Serial Control`, telemetria `TEL` a 9600 baudios |

Interpretacion:

- El Arduino recibe firmware correctamente por `COM8`.
- El monitor Serial funciona a 9600 baudios.
- Los sensores TCRT5000 requieren calibracion fisica.
- El HC-SR04 requiere revisar objeto frontal o conexion D5/D6/VCC/GND.
- El firmware de control manual por Web Serial quedo cargado para operar desde `web/control-panel`.
- Antes de habilitar movimiento, cambiar `MODO_PRUEBA_SEGURO` a `false` solo con TB6612FNG conectado y robot levantado.

## Regla antes de cargar

No subir firmware hasta confirmar:

- Que `COM8` corresponde al Arduino Nano conectado.
- Que la placa seleccionada es Arduino Nano.
- Si se requiere bootloader nuevo o `Old Bootloader`.
- Que los motores estan desconectados o en modo seguro.

## Comando de carga usado para sensores de linea

```powershell
& $Cli --config-file $Config upload -p COM8 --fqbn arduino:avr:nano firmware/test_sensores_linea
```

## Comando de carga usado para HC-SR04

```powershell
& $Cli --config-file $Config upload -p COM8 --fqbn arduino:avr:nano firmware/test_sensores_oponente
```

Si falla por bootloader, probar:

```powershell
& $Cli --config-file $Config upload -p COM8 --fqbn arduino:avr:nano:cpu=atmega328old firmware/test_sensores_linea
```
