# Simulacion Y Validacion

Estado del prototipo fisico: **funcional**.

La validacion combina pruebas fisicas por modulo, compilacion de firmware y analisis de logica. El proyecto no depende de una simulacion electrica analogica compleja; el comportamiento se valida por casos de entrada/salida y esquematico KiCad documental.

| Caso | Entrada | Accion esperada | Resultado esperado | Estado |
| --- | --- | --- | --- | --- |
| HC-SR04 detecta oponente | Distancia 5 a 35 cm | Atacar | Servos avanzan y buzzer breve | Validado logicamente |
| HC-SR04 no detecta oponente | Distancia > 35 cm o sin eco | Buscar | Robot gira buscando | Validado logicamente |
| TCRT5000 Left detecta borde | Left activo | Evadir | Retrocede y gira derecha | Validado logicamente |
| TCRT5000 Right detecta borde | Right activo | Evadir | Retrocede y gira izquierda | Validado logicamente |
| TCRT5000 Back detecta borde | Back activo en D0 | Evadir | Retrocede y giro extendido | Validado logicamente |
| Servo izquierdo responde | Pulso D9 | Mover | 1700 us avanza; 1300 us retrocede | Aprobado fisico |
| Servo derecho responde | Pulso D10 | Mover | Acompana invertido por montaje | Aprobado fisico |
| Buzzer responde | D7 alto | Sonar | Sonido confirmado | Aprobado fisico |
| Robot busca | Sin borde y sin oponente | Girar | Busqueda continua | Validado |
| Robot ataca | Oponente cercano | Avanzar | Ataque con servos | Validado |
| Robot evita borde | TCRT activo | Retroceder/girar | No sale del area | Validado |
| Robot funciona fisicamente | Pinout final conectado | Operar | Prototipo funcional | Aprobado fisico |
