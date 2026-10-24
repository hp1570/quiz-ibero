// Checkpoint 1: la app muestra la pantalla de inicio.
// El botón "Jugar" todavía no hace nada; eso llega en el checkpoint 2.

import { StatusBar } from 'expo-status-bar';
import PantallaInicio from './src/components/PantallaInicio';
import { PREGUNTAS } from './src/data/preguntas';

export default function App() {
  return (
    <>
      <PantallaInicio totalPreguntas={PREGUNTAS.length} onJugar={() => {}} />
      <StatusBar style="auto" />
    </>
  );
}
