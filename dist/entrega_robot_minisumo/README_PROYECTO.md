# Robot Minisumo

Robot Minisumo autonomo basado en Arduino Nano y Arduino Nano Expansion I/O Shield. El prototipo fisico fue probado y se encuentra funcional con sensores TCRT5000, HC-SR04, buzzer KY-012 y servomotores SG90.

![Diagrama final de conexiones](docs/assets/diagrama_conexiones_final.png)

PDF del diagrama final: [docs/assets/diagrama_conexiones_final.pdf](docs/assets/diagrama_conexiones_final.pdf)

## Estado del proyecto

El prototipo fisico del Robot Minisumo fue probado y se encuentra funcional. El Arduino Nano tiene cargada y confirmada por Serial la version funcional `1.0.0-funcional` del firmware final. El repositorio contiene firmware, documentacion, esquematicos KiCad, validacion logica y reporte academico en carpeta separada.

## Componentes

| Componente | Cantidad | Funcion |
| --- | --- | --- |
| Porta Pilas AA Con Plug Para 4/6 Pilas | 1 (EL DE 4) | Fuente portatil para alimentar el robot mediante la Shield. |
| Paquete De 4 Pilas Alcalinas AA | 1.0 | Energia para el porta pilas AA. |
| Sensor Seguidor de Linea TCRT5000 Optico Infrarrojo 3.3 V a 5 V | 3.0 | Deteccion de borde de dohyo con tres sensores Left, Right y Back. |
| Sensor Ultrasónico HC-SR04 | 2.0 | Componente de soporte del robot. |
| Buzzer Activo KY-012 | 2.0 | Indicador sonoro de arranque, ataque y evasion. |
| Arduino Nano V3 + cable USB | 1.0 | Control principal de lectura de sensores y actuadores. |
| Shield para Arduino Nano Expansion I/O | 1.0 | Control principal de lectura de sensores y actuadores. |
| Servomotor SG90 RC 9g | 2.0 | Traccion diferencial del robot con SG90 confirmados funcionales. |
| Llantas de plástico | 2.0 | Contacto mecanico de traccion para los servos. |
| Cables Dupont Largos 20cm HH MH MM | 1-HH/1MH/1MM (uNO DE CADA UNO) | Cableado de senales, VCC y GND entre modulos y Shield. |

## Pinout final

| Componente | Pin del componente | Pin Arduino/Shield | Senal |
| --- | --- | --- | --- |
| TCRT5000 Left | DO | D3 | TCRT_LEFT |
| TCRT5000 Right | DO | D2 | TCRT_RIGHT |
| TCRT5000 Back | DO | D0 | TCRT_BACK |
| HC-SR04 | Trig | D4 | TRIG_HCSR04 |
| HC-SR04 | Echo | D5 | ECHO_HCSR04 |
| KY-012 | S | D7 | BUZZER_SIG |
| SG90 Left | Signal | D9 | SERVO_LEFT |
| SG90 Right | Signal | D10 | SERVO_RIGHT |

## Advertencias tecnicas

- D0 corresponde a RX Serial del Arduino Nano. En el prototipo final se usa para `TCRT_BACK`; si interfiere con la carga de firmware o monitor serial, desconectar temporalmente el DO del sensor trasero.
- Todos los modulos deben compartir GND comun.
- La Shield de expansion organiza conexiones, pero no aumenta la capacidad de corriente del Arduino Nano.
- Si los servos reinician el Arduino o vibran, usar alimentacion externa estable de 5 V para servos con GND comun.

## Compilar firmware

```powershell
$Cli = 'A:\robot-minisumo\tools\arduino-cli\arduino-cli.exe'
$Config = 'A:\robot-minisumo\.arduino-cli\arduino-cli.yaml'
& $Cli --config-file $Config compile --fqbn arduino:avr:nano firmware\robot_minisumo_final
```

## Firmware cargado

Firmware final: `firmware/robot_minisumo_final/robot_minisumo_final.ino`.

Version confirmada desde Serial Monitor:

```text
Robot Minisumo Final
1.0.0-funcional
FUNCIONAL_PROBADO
```

La carga fue confirmada en `COM8` usando `arduino:avr:nano`.

## KiCad

Abrir `hardware/kicad/robot_minisumo.kicad_pro`. El esquematico representa el montaje sobre Arduino Nano Expansion I/O Shield; no se disena PCB personalizada.

## Documentacion

- BOM final: `docs/bom_final.md`.
- Conexiones finales: `docs/lista_conexiones_final.md`.
- Panel de monitoreo: `docs/panel_web_monitoreo.md`.
- Algoritmos y pseudocodigo: `docs/algoritmos.md`, `docs/pseudocodigo.md`.
- Validacion: `validation/` y `simulation/`.
- Reporte academico: `report/`.

## Panel web de monitoreo

Abrir `web-control/index.html` o servir el repositorio en `http://localhost:8080/web-control/`.

El panel esta disenado para grabar y explicar el robot en funcionamiento en una sola pantalla de laptop. Muestra conexion, firmware, distancia, accion actual, modo real/demo, procesos activos, TCRT5000 Left/Right/Back, HC-SR04, servos SG90, buzzer KY-012, movimiento y eventos recientes.

Incluye:

- Modo demo / grabacion con estados simulados desde el panel.
- Pruebas rapidas: sensores, servos, buzzer, ultrasonico, demo borde, demo ataque, demo buscar y stop.
- Conexion opcional por Web Serial API a 9600 baudios.
- Envio de comandos `CMD:TEST_SENSORES`, `CMD:TEST_SERVOS`, `CMD:TEST_BUZZER`, `CMD:TEST_ULTRASONICO`, `CMD:DEMO_BORDE`, `CMD:DEMO_ATAQUE`, `CMD:DEMO_BUSCAR` y `CMD:STOP`.
- Parseo de mensajes `STATE`, `TCRT_LEFT`, `TCRT_RIGHT`, `TCRT_BACK`, `DIST_CM`, `OPONENTE`, `MOTOR_LEFT`, `MOTOR_RIGHT` y `BUZZER`.
- Compatibilidad con la linea de prueba `Distancia=<cm> L=<0/1> R=<0/1> B=<0/1>`.

## Licencia

Proyecto academico y tecnico. Agregar licencia explicita si se publicara para reutilizacion externa.
