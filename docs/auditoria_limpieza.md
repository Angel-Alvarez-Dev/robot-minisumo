# Auditoria De Limpieza

| Archivo | Estado | Accion propuesta | Justificacion |
| --- | --- | --- | --- |
| `.arduino-cli/` | conservar | Mantener local e ignorar en Git | Necesario para compilacion local, pero pesado. |
| `tools/arduino-cli/` | conservar | Mantener local e ignorar en Git | Herramienta local, no fuente del proyecto. |
| `archive/` | conservar | Mantener antecedentes | Guarda informacion desplazada sin borrarla. |
| `docs/bom_actualizada.md` | actualizar | Mantener como BOM final | Consolida materiales del montaje actual. |
| `docs/lista_conexiones.md` | actualizar | Mantener pinout sin D0/D1 | Evita conflicto con Serial. |
| `firmware/test_*` | actualizar | Mantener pruebas individuales | Facilita validacion por modulo. |
| `firmware/robot_minisumo_final` | actualizar | Mantener sketch final | Implementa logica principal. |
| `hardware/kicad` | actualizar | Mantener KiCad | Esquematico academico. |
| `web-control` | actualizar | Mantener herramienta web | Apoyo visual y guia de pruebas. |
