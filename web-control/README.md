# Panel compacto Robot Minisumo

Panel web local para grabar el video final del Robot Minisumo sin scroll innecesario. La vista concentra proceso activo, sensores, actuadores, movimiento, pruebas rapidas y eventos recientes.

## Abrir

```powershell
cd A:\robot-minisumo
python -m http.server 8080
```

Abrir:

```text
http://localhost:8080/web-control/
```

Tambien puede abrirse directo con `web-control/index.html`, pero `localhost` es mejor para Web Serial.

## Vista en tiempo real

- Conexion: conectado, desconectado o modo demo.
- Firmware: detectado o no detectado.
- Distancia: valor HC-SR04 en cm o sin eco.
- Accion: buscar, atacar, evadir borde, giro, retroceso o detenido.
- Modo: real o demo.
- TCRT Left, Right y Back: libre, borde o inestable.
- Servo Left y Servo Right: stop, avanza, atras, gira o ataque.
- Buzzer: ON/OFF.
- Movimiento resumido del robot.

## Pruebas rapidas

| Boton | Comando Serial | Efecto visual |
| --- | --- | --- |
| Test sensores | `CMD:TEST_SENSORES` | Lectura linea y tarjetas TCRT |
| Test servos | `CMD:TEST_SERVOS` | Movimiento de servos |
| Test buzzer | `CMD:TEST_BUZZER` | Buzzer ON temporal |
| Test ultrasonico | `CMD:TEST_ULTRASONICO` | Distancia y oponente |
| Demo borde | `CMD:DEMO_BORDE` | Borde, retroceso y buzzer |
| Demo ataque | `CMD:DEMO_ATAQUE` | Ataque y oponente cerca |
| Demo buscar | `CMD:DEMO_BUSCAR` | Busqueda/giro |
| Stop | `CMD:STOP` | Detiene motores |

Si Arduino esta conectado por Web Serial, el panel envia el comando. Si no esta conectado, el panel activa modo demo y simula el estado para grabacion.

## Web Serial

El boton `Conectar Arduino` abre Web Serial API a 9600 baudios. El firmware final reconoce los comandos `CMD:*` anteriores y publica telemetria.

Mensajes leidos por el panel:

- `STATE:BUSCAR`
- `STATE:ATACAR`
- `STATE:EVITAR_BORDE`
- `STATE:RETROCESO` o `STATE:RETROCEDER`
- `STATE:GIRO_IZQUIERDO`
- `STATE:GIRO_DERECHO`
- `STATE:DETENIDO` o `STATE:DETENER`
- `TCRT_LEFT:0`
- `TCRT_RIGHT:1`
- `TCRT_BACK:0`
- `DIST_CM:23`
- `OPONENTE:1`
- `MOTOR_LEFT:AVANZAR`
- `MOTOR_RIGHT:RETROCEDER`
- `BUZZER:ON`
- `BUZZER:OFF`

Los mensajes desconocidos no rompen la interfaz; solo aparecen en eventos recientes.

## Limitaciones

- Web Serial requiere navegador compatible, normalmente Chromium.
- Para ver telemetria real hay que cargar el firmware actualizado en Arduino.
- D0/RX se usa para `TCRT_BACK`; desconectar temporalmente ese sensor si interfiere con carga de firmware.
