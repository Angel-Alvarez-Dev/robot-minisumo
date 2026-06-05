# Pseudocodigo

```text
configurarPines()
detenerRobot()
sonarBuzzer()
esperar 3000 ms

mientras verdadero:
    actualizarServos()
    procesarComandoSerial()

    linea = leerSensoresLinea()
    si linea.left o linea.right o linea.back:
        evitarBorde()
        continuar

    distancia = leerUltrasonico()
    si distancia > 0 y distancia <= 35:
        atacar()
    si no:
        buscarOponente()
```

```text
evitarBorde():
    sonarBuzzer(120)
    retroceder()
    esperar 350 ms
    si borde izquierdo y no borde derecho:
        girarDerecha()
    si borde derecho y no borde izquierdo:
        girarIzquierda()
    si borde trasero o lectura multiple:
        girarDerecha()
    esperar 350 a 500 ms
    detenerRobot()
```
