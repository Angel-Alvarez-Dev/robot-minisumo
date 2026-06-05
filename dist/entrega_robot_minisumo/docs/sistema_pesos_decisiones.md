# Sistema De Decisiones

El sistema de decisiones final es determinista y prioriza seguridad del dohyo antes que ataque.

| Prioridad | Entrada | Condicion | Accion |
| ---: | --- | --- | --- |
| 1 | TCRT5000 Left D3 | Borde detectado | Retroceder y girar derecha |
| 1 | TCRT5000 Right D2 | Borde detectado | Retroceder y girar izquierda |
| 1 | TCRT5000 Back D0 | Borde detectado | Retroceder y girar derecha extendido |
| 2 | HC-SR04 D4/D5 | Oponente <= 35 cm | Atacar |
| 3 | HC-SR04 D4/D5 | Sin oponente cercano | Buscar girando |

## Pesos practicos

- Evasion de borde: maxima prioridad.
- Ataque: prioridad media, solo si no hay borde.
- Busqueda: prioridad base.

Estado del prototipo fisico: funcional. Los servos SG90 fueron confirmados con pulsos finales: D9 1700 us avanza y 1300 us retrocede; D10 acompana invertido por montaje.
