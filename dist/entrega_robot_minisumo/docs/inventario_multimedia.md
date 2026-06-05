# Inventario multimedia

Fecha: 2026-06-05
Proyecto: Robot Minisumo

Este inventario organiza la evidencia visual y de video del prototipo funcional. Los archivos originales de la carpeta externa `C:/Users/alvar/Downloads/Robot sumo Assets/` no fueron borrados; se copiaron al proyecto con nombres normalizados, en minusculas, sin espacios ni acentos.

## Estructura final

| Carpeta | Uso |
| --- | --- |
| `assets/images/conexiones/` | Diagramas finales de conexion. |
| `assets/images/montaje/` | Fotografias del montaje fisico del prototipo. |
| `assets/images/pruebas/` | Fotografias de pruebas y componentes activos. |
| `assets/images/panel/` | Capturas del panel web de monitoreo. |
| `assets/images/kicad/` | Reservado para futuras capturas/exportaciones KiCad. |
| `assets/videos/pruebas/` | Videos cortos de pruebas por componente o comportamiento. |
| `assets/videos/demo_final/` | Video principal de funcionamiento del robot. |

## Evidencia integrada

| Archivo final | Origen | Tipo | Tamano | Duracion / dimensiones | Uso |
| --- | --- | --- | --- | --- | --- |
| `assets/images/conexiones/robot_minisumo_conexiones_diagrama_final_01.png` | `diagrama de conexiones.png` | Imagen | 641 KB | 1242x817 | Diagrama final de cableado real. |
| `assets/images/montaje/robot_minisumo_montaje_frontal_hcsr04_01.jpg` | `WhatsApp Image 2026-06-05 at 3.39.11 PM.jpeg` | Imagen | 102 KB | 1280x963 | Vista frontal con HC-SR04. |
| `assets/images/montaje/robot_minisumo_montaje_lateral_izquierdo_01.jpg` | `WhatsApp Image 2026-06-05 at 3.39.10 PM.jpeg` | Imagen | 112 KB | 1280x963 | Vista lateral del montaje, alimentacion y rueda. |
| `assets/images/montaje/robot_minisumo_montaje_lateral_derecho_01.jpg` | `WhatsApp Image 2026-06-05 at 3.39.10 PM (1).jpeg` | Imagen | 102 KB | 1280x963 | Vista lateral opuesta del prototipo. |
| `assets/images/montaje/robot_minisumo_montaje_posterior_electronica_01.jpg` | `WhatsApp Image 2026-06-05 at 3.39.10 PM (2).jpeg` | Imagen | 107 KB | 1280x963 | Vista posterior con Arduino Nano, shield y buzzer. |
| `assets/images/pruebas/robot_minisumo_pruebas_alimentacion_sensores_01.jpg` | `WhatsApp Image 2026-06-05 at 3.39.11 PM (1).jpeg` | Imagen | 137 KB | 963x1280 | Vista superior con sensores/alimentacion activos. |
| `assets/images/panel/robot_minisumo_panel_monitoreo_desktop_01.png` | Captura generada desde `http://localhost:8080/web-control/` | Imagen | 59 KB | 1366x768 | Captura principal del panel en formato laptop. |
| `assets/images/panel/robot_minisumo_panel_monitoreo_demo_01.png` | Captura del navegador integrado | Imagen | 27 KB | 304x550 | Captura responsiva estrecha del panel en modo demo. |
| `assets/videos/pruebas/robot_minisumo_pruebas_buzzer_arranque_01.mp4` | `WhatsApp Video 2026-06-05 at 3.39.00 PM (1).mp4` | Video | 0.50 MB | 00:00:02 | Prueba corta de arranque/buzzer. |
| `assets/videos/pruebas/robot_minisumo_pruebas_movimiento_servos_01.mp4` | `WhatsApp Video 2026-06-05 at 3.39.00 PM.mp4` | Video | 2.12 MB | 00:00:09 | Prueba de movimiento con servos SG90. |
| `assets/videos/pruebas/robot_minisumo_pruebas_sensores_linea_01.mp4` | `WhatsApp Video 2026-06-05 at 3.39.09 PM.mp4` | Video | 1.35 MB | 00:00:06 | Prueba de sensores de linea / borde. |
| `assets/videos/pruebas/robot_minisumo_pruebas_ultrasonico_busqueda_01.mp4` | `WhatsApp Video 2026-06-05 at 3.39.10 PM (1).mp4` | Video | 2.18 MB | 00:00:09 | Prueba de busqueda con HC-SR04. |
| `assets/videos/demo_final/robot_minisumo_demo_funcionamiento_final_01.mp4` | `WhatsApp Video 2026-06-05 at 3.39.10 PM.mp4` | Video | 3.39 MB | 00:00:15 | Demostracion final del robot funcional. |

## Copias para reporte y entrega

| Destino | Contenido |
| --- | --- |
| `report/assets/` | Imagenes necesarias para el reporte academico: diagrama, fotos del prototipo y captura del panel. |
| `dist/entrega_robot_minisumo/assets/` | Copia completa de la evidencia final, incluyendo imagenes y videos. |

## Multimedia existente antes de organizar

| Ruta existente | Estado | Accion |
| --- | --- | --- |
| `docs/assets/diagrama_conexiones_final.png` | Evidencia documental previa. | Se conserva. |
| `docs/assets/diagrama_conexiones.png` | Copia previa del diagrama. | Se conserva. |
| `hardware/assets/diagrama_conexiones_final.png` | Evidencia hardware previa. | Se conserva. |
| `report/assets/diagrama_conexiones_final.png` | Evidencia previa en reporte. | Se conserva. |
| `web-control/assets/diagrama_conexiones_final.png` | Recurso usado por panel. | Se conserva. |
| `dist/entrega_robot_minisumo/.../diagrama_conexiones*.png` | Copias previas de entrega. | Se conserva. |
| `references/components/*` | Imagenes tecnicas de componentes. | Se conservan como referencia tecnica. |
| `archive/legacy_20260605/*` | Material archivado anterior. | Se conserva. |

## Observaciones

- No se elimino evidencia util del proyecto.
- No se detectaron videos pesados para GitHub: el mayor archivo integrado pesa 3.39 MB.
- No se habilito Git LFS porque no fue necesario para estos tamanos.
- La carpeta `assets/images/kicad/` queda preparada con `.gitkeep`; no se encontraron exportaciones KiCad en imagen para copiar sin modificar KiCad.
