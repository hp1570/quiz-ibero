// Pantalla de inicio (checkpoint 1).
// Conceptos: componentes nativos (View, Text, Pressable), StyleSheet y Flexbox.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORES, COLORES_OPCIONES } from '../theme';

export default function PantallaInicio({ totalPreguntas, onJugar }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>QuizIbero</Text>
      <Text style={styles.subtitulo}>
        {totalPreguntas} preguntas sobre React Native
      </Text>

      <View style={styles.fila}>
        {COLORES_OPCIONES.map((color) => (
          <View key={color} style={[styles.caja, { backgroundColor: color }]} />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        onPress={onJugar}
      >
        <Text style={styles.textoBoton}>Jugar</Text>
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
    backgroundColor: COLORES.fondo,
  },
  titulo: { fontSize: 40, fontWeight: 'bold', color: COLORES.rojoIbero },
  subtitulo: { fontSize: 16, marginTop: 8, color: COLORES.texto },
  fila: { flexDirection: 'row', marginVertical: 32, gap: 12 },
  caja: { width: 48, height: 48, borderRadius: 8 },
  boton: {
    backgroundColor: COLORES.rojoIbero,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  presionado: { opacity: 0.8 },
  textoBoton: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
});
