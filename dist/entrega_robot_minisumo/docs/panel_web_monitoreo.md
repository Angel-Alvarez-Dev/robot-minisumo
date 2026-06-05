# Panel web de monitoreo compacto

El panel web fue simplificado para usarse durante la grabacion final del Robot Minisumo. Su objetivo es mostrar en una sola pantalla de laptop lo importante del robot: proceso activo, sensores, actuadores, movimiento, pruebas rapidas y eventos recientes.

## Como abrirlo

```powershell
cd A:\robot-minisumo
python -m http.server 8080
```

Abrir:

```text
http://localhost:8080/web-control/
```

## Que se ve en tiempo real

Estado general:

- Conexion: conectado, desconectado, error o modo demo.
- Firmware: detectado o no detectado.
- Distancia HC-SR04: valor en cm o sin eco.
- Accion actual: buscar, atacar, evadir borde, retroceso, giro o detenido.
- Modo: real o demo.

Procesos compactos:

- Inicializacion.
- Lectura linea.
- Lectura US.
- Buscar.
- Atacar.
- Evadir borde.
- Retroceso.
- Giro izquierda.
- Giro derecha.
- Detenido.

Componentes:

- TCRT5000 Left en D3.
- TCRT5000 Right en D2.
- TCRT5000 Back en D0/RX.
- HC-SR04 en D4/D5.
- Servo Left en D9.
- Servo Right en D10.
- Buzzer KY-012 en D7.
- Movimiento resumido.

## Modo demo

Si no hay Arduino conectado, los botones activan modo demo automaticamente. El panel muestra:

```text
Modo demo: los estados son simulados desde el panel.
```

Este modo sirve para repetir casos frente a camara sin depender del movimiento fisico del robot.

## Pruebas desde el panel

| Boton | Comando Serial | Accion |
| --- | --- | --- |
| Test sensores | `CMD:TEST_SENSORES` | Solicita lectura de TCRT y distancia |
| Test servos | `CMD:TEST_SERVOS` | Ejecuta prueba corta de servos |
| Test buzzer | `CMD:TEST_BUZZER` | Activa buzzer |
| Test ultrasonico | `CMD:TEST_ULTRASONICO` | Solicita lectura HC-SR04 |
| Demo borde | `CMD:DEMO_BORDE` | Muestra evasion de borde |
| Demo ataque | `CMD:DEMO_ATAQUE` | Muestra ataque corto |
| Demo buscar | `CMD:DEMO_BUSCAR` | Muestra busqueda/giro |
| Stop | `CMD:STOP` | Detiene motores temporalmente |

Cuando Web Serial esta conectado, el comando se envia al Arduino. Cuando no hay conexion, el panel simula el estado visualmente.

## Mensajes Serial reconocidos

| Mensaje Serial | Significado | Accion en el panel |
| --- | --- | --- |
| `STATE:BUSCAR` | Robot buscando oponente | Activa proceso buscar |
| `STATE:ATACAR` | Robot atacando | Activa proceso atacar |
| `STATE:EVITAR_BORDE` | Robot evitando borde | Marca alerta de borde |
| `STATE:RETROCESO` | Robot retrocediendo | Activa retroceso |
| `STATE:GIRO_IZQUIERDO` | Robot gira a la izquierda | Activa giro izquierdo |
| `STATE:GIRO_DERECHO` | Robot gira a la derecha | Activa giro derecho |
| `STATE:DETENIDO` | Robot detenido | Activa detenido |
| `TCRT_LEFT:1` | Sensor izquierdo detecta borde | TCRT Left rojo |
| `TCRT_RIGHT:1` | Sensor derecho detecta borde | TCRT Right rojo |
| `TCRT_BACK:1` | Sensor trasero detecta borde | TCRT Back rojo |
| `DIST_CM:20` | Distancia medida | Actualiza HC-SR04 |
| `OPONENTE:1` | Oponente detectado | Marca oponente si |
| `MOTOR_LEFT:AVANZAR` | Servo izquierdo avanza | Muestra Servo Left activo |
| `MOTOR_RIGHT:RETROCEDER` | Servo derecho retrocede | Muestra Servo Right activo |
| `BUZZER:ON` | Buzzer activo | Muestra buzzer ON |

El panel tambien conserva compatibilidad con:

```text
Distancia=23 L=0 R=1 B=0
```

## Limitaciones

- Web Serial requiere navegador compatible y permiso para seleccionar puerto.
- Para telemetria real se debe cargar el firmware actualizado en Arduino.
- D0 comparte RX Serial; si el sensor trasero interfiere con carga, desconectar temporalmente su DO.
- El log se limita a 8 eventos para mantener la pantalla limpia durante video.
