# Evidencia multimedia del Robot Minisumo

La evidencia multimedia documenta el prototipo fisico, su cableado, pruebas de componentes, panel web y funcionamiento final. Esta evidencia esta pensada para acompanar la entrega academica y para explicar el robot durante la grabacion del video final.

## Evidencia visual principal

| Evidencia | Archivo | Que muestra |
| --- | --- | --- |
| Diagrama de conexiones | `assets/images/conexiones/robot_minisumo_conexiones_diagrama_final_01.png` | Pinout real: TCRT5000 Left D3, Right D2, Back D0, HC-SR04 D4/D5, buzzer D7, servos D9/D10. |
| Montaje frontal | `assets/images/montaje/robot_minisumo_montaje_frontal_hcsr04_01.jpg` | Carcasa del prototipo y sensor HC-SR04 al frente. |
| Montaje lateral izquierdo | `assets/images/montaje/robot_minisumo_montaje_lateral_izquierdo_01.jpg` | Rueda, porta pilas, shield y sensores activos. |
| Montaje lateral derecho | `assets/images/montaje/robot_minisumo_montaje_lateral_derecho_01.jpg` | Vista lateral opuesta del ensamble fisico. |
| Montaje posterior | `assets/images/montaje/robot_minisumo_montaje_posterior_electronica_01.jpg` | Arduino Nano, shield, buzzer y cableado posterior. |
| Prueba superior | `assets/images/pruebas/robot_minisumo_pruebas_alimentacion_sensores_01.jpg` | Alimentacion, cableado y modulos encendidos. |
| Panel web | `assets/images/panel/robot_minisumo_panel_monitoreo_desktop_01.png` | Panel minimalista de monitoreo en vista laptop. |

## Evidencia en video

| Video | Duracion | Tamano | Uso recomendado |
| --- | --- | --- | --- |
| `assets/videos/pruebas/robot_minisumo_pruebas_buzzer_arranque_01.mp4` | 00:00:02 | 0.50 MB | Mostrar senal sonora de arranque o prueba de buzzer. |
| `assets/videos/pruebas/robot_minisumo_pruebas_movimiento_servos_01.mp4` | 00:00:09 | 2.12 MB | Mostrar movimiento de servos/motores. |
| `assets/videos/pruebas/robot_minisumo_pruebas_sensores_linea_01.mp4` | 00:00:06 | 1.35 MB | Mostrar respuesta de sensores TCRT5000. |
| `assets/videos/pruebas/robot_minisumo_pruebas_ultrasonico_busqueda_01.mp4` | 00:00:09 | 2.18 MB | Mostrar busqueda o deteccion con HC-SR04. |
| `assets/videos/demo_final/robot_minisumo_demo_funcionamiento_final_01.mp4` | 00:00:15 | 3.39 MB | Video principal para demostrar el robot funcionando. |

## Uso durante la grabacion final

1. Abrir `http://localhost:8080/web-control/` o `web-control/index.html`.
2. Colocar la laptop junto al robot para que el panel sea visible durante la explicacion.
3. Usar modo real si el Arduino esta conectado por Web Serial.
4. Usar modo demo si se necesita explicar un estado sin depender de la lectura real en ese momento.
5. Reproducir o mostrar los videos de `assets/videos/demo_final/` y `assets/videos/pruebas/` como evidencia de funcionamiento.

## Limitaciones

- Los videos estan integrados como evidencia local del repositorio; para una publicacion publica se recomienda revisar que no incluyan informacion personal o fondo no deseado.
- La comunicacion Web Serial depende de navegador compatible y permiso manual del usuario para seleccionar el puerto.
- La carpeta `assets/images/kicad/` queda reservada porque no habia una imagen KiCad adicional lista para copiar sin cambiar los archivos de KiCad.
