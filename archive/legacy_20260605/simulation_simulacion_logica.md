# Simulacion logica

## Que se puede simular

- Estados del algoritmo: inicio, busqueda, ataque, borde y recuperacion.
- Entradas digitales que sustituyen sensores TCRT5000.
- Trigger y Echo del HC-SR04 mediante componente disponible o senal sustituida.
- Salidas digitales IN1/IN2 hacia driver.
- Salidas PWM D9 y D10 como senales de velocidad.
- Activacion del buzzer.

## Que no se puede simular con precision

- Traccion real de llantas.
- Corriente de arranque de motores N20.
- Lecturas reales de TCRT5000 sobre el dojo.
- Efecto de iluminacion ambiental.
- Rebotes mecanicos, peso del chasis y centro de gravedad.
- Desempeno real del driver si aun no esta seleccionado.

## Modelo por sustitucion

Para validar la logica, cada sensor TCRT5000 puede representarse como una entrada digital con interruptor:

| Entrada | Significado |
|---|---|
| D2 | Borde izquierdo |
| D4 | Borde derecho |
| D7 | Borde trasero |

El HC-SR04 puede simularse con distancia fija o con una rutina auxiliar que entregue distancia menor o mayor al umbral.

## Validacion de salidas

| Salida | Validacion |
|---|---|
| D8/A0/D9 | Direccion y PWM del motor izquierdo |
| A1/A2/D10 | Direccion y PWM del motor derecho |
| D12 | Buzzer |

## Conclusion de simulacion

La simulacion sirve para comprobar que las decisiones del firmware son coherentes. La validacion final debe hacerse sobre el robot fisico, empezando con velocidad baja y firmware de pruebas.

