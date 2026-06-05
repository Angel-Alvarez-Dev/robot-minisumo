# Inventario de referencias de componentes

La informacion util de componentes se consolido en `references/components`. La ruta original `A:\robot-minisumo` contenia carpetas de componentes con modelos CAD, imagenes y datasheets; para una entrega limpia se conservan solo datasheets, pinouts y dimensiones esenciales.

## Referencias conservadas

| Carpeta | Contenido util |
|---|---|
| `references/components/arduino-nano` | Datasheet del Arduino Nano |
| `references/components/shield-nano` | Pinout, esquematico, dimensiones y AMS1117 |
| `references/components/tcrt5000` | Pinout y dimensiones del modulo |
| `references/components/hc-sr04` | Datasheet e imagen del modulo |
| `references/components/buzzer-ky012` | Pinout y dimensiones |
| `references/components/ga12-n20` | Imagen de dimensiones del motor |
| `references/components/llanta-n20` | Dimensiones de llanta |
| `references/components/porta-pilas-aa` | Dimensiones del portapilas |
| `references/components/cables-dupont` | Dimensiones de cables Dupont |

## Uso dentro del proyecto

- Validar dimensiones mecanicas para el chasis.
- Confirmar pinout fisico de modulos antes de cablear.
- Preparar esquematicos en KiCad con referencias reales.
- Completar el reporte academico con evidencia de componentes.
- Mantener trazabilidad entre BOM, montaje, firmware y hardware.

## Reglas

- No borrar estas referencias.
- No reintroducir paquetes CAD pesados salvo que se retome el diseno mecanico detallado.
- Si se copia el proyecto sobre `A:\robot-minisumo`, conservar las carpetas de componentes existentes.
- Si una dimension de la BOM contradice una imagen o datasheet, marcarla como pendiente y medir fisicamente.
