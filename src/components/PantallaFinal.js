// Pantalla final.
// CP3: puntaje y aciertos.
// CP6: resumen con FlatList y récord cifrado con SecureStore.

import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { leerRecord, guardarRecord } from '../storage/record';
import { COLORES } from '../theme';

export default function PantallaFinal({ puntaje, historial, onReiniciar }) {
  const [record, setRecord] = useState(null);
  const [esNuevoRecord, setEsNuevoRecord] = useState(false);
  const aciertos = historial.filter((h) => h.acierto).length;

  // Al mostrarse, compara con el récord guardado y lo actualiza si se superó.
  useEffect(() => {
    let activo = true;
    async function revisar() {
      const anterior = await leerRecord();
      if (!anterior || puntaje > anterior.puntaje) {
        const nuevo = await guardarRecord(puntaje);
        if (activo) {
          setRecord(nuevo);
          setEsNuevoRecord(true);
        }
      } else if (activo) {
        setRecord(anterior);
      }
    }
    revisar();
    return () => {
      activo = false;
    };
  }, [puntaje]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Puntaje final</Text>
      <Text style={styles.puntaje}>{puntaje}</Text>
      <Text style={styles.detalle}>
        {aciertos} de {historial.length} respuestas correctas
      </Text>
      {esNuevoRecord && <Text style={styles.nuevoRecord}>¡Nuevo récord!</Text>}
      {!esNuevoRecord && record && (
        <Text style={styles.detalle}>Récord: {record.puntaje} pts</Text>
      )}

      <FlatList
        style={styles.lista}
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <Text style={[styles.marca, item.acierto ? styles.bien : styles.mal]}>
              {item.acierto ? 'Bien' : 'Mal'}
            </Text>
            <Text style={styles.enunciado} numberOfLines={2}>
              {item.enunciado}
            </Text>
            <Text style={styles.puntos}>+{item.puntos}</Text>
          </View>
        )}
      />

      <Pressable style={styles.boton} onPress={onReiniciar}>
        <Text style={styles.textoBoton}>Jugar otra vez</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 64,
    gap: 6,
    backgroundColor: COLORES.fondo,
  },
  titulo: { fontSize: 20, color: COLORES.texto },
  puntaje: { fontSize: 56, fontWeight: 'bold', color: COLORES.rojoIbero },
  detalle: { fontSize: 16, color: COLORES.textoSuave },
  nuevoRecord: { fontSize: 18, fontWeight: 'bold', color: COLORES.verde },
  lista: { alignSelf: 'stretch', marginTop: 12 },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  marca: { width: 40, fontWeight: 'bold' },
  bien: { color: COLORES.verde },
  mal: { color: COLORES.rojoIbero },
  enunciado: { flex: 1, color: COLORES.texto },
  puntos: { width: 50, textAlign: 'right', color: COLORES.textoSuave },
  boton: {
    marginVertical: 16,
    backgroundColor: COLORES.rojoIbero,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoBoton: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
