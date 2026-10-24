// Pantalla de juego, versión del checkpoint 4.
// Agrega tiempo por pregunta, puntos por rapidez y rachas.
// Conceptos: useEffect, arreglo de dependencias y limpieza de efectos.

import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Pregunta from './Pregunta';
import { PREGUNTAS } from '../data/preguntas';
import { COLORES, TIEMPO_POR_PREGUNTA } from '../theme';

// Valor especial de `seleccion` cuando se acaba el tiempo sin responder.
const TIEMPO_AGOTADO = '__tiempo_agotado__';

export default function PantallaJuego({ onTerminar }) {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [segundos, setSegundos] = useState(TIEMPO_POR_PREGUNTA);
  const [puntaje, setPuntaje] = useState(0);
  const [racha, setRacha] = useState(0);
  const [historial, setHistorial] = useState([]);

  const pregunta = PREGUNTAS[indice];
  const respondida = seleccion !== null;
  const esUltima = indice === PREGUNTAS.length - 1;

  // Temporizador: corre solo mientras la pregunta no se ha respondido.
  // La función que regresa el efecto detiene el intervalo (limpieza).
  useEffect(() => {
    if (respondida) return;
    const id = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [indice, respondida]);

  // Si el tiempo llega a 0 sin respuesta, la pregunta cuenta como fallada.
  useEffect(() => {
    if (!respondida && segundos <= 0) responder(TIEMPO_AGOTADO);
  }, [segundos]);

  function responder(opcion) {
    if (respondida) return;
    const acierto = opcion === pregunta.correcta;
    // 100 base + 10 por cada segundo restante + 50 por cada acierto previo en la racha
    const puntos = acierto ? 100 + segundos * 10 + racha * 50 : 0;
    setSeleccion(opcion);
    setPuntaje((p) => p + puntos);
    setRacha(acierto ? racha + 1 : 0);
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
    setSegundos(TIEMPO_POR_PREGUNTA);
  }

  const restantes = Math.max(segundos, 0);
  const urgente = restantes <= 3;

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.textoEncabezado}>
          Pregunta {indice + 1} de {PREGUNTAS.length}
        </Text>
        <Text style={styles.textoEncabezado}>{puntaje} pts</Text>
      </View>

      <View style={styles.barraFondo}>
        <View
          style={[
            styles.barra,
            { width: `${(restantes / TIEMPO_POR_PREGUNTA) * 100}%` },
            urgente && styles.barraUrgente,
          ]}
        />
      </View>
      <Text style={[styles.segundos, urgente && styles.segundosUrgentes]}>
        {restantes} s{racha >= 2 ? `  ·  Racha x${racha}` : ''}
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
    gap: 12,
    backgroundColor: COLORES.fondo,
  },
  encabezado: { flexDirection: 'row', justifyContent: 'space-between' },
  textoEncabezado: { fontSize: 16, fontWeight: '600', color: COLORES.texto },
  barraFondo: { height: 10, borderRadius: 5, backgroundColor: '#DDDDDD' },
  barra: { height: 10, borderRadius: 5, backgroundColor: COLORES.azul },
  barraUrgente: { backgroundColor: COLORES.rojoIbero },
  segundos: { fontSize: 15, color: COLORES.textoSuave },
  segundosUrgentes: { color: COLORES.rojoIbero, fontWeight: 'bold' },
  siguiente: {
    backgroundColor: COLORES.texto,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoSiguiente: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
