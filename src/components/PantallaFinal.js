// Pantalla final, versión del checkpoint 3.
// Muestra el puntaje y cuántas preguntas se acertaron.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORES } from '../theme';

export default function PantallaFinal({ puntaje, historial, onReiniciar }) {
  const aciertos = historial.filter((h) => h.acierto).length;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Puntaje final</Text>
      <Text style={styles.puntaje}>{puntaje}</Text>
      <Text style={styles.detalle}>
        {aciertos} de {historial.length} respuestas correctas
      </Text>
      <Pressable style={styles.boton} onPress={onReiniciar}>
        <Text style={styles.textoBoton}>Jugar otra vez</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: COLORES.fondo,
  },
  titulo: { fontSize: 22, color: COLORES.texto },
  puntaje: { fontSize: 64, fontWeight: 'bold', color: COLORES.rojoIbero },
  detalle: { fontSize: 16, color: COLORES.textoSuave },
  boton: {
    marginTop: 24,
    backgroundColor: COLORES.rojoIbero,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoBoton: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
