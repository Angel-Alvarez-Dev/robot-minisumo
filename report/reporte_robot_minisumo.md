# Reporte Academico: Robot Minisumo

## 1. Portada

**Proyecto:** Robot Minisumo con Arduino Nano  
**Plataforma:** Arduino Nano + Arduino Nano Expansion I/O Shield  
**Fecha:** 2026-06-05

## 2. Indice

1. Introduccion
2. Objetivos
3. Investigacion documental
4. Materiales y equipo
5. Diagrama de conexiones
6. Esquematicos de circuitos
7. Desarrollo del sistema
8. Codigo implementado
9. Algoritmos
10. Pseudocodigo
11. Diagramas de flujo
12. Simulaciones
13. Pruebas y validacion
14. Pendientes criticos
15. Resultados esperados
16. Conclusiones
17. Referencias

## 3. Introduccion

El Robot Minisumo es un sistema autonomo que detecta bordes, busca oponente y ejecuta ataque. Esta version usa Arduino Nano, Shield de expansion, HC-SR04, tres TCRT5000, dos SG90 y buzzer KY-012.

## 4. Objetivo General

Actualizar y consolidar el proyecto para que el hardware, firmware, KiCad, documentacion y validacion coincidan con la configuracion actual.

## 5. Objetivos Especificos

- Documentar la BOM y conexiones actualizadas.
- Reservar D0/D1 para Serial y reasignar sensores de linea.
- Crear firmware modular y pruebas individuales.
- Crear esquematico KiCad documental.
- Preparar evidencia de simulacion y validacion.
- Preparar el proyecto para Git/GitHub.

## 6. Investigacion Documental

Ver `docs/investigacion_documental.md`.

## 7. Materiales Y Equipo

Ver `docs/bom_actualizada.md`.

## 8. Descripcion De Componentes

- Arduino Nano: control principal.
- Shield: distribucion de senal, VCC y GND.
- HC-SR04: deteccion frontal.
- TCRT5000: deteccion de borde.
- SG90: traccion solo si son de rotacion continua.
- KY-012: indicador sonoro.

## 9. Diagrama De Conexiones

![Diagrama de conexiones](assets/diagrama_conexiones.png)

| Componente | Senal | Pin |
| --- | --- | --- |
| TCRT5000 Left | DO | D3 |
| TCRT5000 Right | DO | D2 |
| TCRT5000 Back | DO | D0 |
| HC-SR04 | Trig | D4 |
| HC-SR04 | Echo | D5 |
| KY-012 | Signal | D7 |
| SG90 Left | Signal | D9 |
| SG90 Right | Signal | D10 |

D0/D1 quedan libres para RX/TX Serial.

## 10. Esquematicos De Circuitos

El proyecto KiCad esta en `hardware/kicad/robot_minisumo.kicad_pro`. El esquematico es documental y representa conexiones sobre la Shield.

## 11. Desarrollo Del Sistema

El firmware prioriza evasion de borde. Si no hay borde, mide distancia. Si hay oponente cerca, ataca. Si no hay oponente, busca girando.

## 12. Codigo Implementado

```cpp
const byte PIN_TCRT_LEFT = 2;
const byte PIN_TCRT_RIGHT = 3;
const byte PIN_TCRT_BACK = 6;
const byte PIN_TRIG_HCSR04 = 4;
const byte PIN_ECHO_HCSR04 = 5;
const byte PIN_BUZZER = 7;
const byte PIN_SERVO_LEFT = 9;
const byte PIN_SERVO_RIGHT = 10;
```

Codigo completo: `firmware/robot_minisumo_final/robot_minisumo_final.ino`.

## 13. Algoritmos

Ver `docs/algoritmos.md`.

## 14. Pseudocodigo

Ver `docs/pseudocodigo.md`.

## 15. Diagramas De Flujo

Ver `docs/diagramas_flujo.md`.

## 16. Simulaciones

Ver `simulation/simulacion_kicad.md` y `simulation/validacion_logica.md`.

## 17. Pruebas Y Validacion

Ver `simulation/casos_prueba.md` y `validation/registro_pruebas.md`.

## 18. Pendientes Criticos Y Validacion Tecnica

- PENDIENTE CRITICO: confirmar fisicamente si los SG90 son de rotacion continua.
- Si los SG90 son estandar de posicion, no sirven como traccion continua sin modificacion.
- Los servos SG90 pueden consumir mas corriente de la que el Arduino Nano entrega de forma estable.
- D0 se usa por TCRT Back y D1 queda libre para TX Serial.

## 19. Resultados Esperados

- Detectar borde con TCRT5000.
- Detectar oponente con HC-SR04.
- Atacar si hay oponente cerca.
- Buscar si no hay oponente.
- Evadir borde antes de salir del area.

## 20. Conclusiones

El proyecto queda consolidado alrededor de Arduino Nano + Shield y servos SG90, con pinout seguro sin D0/D1. La entrega queda lista para compilar, validar hardware y subir a GitHub.

## 21. Referencias

- Documentacion Arduino Nano y libreria Servo.
- Hojas tecnicas HC-SR04, TCRT5000, SG90 y KY-012.
- Documentacion KiCad.
- BOM y diagrama de conexiones del proyecto.

## Entregables

| Entregable | Archivo | Estado |
| --- | --- | --- |
| BOM | `docs/bom_actualizada.md` | Completo |
| Conexiones | `docs/lista_conexiones.md` | Completo |
| Firmware | `firmware/` | Completo |
| KiCad | `hardware/kicad/` | Completo, ERC pendiente |
| Validacion | `validation/` | Completo documental |
| Web | `web-control/` | Completo |

