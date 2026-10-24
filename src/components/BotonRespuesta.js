// Un botón de respuesta (checkpoint 2).
// Conceptos: props y estilos que dependen de las props.
//
// estado: 'normal'     → se puede tocar
//         'correcta'   → ya se respondió y esta era la buena (borde grueso)
//         'incorrecta' → el jugador eligió esta y estaba mal (gris)
//         'apagada'    → ya se respondió y esta no importa (transparente)

import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORES } from '../theme';

export default function BotonRespuesta({ texto, color, estado = 'normal', onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={estado !== 'normal'}
      style={({ pressed }) => [
        styles.boton,
        { backgroundColor: color },
        estado === 'correcta' && styles.correcta,
        estado === 'incorrecta' && styles.incorrecta,
        estado === 'apagada' && styles.apagada,
        pressed && styles.presionado,
      ]}
    >
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: { paddingVertical: 16, paddingHorizontal: 12, borderRadius: 10 },
  correcta: { borderWidth: 4, borderColor: COLORES.texto },
  incorrecta: { backgroundColor: '#7A7A7A' },
  apagada: { opacity: 0.35 },
  presionado: { opacity: 0.8 },
  texto: { color: '#FFFFFF', fontSize: 17, fontWeight: '600', textAlign: 'center' },
});
