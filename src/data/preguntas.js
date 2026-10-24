// Banco de preguntas de QuizIbero.
// Cada respuesta correcta sale de la documentación oficial de React Native
// (https://reactnative.dev). La URL va en `fuente` para citarla en el documento.
//
// Formato:
//   id:        identificador único (se usa como `key`)
//   enunciado: texto de la pregunta
//   opciones:  exactamente 4 respuestas
//   correcta:  el texto EXACTO de la opción correcta
//
// Checkpoint 3: cada compañero agrega aquí una pregunta propia.

export const PREGUNTAS = [
  {
    id: 'p01',
    enunciado: '¿Qué vista de Android crea React Native para <Text>?',
    opciones: ['TextView', 'WebView', 'EditText', 'ImageView'],
    correcta: 'TextView',
    fuente: 'https://reactnative.dev/docs/intro-react-native-components',
  },
  {
    id: 'p02',
    enunciado: '¿Qué vista de Android corresponde a <View>?',
    opciones: ['LinearLayout', 'ViewGroup', 'WebView', 'FrameLayout'],
    correcta: 'ViewGroup',
    fuente: 'https://reactnative.dev/docs/intro-react-native-components',
  },
  {
    id: 'p03',
    enunciado: '¿Qué vista de iOS corresponde a <Image>?',
    opciones: ['UIView', 'UIImageView', 'UIScrollView', 'UITextView'],
    correcta: 'UIImageView',
    fuente: 'https://reactnative.dev/docs/intro-react-native-components',
  },
  {
    id: 'p04',
    enunciado: '¿Cuál es el flexDirection por defecto en React Native?',
    opciones: ['row', 'column', 'row-reverse', 'wrap'],
    correcta: 'column',
    fuente: 'https://reactnative.dev/docs/flexbox',
  },
  {
    id: 'p05',
    enunciado: '¿Cuál es el valor por defecto de flexShrink en React Native?',
    opciones: ['1', 'auto', '0', 'none'],
    correcta: '0',
    fuente: 'https://reactnative.dev/docs/flexbox',
  },
  {
    id: 'p06',
    enunciado: '¿Qué componente dibuja solo los elementos visibles de una lista larga?',
    opciones: ['ScrollView', 'View', 'FlatList', 'Text'],
    correcta: 'FlatList',
    fuente: 'https://reactnative.dev/docs/using-a-listview',
  },
  {
    id: 'p07',
    enunciado: '¿Qué dos props son obligatorias en FlatList?',
    opciones: ['data y renderItem', 'items y render', 'list y key', 'source y map'],
    correcta: 'data y renderItem',
    fuente: 'https://reactnative.dev/docs/using-a-listview',
  },
  {
    id: 'p08',
    enunciado: '¿Qué framework recomienda la documentación oficial para crear apps nuevas?',
    opciones: ['Ionic', 'Expo', 'Cordova', 'Flutter'],
    correcta: 'Expo',
    fuente: 'https://reactnative.dev/docs/environment-setup',
  },
  {
    id: 'p09',
    enunciado: '¿Qué Hook guarda datos que cambian con el tiempo?',
    opciones: ['useEffect', 'useState', 'useRef', 'useMemo'],
    correcta: 'useState',
    fuente: 'https://reactnative.dev/docs/intro-react',
  },
  {
    id: 'p10',
    enunciado: '¿Qué prop de TextInput se llama cada vez que cambia el texto?',
    opciones: ['onPress', 'onChangeText', 'onSubmitEditing', 'onLayout'],
    correcta: 'onChangeText',
    fuente: 'https://reactnative.dev/docs/handling-text-input',
  },
];
