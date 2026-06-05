# Auditoria tecnica de documentacion

Fecha: 2026-06-04

## Rubrica aplicada

| Area | Peso | Calificacion | Aporte |
|---|---:|---:|---:|
| Reporte e investigacion | 30 | 28 | 28 |
| Diseno de hardware | 30 | 28 | 28 |
| Codigo fuente | 30 | 29 | 29 |
| Estructura del proyecto | 10 | 10 | 10 |
| Total | 100 | 95 | 95 |

## Evaluacion por area

### Reporte e investigacion: 28/30

Fortalezas:

- Reporte academico completo.
- Investigacion documental centrada en minisumo, sensores, actuadores y arquitectura.
- Diagramas de flujo Mermaid incluidos.
- Pseudocodigo y algoritmos coherentes con prioridad de borde.
- BOM real integrada.

Descuento:

- Falta evidencia fisica de pruebas porque aun no inicia fase de hardware.

### Diseno de hardware: 28/30

Fortalezas:

- Pinout adaptado a motores DC N20.
- Driver final definido como TB6612FNG con `STBY` en D3.
- Esquematicos finales en Markdown y KiCad documental.
- Alimentacion, GND comun y advertencias de motor documentadas.
- Coherencia con la Arduino Nano Expansion I/O Shield.

Descuento:

- TB6612FNG pendiente de conexion fisica.
- ERC/exportacion KiCad no ejecutados porque `kicad-cli` no esta disponible.

### Codigo fuente: 29/30

Fortalezas:

- Firmware principal con maquina de estados.
- Pruebas individuales de motores, sensores de linea y HC-SR04.
- Codigo sin `Servo.h`.
- Constantes editables, comentarios y mensajes Serial.
- Modo seguro activado por defecto.
- Firmware final terminado para TB6612FNG.
- Prueba individual de buzzer agregada.

Descuento:

- El firmware de control web compila y fue cargado por `COM8`.
- Falta prueba fisica de motores con TB6612FNG conectado.

### Estructura del proyecto: 10/10

Fortalezas:

- Separacion clara: BOM, docs, firmware, hardware, references, report, simulation y validation.
- Referencias de componentes consolidadas.
- Archivos temporales, renders duplicados y CAD pesados retirados de la carpeta final.

Descuento: ninguno.

## Problemas corregidos

- Se integro la BOM real desde Excel.
- Se consolido la referencia de componentes en `references/components`.
- Se reforzo el reporte con BOM, estrategia, pruebas y pendientes controlados.
- Se finalizaron diagramas esquematicos documentales.
- Se definio TB6612FNG como driver final y se actualizo firmware.
- Se instalo Arduino CLI local, se compilaron los sketches y se cargo el firmware de control por Web Serial.
- Se agrego panel web HTML/CSS/JS con Web Serial API para control manual y telemetria.
- Se agrego esta auditoria formal.

## Dictamen

Calificacion final: 95/100.

La fase de documentacion queda formalmente cerrada. El proyecto puede pasar a fase de hardware fisico bajo estas condiciones:

- Conectar TB6612FNG.
- Usar el pinout final documentado para la Shield I/O.
- Calibrar sensores antes de habilitar movimiento.
- No cargar firmware de movimiento sin validar fuente, GND comun y puerto correcto.
