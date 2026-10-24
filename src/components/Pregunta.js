// Una pregunta con sus 4 respuestas (checkpoint 2).
// Conceptos: composición (Pregunta usa BotonRespuesta), listas con map y key.
// CP5: la sombra de la tarjeta se define distinto en cada plataforma con Platform.select.

import { View, Text, Platform, StyleSheet } from 'react-native';
import BotonRespuesta from './BotonRespuesta';
import { COLORES, COLORES_OPCIONES } from '../theme';

// Decide cómo se ve cada botón según lo que ya se respondió.
function estadoDe(opcion, pregunta, seleccion) {
  if (seleccion === null) return 'normal';
  if (opcion === pregunta.correcta) return 'correcta';
  if (opcion === seleccion) return 'incorrecta';
  return 'apagada';
}

export default function Pregunta({ pregunta, seleccion, onResponder }) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.enunciado}>{pregunta.enunciado}</Text>
      {pregunta.opciones.map((opcion, i) => (
        <BotonRespuesta
          key={opcion}
          texto={opcion}
          color={COLORES_OPCIONES[i]}
          estado={estadoDe(opcion, pregunta, seleccion)}
          onPress={() => onResponder(opcion)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    // iOS dibuja sombras con shadow*; Android usa elevation (Material Design).
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
    }),
  },
  enunciado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORES.texto,
    marginBottom: 6,
  },
});
