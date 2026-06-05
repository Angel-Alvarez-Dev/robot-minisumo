# Medidas para Fusion 360

Fuente: BOM real y archivos encontrados en `A:\robot-minisumo`.

## Medidas reportadas

| Componente | Medida reportada | Archivo de referencia |
|---|---|---|
| Arduino Nano V3 | 43.3 mm x 18 mm | `Arduino-Nano-V3\A000005-datasheet.pdf`, `NanoV3.f3d` |
| Shield Arduino Nano Expansion I/O | 60 mm x 55 mm x 10 mm | `Shield-Arduino-Nano\AR3342-...-Dimensiones-scaled.png`, modelos STEP/SLDPRT |
| Portapilas AA 4 pilas | 57.6 mm x 61.9 mm x 15 mm, cable 11 cm | `Porta-Pilas-AA\AR0650-...-Dimensiones.jpg` |
| TCRT5000 | 31 mm x 13 mm x 2 mm | `TCRT5000\AR0568-...-Dimensiones.png` |
| HC-SR04 | 45 mm x 20 mm x 15 mm | `HC-SR04\HCSR04.pdf` |
| Buzzer KY-012 | 18 mm x 15 mm x 15 mm | `Buzzer-Activo\AR0031-...-Dimensiones.png` |
| Llanta N20 | Diametro 43 mm, ancho 19 mm, agujero 3 mm | `Llanta_Goma_N20\AR0657-...-Dimensiones.png` |
| Motor GA12-N20 | BOM invalida: 0.01 x 0.01 x 0.01 cm | `GA12-N20\GA12-N20-Motorreductor-DC-Dimensiones.jpg` |

## Medidas a validar con vernier

- Largo, diametro/caja y altura exacta del motor GA12-N20.
- Separacion de barrenos de la shield.
- Altura real de conectores de la shield con Arduino insertado.
- Altura libre necesaria para Dupont y cables.
- Posicion final de TCRT5000 respecto al suelo.
- Distancia frontal del HC-SR04 respecto al borde del chasis.

## Acomodo mecanico recomendado

- Portapilas en la parte baja y centrada para bajar el centro de gravedad.
- Motores N20 simetricos, con ruedas alineadas al eje transversal.
- TCRT5000 izquierdo y derecho cerca del frente inferior, orientados al suelo.
- TCRT5000 trasero en zona posterior inferior.
- HC-SR04 frontal centrado, sin obstruccion.
- Arduino Nano + shield en zona superior accesible para USB.
- Buzzer en zona visible/acusticamente libre.
- Dejar canal de cableado y acceso a interruptor o conector de alimentacion.

