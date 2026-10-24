// Pantalla de inicio.
// CP1: componentes nativos (View, Text, Pressable), StyleSheet y Flexbox.
// CP6: muestra el récord guardado con SecureStore.

import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { leerRecord } from '../storage/record';
import { COLORES, COLORES_OPCIONES } from '../theme';

export default function PantallaInicio({ totalPreguntas, onJugar }) {
  const [record, setRecord] = useState(null);

  // Lee el récord una vez, cuando la pantalla aparece.
  useEffect(() => {
    leerRecord().then(setRecord);
  }, []);

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

      <Text style={styles.record}>
        {record ? `Récord: ${record.puntaje} pts` : 'Todavía no hay récord'}
      </Text>

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
  record: { fontSize: 16, color: COLORES.textoSuave, marginBottom: 24 },
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
