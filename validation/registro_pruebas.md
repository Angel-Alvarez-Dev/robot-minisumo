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
| Panel compacto - abrir vista | Debe cargar sin errores | Panel cargado desde `http://127.0.0.1:8080/web-control/` con titulo correcto y sin errores de consola | Aprobado |
| Panel compacto - una pantalla | Debe caber sin scroll en laptop | Edge headless con ventana 1366x768 reporto viewport interno 1336x639, sin overflow horizontal ni vertical | Aprobado |
| Panel compacto - estado general | Debe mostrar conexion, firmware, distancia, accion y modo | Los cinco indicadores aparecen en encabezado compacto | Aprobado |
| Panel compacto - componentes | Debe mostrar TCRT, HC-SR04, servos, buzzer y movimiento | Tarjetas compactas actualizadas visualmente | Aprobado |
| Panel compacto - pruebas rapidas | Debe incluir Test sensores, servos, buzzer, ultrasonico, demos y Stop | Ocho botones disponibles y vinculados a `CMD:*` | Aprobado |
| Panel compacto - modo demo | Debe indicar estados simulados | Aviso `Modo demo: los estados son simulados desde el panel` visible al activar demo | Aprobado |
| Panel compacto - Demo borde | Debe marcar borde, evasion, retroceso y buzzer | TCRT Left en BORDE, proceso evadir borde, movimiento retroceso y log actualizado | Aprobado |
| Panel compacto - Demo ataque | Debe mostrar oponente cerca, ataque y motores activos | Distancia 18 cm, accion atacar, servos en ataque y log actualizado | Aprobado |
| Panel compacto - Demo buscar | Debe mostrar busqueda/giro | Accion buscar, motores girando y log actualizado | Aprobado |
| Panel compacto - Stop | Debe detener motores visualmente | Accion detenido, servos STOP, movimiento detenido y log actualizado | Aprobado |
| Panel compacto - Web Serial | Debe leer telemetria y enviar comandos `CMD:*` | Integracion implementada; prueba fisica real por Web Serial queda pendiente de conectar Arduino en navegador compatible | Pendiente fisico |
| Robot fisico | Prototipo opera con sensores y actuadores finales | Estado reportado por usuario: robot fisico funcional | Aprobado |

## Evidencia textual

- Usuario confirmo que los tres sensores funcionan con la tabla final de conexiones.
- Usuario confirmo que D9 avanza y D10 acompana; D10 gira al reves por montaje y ninguno se queda quieto.
- Usuario confirmo calibracion D9: 1700 us adelanta y 1300 us atrasa.
- Firmware final se cargo en COM8 y mostro arranque serial correcto.
- Version final confirmada por Serial: `1.0.0-funcional`.
- Panel compacto probado en navegador integrado con modo demo y sin errores de consola.
- Web Serial fue implementado para lectura de telemetria y envio de comandos `CMD:*`; no se declaro prueba fisica real porque no se conecto Arduino desde el navegador durante esta validacion.
