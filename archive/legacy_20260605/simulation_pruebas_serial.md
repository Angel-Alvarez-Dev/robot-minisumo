# Pruebas con Serial Monitor

## Configuracion

- Baudios: 9600
- Placa: Arduino Nano
- Core esperado: `arduino:avr`
- FQBN esperado: `arduino:avr:nano`

## Sensores TCRT5000

1. Cargar `firmware/test_sensores_linea/test_sensores_linea.ino`.
2. Abrir monitor serial.
3. Colocar cada sensor sobre superficie negra.
4. Colocar cada sensor sobre borde blanco.
5. Registrar `HIGH` o `LOW`.
6. Ajustar `LECTURA_BORDE_ACTIVA` en el firmware final.

## HC-SR04

1. Cargar `firmware/test_sensores_oponente/test_sensores_oponente.ino`.
2. Colocar objeto a 10 cm, 20 cm y 30 cm.
3. Verificar que la distancia sea estable.
4. Ajustar `DISTANCIA_ATAQUE_CM`.

## Motores

1. Confirmar driver fisico.
2. Confirmar fuente de motores.
3. Confirmar GND comun.
4. Cambiar `MODO_PRUEBA_SEGURO` a `false` en `test_motores.ino`.
5. Ejecutar con el robot levantado.
6. Verificar avance, retroceso y giros.

## Firmware final

1. Mantener `MODO_PRUEBA_SEGURO` en `true` al primer arranque.
2. Revisar mensajes por Serial.
3. Confirmar que no hay lecturas invalidas.
4. Cambiar a `false` solo para prueba supervisada.

