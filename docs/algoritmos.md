# Algoritmos Del Robot Minisumo

## Algoritmo General

1. Inicializar pines, servos, buzzer y Serial.
2. Esperar arranque seguro.
3. Leer TCRT5000 Left, Right y Back.
4. Si algun sensor detecta borde, ejecutar evasion.
5. Si no hay borde, medir distancia con HC-SR04.
6. Si la distancia esta dentro del umbral de ataque, avanzar hacia el oponente.
7. Si no se detecta oponente, buscar girando.
8. Repetir el ciclo.

## Deteccion De Borde

Los TCRT5000 se usan por salida digital `DO`: Left en D2, Right en D3 y Back en D6. D0/D1 quedan reservados para Serial.

## Medicion De Distancia

```text
distancia_cm = duracion_echo_us * 0.0343 / 2
```

## Control De Servos

| Accion | Servo izquierdo | Servo derecho |
| --- | ---: | ---: |
| Detener | 1500 us | 1500 us |
| Avanzar | 1700 us | 1300 us |
| Retroceder | 1300 us | 1700 us |
| Girar izquierda | 1300 us | 1300 us |
| Girar derecha | 1700 us | 1700 us |

Los valores deben calibrarse con hardware real.
