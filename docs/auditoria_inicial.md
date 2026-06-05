# Auditoria Inicial

Ruta validada: `A:\robot-minisumo`.

| Archivo o carpeta | Estado | Accion | Justificacion |
| --- | --- | --- | --- |
| `.arduino-cli/` | conservar | Ignorar en Git | Cache local y toolchain Arduino; no debe subirse a GitHub. |
| `tools/arduino-cli/` | conservar | Ignorar en Git | Binarios locales de Arduino CLI. |
| `firmware/main/` | archivar | Clasificado como legado | Firmware anterior no coincide con estructura final solicitada. |
| `web/` | archivar | Clasificado como legado | Interfaz anterior reemplazada por `web-control/`. |
| `hardware/netlist_final.md` | archivar | Clasificado como legado | Netlist textual anterior reemplazada por documentacion y KiCad. |
| Documentos con N20/driver | archivar | Clasificados como antecedentes | Contradicen configuracion actual con SG90. |
| Referencias N20 | archivar | Conservar como antecedente | No son hardware principal de esta version. |
| `README.md` | actualizar | Reescrito | Refleja configuracion actual y pinout sin D0/D1. |
| `firmware/robot_minisumo_final/` | actualizar | Crear/actualizar | Sketch principal definitivo. |
| `hardware/kicad/` | actualizar | Crear/actualizar | Esquematico documental. |
