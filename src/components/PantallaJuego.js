// Pantalla de juego, versión del checkpoint 3.
// Recorre todo el banco de preguntas y lleva el puntaje.
// Conceptos: varios estados, actualizar a partir del valor anterior, arreglos inmutables.

import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Pregunta from './Pregunta';
import { PREGUNTAS } from '../data/preguntas';
import { COLORES } from '../theme';

export default function PantallaJuego({ onTerminar }) {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [historial, setHistorial] = useState([]);

  const pregunta = PREGUNTAS[indice];
  const respondida = seleccion !== null;
  const esUltima = indice === PREGUNTAS.length - 1;

  function responder(opcion) {
    if (respondida) return;
    const acierto = opcion === pregunta.correcta;
    const puntos = acierto ? 100 : 0;
    setSeleccion(opcion);
    setPuntaje((p) => p + puntos);
    setHistorial((h) => [
      ...h,
      { id: pregunta.id, enunciado: pregunta.enunciado, acierto, puntos },
    ]);
  }

  function siguiente() {
    if (esUltima) {
      onTerminar({ puntaje, historial });
      return;
    }
    setIndice((i) => i + 1);
    setSeleccion(null);
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.encabezado}>
        Pregunta {indice + 1} de {PREGUNTAS.length} · {puntaje} pts
      </Text>

      <Pregunta pregunta={pregunta} seleccion={seleccion} onResponder={responder} />

      {respondida && (
        <Pressable style={styles.siguiente} onPress={siguiente}>
          <Text style={styles.textoSiguiente}>
            {esUltima ? 'Ver resultados' : 'Siguiente'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: 64,
    gap: 16,
    backgroundColor: COLORES.fondo,
  },
  encabezado: { fontSize: 16, fontWeight: '600', color: COLORES.texto },
  siguiente: {
    backgroundColor: COLORES.texto,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoSiguiente: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
