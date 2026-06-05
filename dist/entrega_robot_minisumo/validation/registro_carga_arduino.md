# Registro De Carga Arduino

No se carga firmware sin confirmacion de puerto y placa.

```powershell
$Cli = 'A:\robot-minisumo\tools\arduino-cli\arduino-cli.exe'
$Config = 'A:\robot-minisumo\.arduino-cli\arduino-cli.yaml'
& $Cli --config-file $Config board list
& $Cli --config-file $Config upload -p PUERTO_DETECTADO --fqbn arduino:avr:nano firmware\robot_minisumo_final
```

Antes de cargar: robot elevado, alimentacion revisada, GND comun confirmado y D0/D1 libres.
