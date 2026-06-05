# Resultados esperados

| Caso de prueba | Entradas simuladas o reales | Resultado esperado |
|---|---|---|
| Sin oponente | Distancia mayor al umbral, sin borde | Giro de busqueda |
| Oponente al frente | Distancia menor o igual a `DISTANCIA_ATAQUE_CM` | Avance en ataque |
| Oponente a la izquierda | No hay sensor lateral confirmado | El robot no lo ve hasta barrer con busqueda |
| Oponente a la derecha | No hay sensor lateral confirmado | El robot no lo ve hasta barrer con busqueda |
| Linea blanca izquierda | TCRT izquierdo activo | Retroceso y giro a la derecha |
| Linea blanca derecha | TCRT derecho activo | Retroceso y giro a la izquierda |
| Linea blanca trasera | TCRT trasero activo | Avance corto |
| Lectura invalida | Distancia fuera de rango o tres bordes activos | Detener motores y reportar por Serial |
| Bateria baja | Motores lentos, reset o lectura inestable | Detener pruebas y revisar fuente |

## Evidencia recomendada

- Capturas del monitor serial.
- Fotos del cableado.
- Capturas o exportaciones de KiCad.
- Tabla de calibracion de sensores.
- Video corto de prueba de motores con robot levantado.

