# Sistema De Pesos Para Decisiones

| Criterio | Peso |
| --- | ---: |
| Compatibilidad con componentes reales montados | 30% |
| Funcionalidad del robot | 25% |
| Claridad para entrega academica | 20% |
| Seguridad electrica | 15% |
| Facilidad de prueba y mantenimiento | 10% |

## Decisiones Aplicadas

| Decision | Resultado | Justificacion |
| --- | --- | --- |
| D0/D1 | Reservados para RX/TX Serial | Mejora carga, depuracion y mantenimiento sin cambiar componentes. |
| TCRT Right | D3 | Pin digital libre y cercano a D2. |
| TCRT Back | D6 | Pin digital libre despues de conservar HC-SR04 en D4/D5. |
| HC-SR04 | D4/D5 | Conserva tabla e imagen base. |
| Buzzer | D7 | Conserva tabla e imagen base. |
| Servos | D9/D10 | Pines aptos para control tipo servo. |
| N20/driver | Antecedente archivado/documentado | Contradice la configuracion actual con SG90. |

## Pendientes Criticos

- PENDIENTE CRITICO: confirmar fisicamente si los SG90 son de rotacion continua.
- Si los SG90 son estandar de posicion, no sirven como traccion continua del robot minisumo sin modificacion.
- Los servos SG90 pueden consumir mas corriente de la que el Arduino Nano puede entregar de forma estable.
