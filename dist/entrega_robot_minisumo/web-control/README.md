# Robot Minisumo - Panel de Monitoreo

Panel local para mostrar en tiempo real el estado del Robot Minisumo durante pruebas y grabacion de video.

## Abrir el panel

Demo local:

```powershell
cd A:\robot-minisumo
start .\web-control\index.html
```

Con Web Serial:

```powershell
cd A:\robot-minisumo
python -m http.server 8080
```

Abrir:

```text
http://localhost:8080/web-control/
```

## Que muestra

- Procesos activos del robot.
- Accion actual.
- HC-SR04 con distancia en cm y oponente detectado.
- TCRT5000 Left, Right y Back.
- Servo/Motor izquierdo y derecho.
- Buzzer KY-012.
- Diagrama visual del robot con Arduino Nano, Shield, sensores, motores, buzzer y alimentacion/GND comun.
- Registro de eventos para explicar lo que esta pasando.

## Modo demo / grabacion

El boton `Modo demo` activa una simulacion visual. El panel muestra claramente:

```text
Modo demo: los estados son simulados desde el panel.
```

Botones disponibles:

- Simular borde izquierdo.
- Simular borde derecho.
- Simular borde trasero.
- Simular lectura inestable.
- Simular oponente cerca.
- Simular ataque.
- Simular busqueda.
- Simular retroceso.
- Simular giro izquierdo.
- Simular giro derecho.
- Activar buzzer.
- Detener robot.

## Conexion Arduino

El boton `Conectar Arduino` usa Web Serial API de forma opcional. Si el navegador la soporta, selecciona el puerto del Arduino y lee mensajes a 9600 baudios.

Si Web Serial no esta disponible, se mantiene modo demo.

## Mensajes Serial soportados

| Mensaje Serial | Significado | Accion en el panel |
| --- | --- | --- |
| `STATE:BUSCAR` | Robot buscando oponente | Activa busqueda |
| `STATE:ATACAR` | Robot atacando | Activa ataque |
| `STATE:EVITAR_BORDE` | Robot evitando borde | Marca alerta de borde |
| `TCRT_LEFT:1` | Sensor izquierdo detecta borde | TCRT Left rojo |
| `TCRT_RIGHT:1` | Sensor derecho detecta borde | TCRT Right rojo |
| `TCRT_BACK:1` | Sensor trasero detecta borde | TCRT Back rojo |
| `DIST_CM:20` | Distancia medida | Actualiza barra ultrasonica |
| `OPONENTE:1` | Oponente detectado | Muestra oponente en rango |
| `MOTOR_LEFT:AVANZAR` | Motor izquierdo avanzando | Anima motor izquierdo |
| `MOTOR_RIGHT:RETROCEDER` | Motor derecho retrocediendo | Anima motor derecho |
| `BUZZER:ON` | Buzzer activo | Enciende indicador sonoro |
| `BUZZER:OFF` | Buzzer apagado | Apaga indicador sonoro |

Tambien acepta:

```text
Distancia=23 L=0 R=1 B=0
```

## Limitaciones

- Web Serial requiere navegador compatible y permiso del usuario.
- Para Web Serial, usar `localhost` es preferible a abrir el archivo directo.
- D0/RX se usa para `TCRT_BACK`; desconectar temporalmente ese sensor si interfiere con la carga de firmware.
