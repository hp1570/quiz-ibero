// Pantalla de inicio.
// CP1: componentes nativos (View, Text, Pressable), StyleSheet y Flexbox.
// CP6: muestra el récord guardado con SecureStore.
// CP7: indica en qué plataforma corre (el mismo código en Android y en iOS).
// Demo: en Android con huella registrada, el récord se desbloquea con biometría.

import { useEffect, useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import { leerRecord } from '../storage/record';
import { biometriaDisponible, autenticar } from '../storage/biometria';
import { COLORES, COLORES_OPCIONES } from '../theme';

const NOMBRE_PLATAFORMA = Platform.select({
  ios: 'iOS',
  android: 'Android',
  default: Platform.OS,
});

export default function PantallaInicio({ totalPreguntas, onJugar }) {
  const [record, setRecord] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);

  // Lee el récord una vez, cuando la pantalla aparece.
  useEffect(() => {
    leerRecord().then(setRecord);
  }, []);

  // Demo: solo en Android, si hay huella registrada, el récord empieza oculto.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    biometriaDisponible().then(setBloqueado);
  }, []);

  async function desbloquear() {
    const ok = await autenticar();
    if (ok) setBloqueado(false);
  }

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

      {bloqueado ? (
        <Pressable style={styles.botonHuella} onPress={desbloquear}>
          <Text style={styles.textoHuella}>Ver récord con huella</Text>
        </Pressable>
      ) : (
        <Text style={styles.record}>
          {record ? `Récord: ${record.puntaje} pts` : 'Todavía no hay récord'}
        </Text>
      )}

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        onPress={onJugar}
      >
        <Text style={styles.textoBoton}>Jugar</Text>
      </Pressable>

      <Text style={styles.plataforma}>
        Corriendo en {NOMBRE_PLATAFORMA} {Platform.Version}
      </Text>
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
  botonHuella: {
    borderWidth: 2,
    borderColor: COLORES.azul,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  textoHuella: { color: COLORES.azul, fontSize: 16, fontWeight: '600' },
  caja: { width: 48, height: 48, borderRadius: 8 },
  boton: {
    backgroundColor: COLORES.rojoIbero,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  presionado: { opacity: 0.8 },
  textoBoton: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  plataforma: { marginTop: 32, fontSize: 13, color: COLORES.textoSuave },
});
