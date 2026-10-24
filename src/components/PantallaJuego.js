// Pantalla de juego, versión del checkpoint 2.
// Muestra solo la primera pregunta y dice si la respuesta fue correcta.
// Conceptos: useState y eventos (onPress).

import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Pregunta from './Pregunta';
import { PREGUNTAS } from '../data/preguntas';
import { COLORES } from '../theme';

export default function PantallaJuego() {
  const [seleccion, setSeleccion] = useState(null);
  const pregunta = PREGUNTAS[0];

  return (
    <View style={styles.contenedor}>
      <Pregunta
        pregunta={pregunta}
        seleccion={seleccion}
        onResponder={setSeleccion}
      />
      {seleccion !== null && (
        <Text style={styles.mensaje}>
          {seleccion === pregunta.correcta ? '¡Correcto!' : 'Incorrecto'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORES.fondo,
  },
  mensaje: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: COLORES.texto,
  },
});
