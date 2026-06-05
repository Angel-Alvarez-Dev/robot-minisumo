# Exportaciones KiCad

Ejecutar si `kicad-cli` esta disponible:

```powershell
kicad-cli version
kicad-cli sch erc hardware/kicad/robot_minisumo.kicad_sch --output hardware/kicad/exports/erc_report.txt
kicad-cli sch export pdf hardware/kicad/robot_minisumo.kicad_sch --output hardware/kicad/exports/robot_minisumo_schematic.pdf
kicad-cli sch export svg hardware/kicad/robot_minisumo.kicad_sch --output hardware/kicad/exports/
```

Si `kicad-cli` no esta instalado, abrir `hardware/kicad/robot_minisumo.kicad_pro` en KiCad y ejecutar manualmente Inspeccion electrica y Exportar PDF/SVG.
