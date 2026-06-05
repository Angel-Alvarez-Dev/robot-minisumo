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
| Robot fisico | Prototipo opera con sensores y actuadores finales | Estado reportado por usuario: robot fisico funcional | Aprobado |

## Evidencia textual

- Usuario confirmo que los tres sensores funcionan con la tabla final de conexiones.
- Usuario confirmo que D9 avanza y D10 acompana; D10 gira al reves por montaje y ninguno se queda quieto.
- Usuario confirmo calibracion D9: 1700 us adelanta y 1300 us atrasa.
- Firmware final se cargo en COM8 y mostro arranque serial correcto.
- Version final confirmada por Serial: `1.0.0-funcional`.
