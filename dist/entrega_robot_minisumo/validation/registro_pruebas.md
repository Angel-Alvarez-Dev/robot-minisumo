# Registro De Pruebas

Fecha: 2026-06-05

| Prueba | Resultado esperado | Resultado observado | Estado |
| --- | --- | --- | --- |
| Buzzer KY-012 | Sonido intermitente al ejecutar test_buzzer | Sonido confirmado por usuario | Aprobado |
| HC-SR04 | Lecturas de distancia en cm | Lecturas observadas: 151, 152, 46, 47, 4, 11, 16, 7 y 6 cm | Aprobado |
| TCRT5000 Left | Cambio digital al detectar linea/borde | Los tres sensores funcionan con tabla final: Left D3, Right D2, Back D0 | Aprobado |
| TCRT5000 Right | Cambio digital al detectar linea/borde | Los tres sensores funcionan con tabla final: Left D3, Right D2, Back D0 | Aprobado |
| TCRT5000 Back | Cambio digital al detectar linea/borde | Funciona en D0; advertencia por RX Serial documentada | Aprobado |
| Servo D9 aislado | Movimiento adelante y atras | 1700 us adelanta y 1300 us atrasa | Aprobado |
| Servos D9/D10 conjunto | D9 avanza y D10 acompana sin quedarse quieto | D9 avanza, D10 acompana invertido por montaje, ninguno se queda quieto | Aprobado |
| Firmware final | Arranque serial y logica cargada | Firmware final cargado en COM8 y arranque serial observado | Aprobado |
| Version firmware final | Serial debe reportar nombre, version y estado | `Robot Minisumo Final`, `1.0.0-funcional`, `FUNCIONAL_PROBADO` capturados desde COM8 | Aprobado |
| Panel web - abrir vista | `web-control/index.html` debe cargar sin errores | Panel cargado desde `http://127.0.0.1:8080/web-control/` con titulo correcto y sin errores de consola | Aprobado |
| Panel web - modo demo | Debe indicar que los estados son simulados | Aviso `Modo demo: los estados son simulados desde el panel` visible al activar demo | Aprobado |
| Panel web - borde izquierdo | TCRT Left rojo, evasion de borde, motores retroceden, buzzer activo | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - borde derecho | TCRT Right rojo, evasion de borde, motores retroceden, buzzer activo | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - borde trasero | TCRT Back rojo, evasion de borde, motores retroceden, buzzer activo | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - lectura inestable | TCRT en amarillo y proceso lectura de sensores | Estado `Lectura inestable` mostrado para los tres TCRT | Aprobado |
| Panel web - oponente cerca | Distancia 20 cm y oponente detectado | Barra ultrasonica y estado de oponente actualizados | Aprobado |
| Panel web - ataque | Accion ataque, motores en ataque, buzzer activo | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - busqueda | Accion busqueda y motores girando | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - retroceso | Accion retroceso y dos motores retrocediendo | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - giro izquierdo | Motor izquierdo retrocede y derecho avanza | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - giro derecho | Motor izquierdo avanza y derecho retrocede | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - buzzer | Buzzer activo con motivo visible | Indicador sonoro encendido y evento registrado | Aprobado |
| Panel web - detener robot | Accion detencion, motores detenidos y sin eco | Estado visual y registro de eventos actualizados | Aprobado |
| Panel web - Web Serial | Debe existir conexion opcional con mensajes parseables | Integracion implementada; prueba fisica real por Web Serial queda pendiente de conectar Arduino en navegador compatible | Pendiente fisico |
| Robot fisico | Prototipo opera con sensores y actuadores finales | Estado reportado por usuario: robot fisico funcional | Aprobado |

## Evidencia textual

- Usuario confirmo que los tres sensores funcionan con la tabla final de conexiones.
- Usuario confirmo que D9 avanza y D10 acompana; D10 gira al reves por montaje y ninguno se queda quieto.
- Usuario confirmo calibracion D9: 1700 us adelanta y 1300 us atrasa.
- Firmware final se cargo en COM8 y mostro arranque serial correcto.
- Version final confirmada por Serial: `1.0.0-funcional`.
- Panel web probado en navegador integrado con modo demo y sin errores de consola.
- Web Serial fue implementado en el panel; no se declaro prueba fisica real de telemetria porque no se conecto Arduino desde el navegador durante esta validacion.
