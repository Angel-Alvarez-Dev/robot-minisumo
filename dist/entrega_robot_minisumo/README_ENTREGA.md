# Entrega Robot Minisumo

Alumno: Álvarez Villegas José Ángel
Materia: MICROCONTROLADORES
Grupo: 2809
Proyecto: Robot Minisumo

## Estado

El prototipo fisico del Robot Minisumo fue probado y se encuentra funcional.

## Contenido

- `reporte_robot_minisumo.pdf`: PDF del reporte academico generado durante la consolidacion final.
- `reporte_robot_minisumo.tex`: fuente LaTeX listo para compilar si se instala LaTeX.
- `reporte_robot_minisumo.md`: fuente Markdown del reporte.
- `README_PROYECTO.md`: README publico del repositorio.
- `firmware/`: sketches de prueba y firmware final.
- `hardware/kicad/`: proyecto KiCad y procedimiento de exportacion.
- `simulation/`: casos de validacion logica.
- `docs/`: BOM, conexiones, algoritmos, pseudocodigo y diagramas.
- `validation/`: registros de pruebas, compilacion, KiCad y checklist final.
- `web-control/`: panel web de monitoreo con modo demo y Web Serial opcional.
- `assets/`: imagen final de conexiones y hojas Excel anexas.

## Nota sobre PDFs y KiCad

`pdflatex`/`latexmk` no estuvieron disponibles en PATH durante la consolidacion. El PDF academico fue generado con ReportLab usando el contenido final del reporte. `kicad-cli` tampoco estuvo disponible; el ERC y las exportaciones oficiales PDF/SVG de KiCad quedan documentadas para ejecucion manual en `hardware/kicad/exports/README.md`.
