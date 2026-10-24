// Banco de preguntas de QuizIbero.
// Las respuestas salen de la teoría de la exposición, del manual de instalación
// y del propio código de la app. La URL de `fuente` indica dónde se verifica.
//
// Formato:
//   id:        identificador único (se usa como `key`)
//   enunciado: texto de la pregunta
//   opciones:  exactamente 4 respuestas
//   correcta:  el texto EXACTO de la opción correcta
//
// Checkpoint 3: cada compañero agrega aquí una pregunta propia.

export const PREGUNTAS = [
  // ---------- Teoría ----------
  {
    id: 'p01',
    enunciado: '¿Qué lema resume la filosofía de React Native?',
    opciones: [
      'Write once, run anywhere',
      'Learn once, write anywhere',
      'Code once, deploy everywhere',
      'Build once, ship twice',
    ],
    correcta: 'Learn once, write anywhere',
    fuente: 'https://reactnative.dev/',
  },
  {
    id: 'p02',
    enunciado: '¿Qué le faltaba a una app web en WebView, según Facebook en 2015?',
    opciones: [
      'Poder usar JavaScript',
      'Una experiencia realmente nativa',
      'Publicarse en las tiendas',
      'Funcionar en Android',
    ],
    correcta: 'Una experiencia realmente nativa',
    fuente: 'https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/',
  },
  {
    id: 'p03',
    enunciado: '¿Por qué una app con Hermes arranca más rápido?',
    opciones: [
      'Ejecuta JavaScript en la GPU',
      'Llega al teléfono ya compilada a bytecode',
      'Descarga el JS al abrirse',
      'Convierte el JS a Kotlin',
    ],
    correcta: 'Llega al teléfono ya compilada a bytecode',
    fuente: 'https://reactnative.dev/docs/hermes',
  },
  {
    id: 'p04',
    enunciado: '¿Cuál era el cuello de botella del antiguo Bridge?',
    opciones: [
      'Hermes era lento',
      'Serializar cada mensaje a JSON en una cola asíncrona',
      'No soportaba iOS',
      'Dibujaba en una WebView',
    ],
    correcta: 'Serializar cada mensaje a JSON en una cola asíncrona',
    fuente: 'https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here',
  },
  {
    id: 'p05',
    enunciado: 'En iOS, un <Text> de React Native se dibuja como…',
    opciones: [
      'Un <p> de HTML en una WebView',
      'Una vista nativa UITextView',
      'Una imagen generada por el motor',
      'Un Text de SwiftUI',
    ],
    correcta: 'Una vista nativa UITextView',
    fuente: 'https://reactnative.dev/docs/intro-react-native-components',
  },
  {
    id: 'p06',
    enunciado: 'Si el hilo de JavaScript se satura, ¿qué sigue fluido?',
    opciones: [
      'Un setInterval',
      'Una animación sin native driver',
      'Una animación con useNativeDriver',
      'Un cambio de useState',
    ],
    correcta: 'Una animación con useNativeDriver',
    fuente: 'https://reactnative.dev/docs/performance',
  },
  {
    id: 'p07',
    enunciado: '¿Qué demostró Ads Manager en 2015?',
    opciones: [
      'Que solo servía para iOS',
      'Que se podía compartir cerca del 85% del código',
      'Que JS era más rápido que Java',
      'Que ya no hacía falta probar en Android',
    ],
    correcta: 'Que se podía compartir cerca del 85% del código',
    fuente: 'https://engineering.fb.com/2015/09/14/developer-tools/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/',
  },
  {
    id: 'p08',
    enunciado: '¿Por qué usar npx expo install en vez de npm install?',
    opciones: [
      'npm no funciona en Mac',
      'Elige la versión compatible con el SDK',
      'Instala el paquete en el teléfono',
      'Compila el código nativo',
    ],
    correcta: 'Elige la versión compatible con el SDK',
    fuente: 'https://docs.expo.dev/more/expo-cli/',
  },
  {
    id: 'p09',
    enunciado: 'Guardas un cambio en PantallaJuego.js a media partida. Con Fast Refresh…',
    opciones: [
      'La app vuelve al inicio',
      'Ves el cambio y conservas el puntaje',
      'Hay que recompilar',
      'El cambio solo aparece en Android',
    ],
    correcta: 'Ves el cambio y conservas el puntaje',
    fuente: 'https://reactnative.dev/docs/fast-refresh',
  },
  // ---------- Expo Go ----------
  {
    id: 'p10',
    enunciado: 'En clase nadie compila en Android Studio. ¿Qué lo permite?',
    opciones: [
      'Metro convierte el JS en un APK',
      'Expo Go ya trae el código nativo y solo carga tu JS',
      'El emulador interpreta JSX',
      'Xcode compila en segundo plano',
    ],
    correcta: 'Expo Go ya trae el código nativo y solo carga tu JS',
    fuente: 'https://docs.expo.dev/develop/development-builds/expo-go-to-dev-build/',
  },
  {
    id: 'p11',
    enunciado: 'Tu proyecto es SDK 57 y tu Expo Go es la 58. ¿Qué pasa?',
    opciones: [
      'Abre sin problema',
      'Expo Go dice que el proyecto es incompatible',
      'El proyecto se actualiza solo',
      'Solo funciona en Android',
    ],
    correcta: 'Expo Go dice que el proyecto es incompatible',
    fuente: 'https://expo.dev/changelog/sdk-58',
  },
  {
    id: 'p12',
    enunciado: 'Necesitas una librería nativa que no viene en Expo Go. ¿Qué usas?',
    opciones: [
      'Reinstalar Expo Go',
      'Un development build',
      'El modo túnel',
      'Iniciar sesión en Expo',
    ],
    correcta: 'Un development build',
    fuente: 'https://docs.expo.dev/develop/development-builds/expo-go-to-dev-build/',
  },
  // ---------- Código de QuizIbero ----------
  {
    id: 'p13',
    enunciado: 'Si quitas return () => clearInterval(id), ¿qué pasa?',
    opciones: [
      'El tiempo se queda en 15',
      'El reloj corre cada vez más rápido',
      'La app no compila',
      'Nada, es opcional',
    ],
    correcta: 'El reloj corre cada vez más rápido',
    fuente: 'https://react.dev/reference/react/useEffect',
  },
  {
    id: 'p14',
    enunciado: '¿Por qué respondida no se guarda con useState?',
    opciones: [
      'useState no acepta booleanos',
      'Se calcula a partir de seleccion en cada render',
      'Así se guarda cifrada',
      'Es una prop de App',
    ],
    correcta: 'Se calcula a partir de seleccion en cada render',
    fuente: 'https://react.dev/learn/choosing-the-state-structure',
  },
  {
    id: 'p15',
    enunciado: '¿Por qué la tarjeta usa Platform.select para su sombra?',
    opciones: [
      'Para que la app pese menos',
      'iOS usa shadow* y Android usa elevation',
      'Android no tiene sombras',
      'Para el tema oscuro',
    ],
    correcta: 'iOS usa shadow* y Android usa elevation',
    fuente: 'https://reactnative.dev/docs/platform-specific-code',
  },
  {
    id: 'p16',
    enunciado: '¿Por qué el récord sigue ahí después de cerrar Expo Go?',
    opciones: [
      'Se guarda en el estado de App',
      'SecureStore lo guarda cifrado en el dispositivo',
      'Se sube a la nube de Expo',
      'Fast Refresh lo recuerda',
    ],
    correcta: 'SecureStore lo guarda cifrado en el dispositivo',
    fuente: 'https://docs.expo.dev/versions/latest/sdk/securestore/',
  },
];
