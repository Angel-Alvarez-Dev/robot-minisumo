# BOM y materiales

Fuente principal: `bom/BOM_Robot_Minisumo.xlsx`, copiada desde `C:\Users\alvar\Downloads\BOM_Robot_Minisumo (1).xlsx`.

## Lista de materiales real

| # | Componente | Carpeta / enlace interno | Costo unitario | Cantidad | Costo total | Dimensiones reportadas | Peso | Alimentacion | Estado |
|---:|---|---|---:|---:|---:|---|---:|---|---|
| 1 | Porta pilas AA con plug para 4/6 pilas | `Porta-Pilas-AA` | 17 | 1 | 17 | Largo 57.6 mm, ancho 61.9 mm, espesor 15 mm, cable 11 cm, plug 5.5 x 2.5 mm | 16 g | 4 pilas AA con conector 9 V | Confirmado |
| 2 | Paquete de 4 pilas alcalinas AA | `Pilas-AA` | 64 | 1 paquete | 64 | Diametro 14 mm, largo 50 mm | 100 g | 1.5 V por pila | Confirmado |
| 3 | Sensor seguidor de linea TCRT5000 optico infrarrojo | `TCRT5000` | 60 | 3 | 180 | 31 mm x 13 mm x 2 mm | 3 g | 3.3 V a 5 V | Confirmado |
| 4 | Sensor ultrasonico HC-SR04 | `HC-SR04` | 28 | 2 | 56 | 45 mm x 20 mm x 15 mm | 9 g | 5 V DC | Confirmado |
| 5 | Buzzer activo KY-012 | `Buzzer-Activo` | 15 | 2 | 30 | 18 mm x 15 mm x 15 mm | 3 g | 3.5 V a 5.5 V | Confirmado |
| 6 | Arduino Nano V3 con cable USB | `Arduino-Nano-v3` | 122 | 1 | 122 | 43.3 mm x 18 mm | 6 g | 7 V a 12 V recomendado por Vin | Confirmado |
| 7 | Shield para Arduino Nano Expansion I/O | `Shield_Arduino_Nano` | 44 | 1 | 44 | 60 mm x 55 mm x 10 mm | 20.4 g | 4.8 V a 12 V por power jack | Confirmado |
| 8 | Motorreductor DC GA12-N20 6 V 1000 RPM | `Motor_DC_6V` | 82 | 2 | 164 | BOM reporta 0.01 x 0.01 x 0.01 cm | 0.01 kg | 6 V DC | Confirmado con dimensiones pendientes |
| 9 | Llanta de goma para motorreductor N20 43 x 19 mm | `Llanta_Goma_N20` | 15 | 2 | 30 | Diametro 43 mm, ancho 19 mm, agujero 3 mm | 19 g | No aplica | Confirmado |
| 10 | Cables Dupont largos 20 cm HH, MH y MM | `Cables-Dupont` | 22 | 1 lote HH, MH y MM | 22 | 20 cm | 32 g | No aplica | Confirmado |

## Resumen de costo

| Concepto | Total |
|---|---:|
| Costo total de componentes confirmados | 685 |
| TB6612FNG | Definido, no incluido en BOM original |

Los costos se transcriben desde la BOM y deben confirmarse si se requiere presupuesto formal con moneda, proveedor o comprobante.

## Componente obligatorio faltante

| Componente | Cantidad | Motivo | Estado |
|---|---:|---|---|
| TB6612FNG | 1 | Los motores DC N20 no pueden conectarse directo al Arduino | Definido; pendiente adquirir/conectar si no esta fisicamente |

## Inconsistencias y pendientes

- El TB6612FNG no aparece confirmado en la BOM original. Sin este componente conectado el sistema no debe energizar motores.
- La dimension del motor GA12-N20 aparece como `0.01 x 0.01 x 0.01 cm`, valor irreal. Usar la imagen de dimensiones en `A:\robot-minisumo\GA12-N20` y verificar con vernier.
- La salida digital de cada TCRT5000 debe calibrarse en el robot real.
- Confirmar si se instalara uno o dos HC-SR04 en la version final.
- La carpeta `A:\robot-minisumo` contiene referencias mecanicas y datasheets que deben conservarse como evidencia de componentes.
