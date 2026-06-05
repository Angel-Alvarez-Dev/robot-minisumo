# Funcionamiento general

El robot minisumo inicia en modo seguro, configura pines y espera una cuenta inicial antes de moverse. Durante el combate ejecuta un ciclo continuo de lectura y decision.

## Flujo operativo

1. Inicializar pines, Serial y buzzer.
2. Esperar el tiempo inicial de seguridad.
3. Leer sensores de borde.
4. Medir distancia frontal.
5. Si hay borde, ejecutar maniobra de evasion.
6. Si hay oponente al frente, avanzar en ataque.
7. Si no hay oponente, buscar girando.
8. Repetir.

## Prioridades

La decision de control tiene esta prioridad:

1. Evitar salir del dojo.
2. Atacar si hay oponente detectado.
3. Buscar oponente si no hay deteccion.
4. Detener motores ante lectura invalida, modo seguro o condicion no esperada.

## Estados propuestos

| Estado | Funcion |
|---|---|
| `START_DELAY` | Espera inicial antes de iniciar combate. |
| `SEARCH` | Busca oponente girando o avanzando lento. |
| `ATTACK` | Avanza hacia el oponente. |
| `EDGE_LEFT` | Retrocede y gira a la derecha. |
| `EDGE_RIGHT` | Retrocede y gira a la izquierda. |
| `EDGE_BACK` | Avanza para salir del borde trasero. |
| `RECOVERY` | Maniobra corta posterior a una deteccion de borde. |

## Pendientes de validacion

- Confirmar nivel logico que representa borde en cada TCRT5000.
- Confirmar distancia de ataque real con pruebas en dojo.
- Confirmar velocidad PWM segura para motores N20.
- Confirmar polaridad real de motores en el TB6612FNG durante prueba con robot levantado.
