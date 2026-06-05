# Esquematicos

El proyecto KiCad se encuentra en `hardware/kicad/robot_minisumo.kicad_pro`.

El esquematico representa el montaje real sobre Arduino Nano Expansion I/O Shield:

- Arduino Nano.
- Shield de expansion.
- HC-SR04 en D4/D5.
- TCRT5000 Left D3, Right D2, Back D0.
- SG90 Left D9, Right D10.
- Buzzer KY-012 D7.
- Alimentacion VCC_5V/VCC_SERVO y GND comun.

## Notas

- Todos los modulos comparten GND comun.
- La Shield organiza conexiones, pero no aumenta la capacidad de corriente.
- Verificar alimentacion estable de servos SG90.
- D0/D1 son RX/TX Serial; el prototipo usa D0 para TCRT Back por conexion real probada.
