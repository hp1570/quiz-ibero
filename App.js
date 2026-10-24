// Checkpoint 2: "Jugar" cambia de pantalla.
// Conceptos: estado en App para decidir qué pantalla se muestra.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import PantallaInicio from './src/components/PantallaInicio';
import PantallaJuego from './src/components/PantallaJuego';
import { PREGUNTAS } from './src/data/preguntas';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');

  return (
    <>
      {pantalla === 'inicio' && (
        <PantallaInicio
          totalPreguntas={PREGUNTAS.length}
          onJugar={() => setPantalla('juego')}
        />
      )}
      {pantalla === 'juego' && <PantallaJuego />}
      <StatusBar style="auto" />
    </>
  );
}
