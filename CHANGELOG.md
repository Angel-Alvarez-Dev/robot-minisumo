# Changelog

## 2026-06-05 - Consolidacion Para Entrega Y GitHub

### Agregado

- `.gitignore` para excluir caches Arduino, toolchains, builds, logs, temporales y archivos comprimidos.
- Documentacion de pinout seguro sin D0/D1.
- Firmware final y pruebas individuales en estructura solicitada.
- KiCad documental, validacion y web-control.

### Cambiado

- Se reemplaza la configuracion anterior basada en motores DC N20/driver por la configuracion actual con servomotores SG90.
- Se reasignan los TCRT5000 que estaban en D0/D1 a D3 y D6 para reservar RX/TX Serial.
- Pinout definitivo: TCRT D2/D3/D6, HC-SR04 D4/D5, buzzer D7, servos D9/D10.

### Pendientes

- Confirmar SG90 de rotacion continua.
- Validar alimentacion de servos con hardware real.
- Ejecutar ERC/exportaciones KiCad si hay `kicad-cli`.
- Repositorio privado creado en GitHub y push inicial completado.

