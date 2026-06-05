# Netlist final - Robot Sumo Arduino Nano Shield

Arquitectura: Arduino Nano V3 insertado en Arduino Nano Expansion I/O Shield.

En la shield, cada puerto expone una fila tipo `S/V/G`:

- `S`: senal del pin Arduino.
- `V`: alimentacion logica del bloque.
- `G`: tierra comun.

## Nets de alimentacion

| Net | Origen | Destinos | Nota |
|---|---|---|---|
| `+5V_LOGIC` | Shield `V` / fuente 5 V regulada | HC-SR04 VCC, 3 sensores IR VCC, KY-012 VCC | No sobrecargar USB |
| `+5V_SERVO` | Fuente 5 V estable para servos | Servo izquierdo rojo, servo derecho rojo | Recomendado externo si los servos consumen mucho |
| `GND` | Shield `G` y fuente externa | Arduino, sensores, buzzer y servos | Tierra comun obligatoria |

## Nets de senal

| Net | Pin Arduino | Puerto Shield | Componente | Cable / pin del modulo |
|---|---:|---|---|---|
| `IR_LEFT_SIG` | D2 | `S` de D2 | Sensor infrarrojo izquierdo | OUT / DO |
| `IR_RIGHT_SIG` | D3 | `S` de D3 | Sensor infrarrojo derecho | OUT / DO |
| `IR_BACK_SIG` | D4 | `S` de D4 | Sensor infrarrojo trasero | OUT / DO |
| `US_TRIG` | D5 | `S` de D5 | HC-SR04 frontal | TRIG |
| `US_ECHO` | D6 | `S` de D6 | HC-SR04 frontal | ECHO |
| `SERVO_RIGHT_SIG` | D9 | `S` de D9 | Servo rueda derecha | Naranja / PWM |
| `SERVO_LEFT_SIG` | D10 | `S` de D10 | Servo rueda izquierda | Naranja / PWM |
| `BUZZER_SIG` | D12 | `S` de D12 | Buzzer activo KY-012 | SIG |

## Conexiones por componente

### Servo rueda derecha

- Naranja / PWM -> `SERVO_RIGHT_SIG` / D9.
- Rojo -> `+5V_SERVO`.
- Cafe / marron -> `GND`.

### Servo rueda izquierda

- Naranja / PWM -> `SERVO_LEFT_SIG` / D10.
- Rojo -> `+5V_SERVO`.
- Cafe / marron -> `GND`.

### HC-SR04 frontal

- VCC -> `+5V_LOGIC`.
- GND -> `GND`.
- TRIG -> D5.
- ECHO -> D6.

### Sensor infrarrojo izquierdo

- VCC -> `+5V_LOGIC`.
- GND -> `GND`.
- OUT/DO -> D2.

### Sensor infrarrojo derecho

- VCC -> `+5V_LOGIC`.
- GND -> `GND`.
- OUT/DO -> D3.

### Sensor infrarrojo trasero

- VCC -> `+5V_LOGIC`.
- GND -> `GND`.
- OUT/DO -> D4.

### Buzzer activo KY-012

- SIG -> D12.
- VCC -> `+5V_LOGIC`.
- GND -> `GND`.

## Pines reservados

| Pin | Uso |
|---:|---|
| D0/D1 | USB Serial, no usar para sensores |
| D2/D3/D4 | Sensores de linea izquierdo, derecho y trasero |
| D7/D8 | Libres |
| A0-A7 | Libres para futuras entradas analogicas |
