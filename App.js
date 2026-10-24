// Checkpoint 0: proyecto base.
// Solo comprueba que el entorno funciona y que los archivos de src/ se importan bien.

import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { PREGUNTAS } from './src/data/preguntas';
import { COLORES, COLORES_OPCIONES } from './src/theme';

export default function App() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>QuizIbero</Text>
      <Text style={styles.subtitulo}>
        {PREGUNTAS.length} preguntas sobre React Native
      </Text>
      <View style={styles.fila}>
        {COLORES_OPCIONES.map((color) => (
          <View key={color} style={[styles.caja, { backgroundColor: color }]} />
        ))}
      </View>
      <Text style={styles.nota}>Si ves esto, el entorno está listo.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORES.fondo,
  },
  titulo: { fontSize: 36, fontWeight: 'bold', color: COLORES.rojoIbero },
  subtitulo: { fontSize: 16, marginTop: 8, color: COLORES.texto },
  fila: { flexDirection: 'row', marginTop: 24, gap: 12 },
  caja: { width: 48, height: 48, borderRadius: 8 },
  nota: { marginTop: 32, color: COLORES.textoSuave },
});
