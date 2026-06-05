# Pruebas y validacion

## Procedimiento general

1. Revisar cableado con el robot apagado.
2. Confirmar que no hay motores conectados directo al Arduino.
3. Confirmar GND comun entre Arduino, sensores, driver y alimentacion de motores.
4. Cargar pruebas individuales antes del firmware final.
5. Registrar resultados en `validation/registro_pruebas.md`.

## Prueba de sensores de linea

- Sketch: `firmware/test_sensores_linea/test_sensores_linea.ino`
- Objetivo: identificar si cada TCRT5000 entrega `HIGH` o `LOW` sobre negro y borde blanco.
- Evidencia: tabla con lectura izquierda, derecha y trasera.

## Prueba de sensor de oponente

- Sketch: `firmware/test_sensores_oponente/test_sensores_oponente.ino`
- Objetivo: validar distancia frontal del HC-SR04.
- Evidencia: distancia estable con objeto a 10 cm, 20 cm y 30 cm.

## Prueba de motores

- Sketch: `firmware/test_motores/test_motores.ino`
- Objetivo: validar direccion y PWM con driver de motores.
- Condicion obligatoria: driver confirmado y alimentacion revisada.

## Prueba final integrada

- Sketch: `firmware/robot_minisumo_final/robot_minisumo_final.ino`
- Objetivo: validar busqueda, ataque, evasion de borde y recuperacion.
- Requisito: ajustar `MODO_PRUEBA_SEGURO` a `false` solo despues de validar cableado.

## Resultados esperados

| Caso | Resultado esperado |
|---|---|
| Sin oponente | El robot busca girando. |
| Oponente al frente | El robot avanza en ataque. |
| Borde izquierdo | Retrocede y gira a la derecha. |
| Borde derecho | Retrocede y gira a la izquierda. |
| Borde trasero | Avanza para alejarse del borde. |
| Lectura invalida | Detiene motores y reporta por Serial. |
| Alimentacion insuficiente | Evitar prueba de motores y revisar fuente. |

