# Panel web de monitoreo

El panel web de monitoreo sirve como tablero visual para grabar y explicar el Robot Minisumo en funcionamiento. Muestra procesos activos, sensores, servos, buzzer, accion actual, registro de eventos y un diagrama vivo con los componentes reales del proyecto.

## Componentes representados

- Arduino Nano.
- Arduino Nano Expansion I/O Shield.
- HC-SR04 ultrasonico.
- TCRT5000 Left en D3.
- TCRT5000 Right en D2.
- TCRT5000 Back en D0.
- Servo/Motor izquierdo SG90 en D9.
- Servo/Motor derecho SG90 en D10.
- Buzzer activo KY-012 en D7.
- Alimentacion y GND comun.

## Como abrirlo

Opcion para demo local:

```powershell
cd A:\robot-minisumo
start .\web-control\index.html
```

Opcion recomendada para Web Serial:

```powershell
cd A:\robot-minisumo
python -m http.server 8080
```

Despues abrir:

```text
http://localhost:8080/web-control/
```

Web Serial funciona mejor en navegadores basados en Chromium y en contexto seguro como `localhost`.

## Modo demo / grabacion

El modo demo permite mostrar estados aun sin Arduino conectado. El panel indica claramente:

```text
Modo demo: los estados son simulados desde el panel.
```

Controles incluidos:

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

Este modo es util para grabar la explicacion del sistema cuando se necesita repetir un caso especifico frente a camara.

## Web Serial opcional

El boton `Conectar Arduino` usa Web Serial API si el navegador lo soporta. El panel solicita seleccionar el puerto del Arduino, abre la conexion a 9600 baudios y procesa lineas Serial emitidas por el firmware final.

Si Web Serial no esta disponible, el panel muestra una advertencia y mantiene disponible el modo demo.

## Mensajes Serial reconocidos

| Mensaje Serial | Significado | Accion en el panel |
| --- | --- | --- |
| `STATE:BUSCAR` | Robot buscando oponente | Activa proceso busqueda |
| `STATE:ATACAR` | Robot atacando | Activa proceso ataque |
| `STATE:EVITAR_BORDE` | Robot evitando borde | Activa alerta de borde |
| `STATE:RETROCEDER` | Robot retrocediendo | Activa proceso retroceso |
| `STATE:GIRO_IZQUIERDO` | Robot girando a la izquierda | Activa proceso giro izquierdo |
| `STATE:GIRO_DERECHO` | Robot girando a la derecha | Activa proceso giro derecho |
| `STATE:DETENER` | Robot detenido | Activa proceso detencion |
| `TCRT_LEFT:1` | Sensor izquierdo detecta borde | Activa TCRT Left en rojo |
| `TCRT_RIGHT:1` | Sensor derecho detecta borde | Activa TCRT Right en rojo |
| `TCRT_BACK:1` | Sensor trasero detecta borde | Activa TCRT Back en rojo |
| `DIST_CM:20` | Distancia medida | Actualiza barra ultrasonica |
| `OPONENTE:1` | Oponente dentro del umbral | Muestra oponente detectado |
| `MOTOR_LEFT:AVANZAR` | Motor izquierdo avanza | Muestra flecha/movimiento izquierdo |
| `MOTOR_RIGHT:RETROCEDER` | Motor derecho retrocede | Muestra movimiento inverso derecho |
| `BUZZER:ON` | Buzzer activo | Activa indicador sonoro |
| `BUZZER:OFF` | Buzzer apagado | Desactiva indicador sonoro |

Tambien se mantiene compatibilidad con la linea de prueba anterior:

```text
Distancia=23 L=0 R=1 B=0
```

## Estados visuales

- TCRT5000: verde sin borde, rojo borde detectado, amarillo lectura inestable.
- HC-SR04: barra numerica en cm, estado de objeto lejos, objeto en rango, objeto cerca/atacar o error de lectura.
- Servos/Motores: detenido, avanzando, retrocediendo, girando o ataque.
- Buzzer: apagado, arranque, alerta de borde, ataque o error segun el motivo mostrado.
- Procesos: inactivo, activo, completado o alerta.

## Limitaciones

- Web Serial depende del navegador y del permiso del usuario para seleccionar el puerto.
- D0 es RX Serial del Arduino Nano y en el robot final tambien se usa para `TCRT_BACK`; si interfiere con la carga de firmware, desconectar temporalmente el DO del sensor trasero.
- El modo demo no representa lecturas reales del Arduino; solo simula estados desde el panel.

## Uso recomendado para video final

1. Abrir el panel en laptop.
2. Activar modo demo para explicar cada caso sin depender del movimiento fisico.
3. Conectar Arduino con Web Serial si se desea mostrar telemetria real.
4. Mostrar el diagrama vivo mientras el robot busca, detecta borde, detecta oponente y ataca.
5. Usar el registro de eventos como apoyo verbal para explicar que proceso esta ocurriendo.
