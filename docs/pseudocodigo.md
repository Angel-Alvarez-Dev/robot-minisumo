# Pseudocodigo

## Programa Principal

```text
INICIO
  configurarPines()
  conectar servos en D9 y D10
  detenerRobot()
  sonarBuzzer()
  esperar arranque seguro

  MIENTRAS verdadero
    leerSensoresLinea()

    SI algun sensor de linea detecta borde ENTONCES
      evitarBorde()
      CONTINUAR
    FIN SI

    distancia = leerUltrasonico()

    SI distancia valida Y distancia <= umbral_ataque ENTONCES
      atacar()
    SI NO
      buscarOponente()
    FIN SI
  FIN MIENTRAS
FIN
```

## Evitar Borde

```text
evitarBorde()
  leer sensores de linea
  sonar buzzer
  retroceder durante tiempo corto

  SI borde en Left y no en Right
    girarDerecha()
  SI borde en Right y no en Left
    girarIzquierda()
  SI borde en Back o multiples sensores
    girarDerecha()
  FIN SI

  detenerRobot()
FIN
```

## Atacar

```text
atacar()
  avanzar()
  activar buzzer brevemente
  mantener avance durante intervalo corto
FIN
```

## Buscar Oponente

```text
buscarOponente()
  girarDerecha()
  esperar intervalo corto
FIN
```
