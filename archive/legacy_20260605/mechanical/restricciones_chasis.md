# Restricciones para chasis

## Restricciones de minisumo

- Mantener el robot compacto y con centro de gravedad bajo.
- Evitar que sensores o cables sobresalgan de forma vulnerable.
- Proteger los TCRT5000 sin bloquear su vista al suelo.
- Evitar que el HC-SR04 quede atrasado o cubierto por el chasis.

## Restricciones electricas

- El driver de motores debe tener ventilacion y acceso para revisar conexiones.
- La fuente de motores debe estar separada logicamente de las senales de control, con GND comun.
- No colocar cables de motor pasando sobre el HC-SR04 si generan ruido o vibracion.
- Dejar acceso al USB del Arduino Nano para carga de firmware.

## Restricciones de mantenimiento

- El portapilas debe poder retirarse o abrirse.
- El Arduino debe poder desconectarse por USB sin desmontar todo el robot.
- Los sensores TCRT5000 deben poder calibrarse.
- El driver debe poder reemplazarse si se cambia entre TB6612FNG y DRV8833.

## Pendiente

No generar STL hasta validar dimensiones reales del motor GA12-N20 y ubicacion del driver.

