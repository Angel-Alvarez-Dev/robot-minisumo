# Investigacion Documental

## Arduino Nano Y Shield

Arduino Nano es el controlador principal. La Arduino Nano Expansion I/O Shield facilita el cableado con conectores de senal, VCC y GND, pero no aumenta la capacidad de corriente del regulador.

## HC-SR04

El HC-SR04 mide distancia con ultrasonido. El firmware envia un pulso por `TRIG_HCSR04` y mide el tiempo de retorno en `ECHO_HCSR04`.

## TCRT5000

Los TCRT5000 detectan contraste de reflectancia. En este proyecto se usa la salida digital `DO` para detectar borde en Left, Right y Back.

## Servomotores SG90

Los SG90 se controlan con pulsos tipo servo. Para traccion continua deben ser de rotacion continua o estar modificados. Un SG90 estandar de posicion no sirve como rueda continua.

## Buzzer KY-012

El KY-012 es un buzzer activo. Se activa con una salida digital y sirve como indicador de arranque, ataque y evasion.

## Alimentacion

Los servos pueden consumir mas corriente de la que el Arduino Nano entrega de forma estable. Si hay reinicios, usar fuente externa de 5 V para servos y unir GND con Arduino y Shield.
