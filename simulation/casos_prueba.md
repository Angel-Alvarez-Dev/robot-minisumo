# Casos De Prueba

| Caso | Entrada | Accion esperada | Resultado | Estado |
| --- | --- | --- | --- | --- |
| HC-SR04 detecta objeto cerca | Distancia <= 35 cm | Atacar | Avance frontal | Pendiente hardware |
| HC-SR04 no detecta objeto | Sin eco o distancia > 35 cm | Buscar | Giro de busqueda | Pendiente hardware |
| TCRT5000 Left detecta borde | DO activo D2 | Evitar borde | Retrocede y gira derecha | Pendiente hardware |
| TCRT5000 Right detecta borde | DO activo D3 | Evitar borde | Retrocede y gira izquierda | Pendiente hardware |
| TCRT5000 Back detecta borde | DO activo D6 | Evitar borde | Recupera posicion | Pendiente hardware |
| Buzzer activo | D7 HIGH | Sonar | Sonido audible | Pendiente hardware |
| Servo izquierdo prueba | Pulso D9 | Movimiento seguro | Giro esperado | Pendiente hardware |
| Servo derecho prueba | Pulso D10 | Movimiento seguro | Giro esperado | Pendiente hardware |
| Robot busca | Sin borde ni oponente | Girar | Busqueda | Pendiente hardware |
| Robot ataca | Oponente cerca | Avanzar | Ataque | Pendiente hardware |
| Robot evita borde | Cualquier TCRT activo | Evadir | No salir del area | Pendiente hardware |
