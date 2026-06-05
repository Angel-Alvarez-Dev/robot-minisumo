# BOM Final Robot Minisumo

Fuente valida: `BOM_Robot_Minisumo.xlsx` anexo, hoja `Componentes_Minisumo`.

Estado del prototipo fisico: **funcional**. La version final usa servomotores SG90 RC 9g, no motores DC N20.

| Cantidad | Componente | Modelo | Funcion en el robot | Voltaje | Observaciones |
| --- | --- | --- | --- | --- | --- |
| 1 (EL DE 4) | Porta Pilas AA Con Plug Para 4/6 Pilas | Porta-Pilas AA | Fuente portatil para alimentar el robot mediante la Shield. | 4 pilas AA con conector 9V | Dimensiones: Largo: 57.6mm Ancho: 61.9mm Espesor: 15mm Longitud del cable: 11 cm Plug de salida: 5.5 x 2.5 mm Peso: 16g Costo fuente: $17.0 |
| 1.0 | Paquete De 4 Pilas Alcalinas AA | Pilas-AA | Energia para el porta pilas AA. | Voltaje: 1.5 Volts | Dimensiones: 14 Ø mm x 50 mm Peso: 100g Costo fuente: $64.0 |
| 3.0 | Sensor Seguidor de Linea TCRT5000 Optico Infrarrojo 3.3 V a 5 V | TCRT5000 | Deteccion de borde de dohyo con tres sensores Left, Right y Back. | 3.3 V a 5 V | Dimensiones: 31 mm × 13 mm × 2 mm Peso: 3g Costo fuente: $60.0 |
| 2.0 | Sensor Ultrasónico HC-SR04 | HC-SR04 | Componente de soporte del robot. | 5V DC | Dimensiones: 45 x 20 x 15 mm Peso: 9g Costo fuente: $28.0 La conexion final usa un sensor frontal; la BOM conserva las unidades anexadas. |
| 2.0 | Buzzer Activo KY-012 | Buzzer-Activo | Indicador sonoro de arranque, ataque y evasion. | 3.5 a 5.5 V | Dimensiones: 18 mm x 15 mm x 15 mm Peso: 3g Costo fuente: $15.0 La conexion final usa un buzzer; la BOM conserva las unidades anexadas. |
| 1.0 | Arduino Nano V3 + cable USB | Arduino-Nano-v3 | Control principal de lectura de sensores y actuadores. | 7V a 12V | Dimensiones: 43.3 mm x 18 mm Peso: 6g Costo fuente: $122.0 |
| 1.0 | Shield para Arduino Nano Expansion I/O | Shield_Arduino_Nano | Control principal de lectura de sensores y actuadores. | 4.8V a 12V (Power jack) | Dimensiones: 60 mm x 55 mm x 10 mm Peso: 20.4 g Costo fuente: $44.0 |
| 2.0 | Servomotor SG90 RC 9g | Servomotor-SG90 | Traccion diferencial del robot con SG90 confirmados funcionales. | 4.8V a 12V | Dimensiones: 22.8mm x 12.3mm x 22.5mm Peso: 13 g Costo fuente: $40.0 SG90 confirmados en pruebas: D9 1700 us avanza y 1300 us retrocede. |
| 2.0 | Llantas de plástico | Llantas-Goma | Contacto mecanico de traccion para los servos. | - | Dimensiones: 7 cm con un ancho de 2.54 cm Peso: 19 g Costo fuente: $50.0 |
| 1-HH/1MH/1MM (uNO DE CADA UNO) | Cables Dupont Largos 20cm HH MH MM | Cables-Dupont | Cableado de senales, VCC y GND entre modulos y Shield. | - | Dimensiones: 20 cm Peso: 32 g Costo fuente: $22.0 |

## Notas de control de versiones

- La informacion anterior basada en motores DC N20 o driver de motores queda como antecedente archivado en `archive/legacy_20260605/`.
- Los servos SG90 fueron probados fisicamente: D9 avanza con 1700 us y retrocede con 1300 us; D10 acompana en sentido invertido por el montaje.
- Todos los modulos deben compartir GND comun.
