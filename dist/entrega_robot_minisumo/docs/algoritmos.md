# Algoritmos Del Robot Minisumo

## Prioridad de decision

1. Inicializar pines, servos y buzzer.
2. Emitir senal de arranque.
3. Esperar tiempo de seguridad.
4. Leer TCRT5000 Left, Right y Back.
5. Si cualquier TCRT detecta borde, ejecutar evasion.
6. Si no hay borde, medir distancia con HC-SR04.
7. Si la distancia es valida y menor o igual a 35 cm, atacar.
8. Si no hay oponente cercano, buscar girando.
9. Repetir ciclo.

## Algoritmo de evasion

- Retroceder 350 ms.
- Si detecta borde a la izquierda, girar a la derecha.
- Si detecta borde a la derecha, girar a la izquierda.
- Si detecta borde trasero o multiple, girar a la derecha durante mas tiempo.
- Detener y regresar al ciclo principal.

## Algoritmo de ataque

- Avanzar con `SERVO_LEFT_FORWARD_US = 1700` y `SERVO_RIGHT_FORWARD_US = 1300`.
- Activar buzzer brevemente.
- Mantener ataque mientras no aparezca borde.

## Algoritmo de busqueda

- Girar a la derecha con pulsos diferenciales.
- Releer sensores de borde y distancia.
- Cambiar a ataque cuando HC-SR04 detecta oponente.
