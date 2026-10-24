// Punto de entrada de QuizIbero.
// App decide qué pantalla se muestra: inicio, juego o final.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import PantallaInicio from './src/components/PantallaInicio';
import PantallaJuego from './src/components/PantallaJuego';
import PantallaFinal from './src/components/PantallaFinal';
import { PREGUNTAS } from './src/data/preguntas';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [resultado, setResultado] = useState(null);

  function terminar(datos) {
    setResultado(datos);
    setPantalla('final');
  }

  return (
    <>
      {pantalla === 'inicio' && (
        <PantallaInicio
          totalPreguntas={PREGUNTAS.length}
          onJugar={() => setPantalla('juego')}
        />
      )}
      {pantalla === 'juego' && <PantallaJuego onTerminar={terminar} />}
      {pantalla === 'final' && (
        <PantallaFinal
          puntaje={resultado.puntaje}
          historial={resultado.historial}
          onReiniciar={() => setPantalla('inicio')}
        />
      )}
      <StatusBar style="auto" />
    </>
  );
}
