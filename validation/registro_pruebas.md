# Registro De Pruebas

| Prueba | Sketch | Resultado esperado | Estado |
| --- | --- | --- | --- |
| HC-SR04 | `firmware/test_hcsr04` | Distancia en cm | Pendiente hardware |
| TCRT5000 | `firmware/test_tcrt5000` | OK/BORDE por sensor | Pendiente hardware |
| Servos | `firmware/test_servos` | Movimiento seguro | Pendiente hardware |
| Buzzer | `firmware/test_buzzer` | Sonido | Pendiente hardware |
| Robot final | `firmware/robot_minisumo_final` | Buscar, atacar, evadir | Pendiente hardware |

| 2026-06-05 | Buzzer KY-012 | `firmware/test_buzzer` | Sonido intermitente confirmado por usuario | Aprobado |
| 2026-06-05 | HC-SR04 | `firmware/test_hcsr04` | Lecturas Serial observadas: 151, 152, 46, 47, 4, 11, 16, 7, 6 cm | Aprobado |
| 2026-06-05 | TCRT5000 | `firmware/test_tcrt5000` | RAW inicial: 0/0/0; con INPUT_PULLUP: Left=0 Right=1 Back=1. Requiere calibrar/verificar DO de Left y confirmar cambio de Right/Back con superficie. | Pendiente calibracion |
| 2026-06-05 | TCRT5000 pinout real | `firmware/test_tcrt5000` | Cargado y leido como Left D3, Right D2, Back D0. Lectura observada estable: Left=1 Right=0 Back=1 durante captura. | En progreso |
