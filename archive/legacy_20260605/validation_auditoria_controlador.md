# Auditoria y pruebas del controlador

Fecha: 2026-06-04

## Alcance

Auditoria practica del controlador Web Serial y del firmware cargado en el Arduino Nano conectado por `COM8`.

Firmware auditado:

```text
firmware/robot_minisumo_serial_control/robot_minisumo_serial_control.ino
```

Version confirmada por monitor serial:

```text
READY Robot Minisumo Serial Control
Actuadores=Servomotores D9_D10 Baud=9600
```

## Resultado general

| Area | Resultado | Observaciones |
|---|---|---|
| Deteccion de puerto | Correcto | Arduino detectado en `COM8` por Arduino CLI |
| Panel web | Correcto | `http://localhost:8080/web/control-panel/` responde HTTP 200 |
| Envio de comandos | Correcto | Panel usa `TextEncoder` para enviar bytes por Web Serial |
| Recepcion de telemetria | Correcto | El firmware emite tramas `TEL` a 9600 baudios |
| Parada segura | Correcto | `KILL` deja `driver=false`, `cmd=STOP`, `speed=0` |
| Movimiento fisico | Pendiente supervisado | Probar solo con robot levantado y servos de rotacion continua |

## Prueba de comandos sin movimiento

Se enviaron comandos equivalentes a los botones del panel:

```text
PING
SPEED 0
ENABLE
S
KILL
PING
```

Respuestas observadas:

```text
ACK PING
ACK SPEED 0
ACK ENABLE
ACK STOP
ACK KILL
ACK PING
```

Telemetria posterior:

```text
TEL {"driver":false,"cmd":"STOP","speed":0,"lineLeft":true,"lineRight":false,"lineBack":false,"distanceCm":999}
```

## Hallazgos

1. El controlador y el firmware si se comunican correctamente por Serial.
2. El estado de seguridad final es correcto: movimiento deshabilitado, comando `STOP`, velocidad `0`.
3. El sensor IR izquierdo aparece activo (`lineLeft=true`), por lo que requiere calibracion fisica o revision de superficie/cableado.
4. El HC-SR04 sigue reportando `distanceCm=999`, equivalente a sin eco; revisar alimentacion, `Trigger D5`, `Echo D6` y objeto frontal de prueba.
5. Si los servos giran con `speed=0`, ajustar centro mecanico/electronico o cambiar `SERVO_IZQ_STOP_US` / `SERVO_DER_STOP_US`.

## Dictamen

El controlador queda aprobado para pruebas supervisadas de bajo riesgo.

La siguiente prueba debe hacerse con el robot levantado:

1. Recargar panel con `Ctrl + F5`.
2. Conectar `COM8`.
3. Enviar `Parada segura`.
4. Subir velocidad a `30`.
5. Presionar `Habilitar movimiento`.
6. Probar flechas una por una.
7. Presionar `STOP` y luego `Parada segura`.

No colocar el robot en el piso hasta confirmar sentido de giro y parada.
