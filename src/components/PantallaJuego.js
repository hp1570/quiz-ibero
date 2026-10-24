// Pantalla de juego.
// CP4: tiempo por pregunta, puntos por rapidez y rachas (useEffect y limpieza).
// CP5: animación de acierto/error con Animated y native driver.

import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
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

  // CP5: valor animado de 0 a 1 para el aviso de acierto/error.
  // useNativeDriver: true manda la animación al hilo nativo, así no depende de JavaScript.
  const aparicion = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!respondida) {
      aparicion.setValue(0);
      return;
    }
    Animated.spring(aparicion, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [respondida]);

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

  const ultimo = historial[historial.length - 1];
  const acerto = respondida && seleccion === pregunta.correcta;
  let aviso = '';
  if (respondida) {
    if (seleccion === TIEMPO_AGOTADO) aviso = 'Se acabó el tiempo';
    else if (acerto) aviso = `¡Correcto! +${ultimo ? ultimo.puntos : 0}`;
    else aviso = 'Incorrecto';
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
        <Animated.View
          style={[
            styles.aviso,
            acerto ? styles.avisoBien : styles.avisoMal,
            {
              opacity: aparicion,
              transform: [
                {
                  scale: aparicion.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.textoAviso}>{aviso}</Text>
        </Animated.View>
      )}

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
  aviso: { padding: 14, borderRadius: 12, alignItems: 'center' },
  avisoBien: { backgroundColor: COLORES.verde },
  avisoMal: { backgroundColor: COLORES.rojoIbero },
  textoAviso: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  siguiente: {
    backgroundColor: COLORES.texto,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoSiguiente: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
