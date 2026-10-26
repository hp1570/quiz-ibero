# QuizIbero

Trivia en React Native con tiempo por pregunta, puntos por rapidez y rachas. Es la mini práctica de la exposición de React Native en **Aplicaciones Móviles y Laboratorio** (Ibero, otoño 2026), de Hernán Nuño y Sebas.

Las preguntas salen de la teoría y del manual de la exposición, así que la app refuerza lo que se explica mientras enseña a programar.

## Qué demuestra de React Native

| En la app | Concepto de React | Por qué importa en React Native |
| --- | --- | --- |
| Pantalla de inicio, tarjetas y botones | Componentes y JSX | Cada `<View>` o `<Text>` se convierte en una vista **nativa** real (`ViewGroup`/`TextView` en Android, `UIView`/`UITextView` en iOS), no en HTML |
| Pregunta con 4 respuestas | Props y composición | Un componente se escribe una vez y se reutiliza con datos distintos |
| Puntaje, pregunta actual, racha | Estado (`useState`) | La interfaz se redibuja sola cuando cambia el estado |
| Temporizador | Efectos (`useEffect`) y limpieza | Manejo correcto de recursos que viven fuera del render |
| Aviso animado de acierto/error | `Animated` con `useNativeDriver` | La animación corre en el hilo nativo, no en JavaScript |
| Sombra de la tarjeta | `Platform.select` | Un solo código con detalles distintos por plataforma |
| Récord guardado | `expo-secure-store` | Usa el almacenamiento cifrado de cada sistema (Keychain en iOS, Keystore en Android) |
| "Corriendo en Android/iOS" | `Platform.OS` | **El mismo código** corre en los dos sistemas |
| Récord protegido con huella (solo demo) | `expo-local-authentication` | Acceso a hardware nativo desde JavaScript |

## Versiones

| Paquete | Versión |
| --- | --- |
| Expo SDK | 58 (`expo ~58.0.19`) |
| React Native | 0.88.0 |
| React | 19.3.0 |
| expo-secure-store | ~58.0.2 |
| expo-local-authentication | ~58.0.2 |
| Node.js | LTS 24 (en las Mac del laboratorio: 24.21.0 con nvm 0.40.8) |

## Estructura

```
App.js                          Decide qué pantalla se ve: inicio, juego o final
index.js                        Registra App (lo genera Expo, no se toca)
app.json                        Nombre de la app e íconos
src/theme.js                    Colores y segundos por pregunta
src/data/preguntas.js           Banco de preguntas, cada una con su fuente oficial
src/components/
  PantallaInicio.js             Título, récord, botón Jugar, plataforma
  BotonRespuesta.js             Un botón de respuesta y sus estados visuales
  Pregunta.js                   Enunciado + 4 BotonRespuesta
  PantallaJuego.js              Lógica del juego: tiempo, puntos, rachas, animación
  PantallaFinal.js              Puntaje, récord y resumen con FlatList
src/storage/
  record.js                     Leer y guardar el récord con SecureStore
  biometria.js                  Demo de huella (solo Android)
```

## Ramas: un checkpoint por rama

Cada rama es el estado exacto de la app al terminar un checkpoint de la práctica. Si un compañero se atrasa, cambia a la rama del checkpoint y sigue con el grupo.

| Rama | Qué agrega | Archivos que cambian |
| --- | --- | --- |
| `cp0-base` | Pantalla de prueba: el entorno funciona | `App.js`, `src/theme.js`, `src/data/preguntas.js` |
| `cp1-inicio` | Pantalla de inicio | `PantallaInicio.js`, `App.js` |
| `cp2-pregunta` | Una pregunta con 4 respuestas; "Jugar" cambia de pantalla | `BotonRespuesta.js`, `Pregunta.js`, `PantallaJuego.js`, `App.js` |
| `cp3-flujo` | Todas las preguntas, puntaje y pantalla final. **Cada compañero agrega una pregunta** | `PantallaJuego.js`, `PantallaFinal.js`, `App.js`, `preguntas.js` |
| `cp4-tiempo` | 15 s por pregunta, puntos por rapidez y rachas | `PantallaJuego.js` |
| `cp5-animacion` | Aviso animado y sombra distinta por plataforma | `PantallaJuego.js`, `Pregunta.js` |
| `cp6-record` | Récord cifrado y resumen con FlatList | `record.js`, `PantallaFinal.js`, `PantallaInicio.js`, `package.json` |
| `cp7-ios` | Indica la plataforma; se prueba en iOS | `PantallaInicio.js` |
| `demo-biometria` = `main` | Récord protegido con huella en Android (lo presentan ustedes) | `biometria.js`, `PantallaInicio.js`, `package.json` |

Para ver un checkpoint:

```bash
git checkout cp3-flujo
npm install          # solo si cambió package.json (a partir de cp6)
npx expo start
git checkout main    # para regresar
```

## Primera vez en tu computadora

1. Abre una terminal en esta carpeta. En VS Code: Terminal → New Terminal.
2. Instala las dependencias:

```bash
npm install
```

**Ojo con OneDrive:** esta carpeta está dentro de OneDrive. `npm install` crea `node_modules` con miles de archivos y OneDrive intentará sincronizarlos todos. Pausa la sincronización mientras trabajas o mueve el proyecto a una carpeta fuera de OneDrive, por ejemplo `C:\dev\quiz-ibero`. `node_modules` nunca se sube a GitHub; ya está en `.gitignore`.

## Clonar el proyecto

```bash
git clone https://github.com/hp1570/quiz-ibero.git
cd quiz-ibero
npm install
```

## Correr la app

Todo empieza con el servidor de desarrollo, que se queda abierto en la terminal:

```bash
npx expo start
```

La terminal muestra un código QR y un menú de teclas: `a` abre en Android, `r` recarga la app, `j` abre el depurador.

### Opción 1. Emulador de Android (laptop o Mac del laboratorio)

1. En Android Studio, abre Device Manager y arranca el dispositivo virtual.
2. Con `npx expo start` corriendo, presiona `a`. Expo instala Expo Go en el emulador y abre la app.

### Opción 2. Android físico por Wi-Fi

1. Instala **Expo Go** desde la Play Store.
2. Conecta la laptop y el celular a **la misma red Wi-Fi**.
3. Corre `npx expo start` y escanea el QR desde Expo Go ("Scan QR code").
4. Si Windows pregunta si permites que Node.js use la red, acepta para redes privadas.

### Opción 3. Android físico por USB (sin depender del Wi-Fi)

1. En el celular, activa las opciones de desarrollador: Ajustes → Acerca del teléfono → toca 7 veces "Número de compilación".
2. En Ajustes → Opciones de desarrollador, activa **Depuración por USB**.
3. Conecta el cable y acepta en el celular el aviso "¿Permitir depuración USB?".
4. Comprueba la conexión. `adb` viene con Android Studio; si la terminal no lo reconoce, usa la ruta completa:

```bash
adb devices
# o, si no se reconoce:
%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe devices
```

   Debe aparecer tu celular con la palabra `device`. Si dice `unauthorized`, revisa el aviso en el celular.
5. Redirige el puerto del servidor por el cable y arranca:

```bash
adb reverse tcp:8081 tcp:8081
npx expo start
```

6. Presiona `a`. La app se abre en el celular conectado; debe tener Expo Go instalado.

### Opción 4. iPhone (desde Windows o Mac, sin Xcode)

Con Expo Go se puede correr la app en un iPhone real, incluso desde Windows. En iOS, Expo Go **exige iniciar sesión con la misma cuenta de Expo** en el iPhone y en la terminal.

1. En el iPhone, instala **Expo Go** desde la App Store. Debe ser la versión 58 o una que soporte el SDK 58.
2. Crea una cuenta gratuita en [expo.dev](https://expo.dev/signup). Anota tu **usuario y contraseña**. Si la creaste con Google, GitHub o Apple, no tiene contraseña: ponle una con "Forgot password" en expo.dev.
3. En Expo Go, toca el ícono de cuenta (arriba a la derecha) e inicia sesión.
4. En la terminal, con el servidor detenido (**Ctrl + C**), inicia sesión **sin navegador**:

```bash
npx expo login --no-browser
```

   Escribe tu usuario y tu contraseña. Si tienes verificación en dos pasos, también te pide el código.

5. Comprueba que la terminal y Expo Go usan la misma cuenta:

```bash
npx expo whoami
```

6. Arranca el servidor **de nuevo** (Expo lee la cuenta solo al iniciar), con la laptop y el iPhone en la misma red:

```bash
npx expo start
```

7. Escanea el QR con la **cámara** del iPhone, o abre el proyecto desde la lista de Expo Go.

**Por qué `--no-browser`:** `npx expo login` intenta abrir el navegador. En Windows ese paso puede fallar con `Error: C:\Windows\System32\cmd.exe /c start "" https://expo.dev/login?... exited with non-zero code: 1`, y el login se cancela. Con `--no-browser` el login se hace en la misma terminal y funciona igual en Windows y en Mac.

#### Problemas frecuentes en iPhone

| Síntoma | Causa | Solución |
| --- | --- | --- |
| `Error: ...cmd.exe /c start ... exited with non-zero code: 1` al ejecutar `npx expo login` | Windows no pudo abrir el navegador | `npx expo login --no-browser` |
| `You're signed in to Expo Go as "X", but not signed in to Expo CLI` | Falta iniciar sesión en la terminal | `npx expo login --no-browser` con la cuenta "X" y volver a correr `npx expo start` |
| "You need to be signed in to Expo Go and Expo CLI to open your project" | Falta sesión en uno de los dos, o son cuentas distintas | Revisa con `npx expo whoami`; si no coincide, `npx expo logout` y vuelve a iniciar sesión con la cuenta de Expo Go |
| Iniciaste sesión pero el error sigue | El servidor arrancó antes del login | **Ctrl + C** y `npx expo start` otra vez; en el iPhone, **Try Again** |
| El login dice que la contraseña es incorrecta y nunca pusiste una | La cuenta se creó con Google, GitHub o Apple | Ponle contraseña con "Forgot password" en expo.dev |
| Te pide un código | Tienes verificación en dos pasos | Escribe el código de tu app de autenticación (o usa `--otp <código>`) |
| "Project is incompatible with this version of Expo Go" | Expo Go y el proyecto tienen SDK distinto | Actualiza Expo Go desde la App Store; en iPhone no se pueden instalar versiones anteriores |
| El QR abre Expo Go pero se queda cargando o "Could not connect to development server" | La red bloquea la conexión entre laptop e iPhone | `npx expo start --tunnel` o el hotspot del iPhone |
| La cámara no reconoce el QR | El QR es muy pequeño o la cámara no detecta enlaces `exp://` | Abre el proyecto desde la lista de Expo Go (aparece al tener sesión) |
| Windows pregunta si Node.js puede usar la red | Firewall de Windows | Permite el acceso en redes privadas |
| El botón "Ver récord con huella" no aparece | Face ID no funciona en Expo Go | Es esperado; la demo de biometría es solo en Android |

### Opción 5. Cuando la red de la universidad no deja conectar

Las redes públicas suelen bloquear la conexión directa entre la laptop y el celular. Hay dos salidas:

- **Modo túnel**, que sirve para Android y iPhone: corre `npx expo start --tunnel`. Si pide instalar `@expo/ngrok`, acepta. Las recargas son más lentas.
- **Hotspot del celular:** activa el punto de acceso en el celular y conecta la laptop a esa red. Así quedan en la misma red.

Para iPhone no hay opción por cable desde Windows con Expo Go: usa Wi-Fi, túnel o hotspot.

## Demo de huella (solo Android)

- En un Android con huella registrada, la pantalla de inicio muestra "Ver récord con huella" en lugar del récord.
- En iPhone no aparece: Face ID no funciona en Expo Go, según la documentación de Expo.
- Para probarlo en el emulador, primero configura un bloqueo de pantalla y registra una huella simulada desde los controles extendidos del emulador. Esto no se ha probado todavía; verifíquenlo antes de mostrarlo.

## Problemas comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Expo Go dice que el proyecto es incompatible con su versión | La versión de Expo Go no coincide con el SDK 58 | Actualiza Expo Go desde la tienda |
| El QR abre pero se queda cargando o "Could not connect" | Laptop y celular en redes distintas, o firewall | `npx expo start --tunnel` o el hotspot del celular |
| En iPhone no abre el proyecto | Falta sesión o son cuentas distintas | Ver "Problemas frecuentes en iPhone" (Opción 4) |
| `adb` no se reconoce | No está en el PATH | Usa la ruta completa de `platform-tools\adb.exe` |
| `adb devices` muestra `unauthorized` | No se aceptó el aviso en el celular | Desconecta, vuelve a conectar y acepta |
| Un cambio no aparece en la app | Fast Refresh no alcanzó a recargar | Presiona `r` en la terminal |
| El temporizador va cada vez más rápido | Falta la limpieza del efecto | Revisa el `return () => clearInterval(id)` |
| "Text strings must be rendered within a <Text> component" | Texto suelto dentro de un `View` | Mételo en un `<Text>` |
| Después de cambiar de rama, falta un módulo | Esa rama usa otras dependencias | `npm install` |

## Agregar una pregunta

En `src/data/preguntas.js`, agrega un objeto con `id` único, `enunciado`, 4 `opciones`, la `correcta` escrita exactamente igual que una de las opciones, y la `fuente` de reactnative.dev de donde sale la respuesta.

## Fuentes

- [React Native: Core Components and Native Components](https://reactnative.dev/docs/intro-react-native-components)
- [React Native: React Fundamentals](https://reactnative.dev/docs/intro-react)
- [React Native: Get Started](https://reactnative.dev/docs/environment-setup)
- [Expo: Start developing](https://docs.expo.dev/get-started/start-developing/)
- [Expo CLI (túnel y tecla `a`)](https://docs.expo.dev/more/expo-cli/)
- [Expo SecureStore (SDK 58)](https://docs.expo.dev/versions/v58.0.0/sdk/securestore/)
- [Expo LocalAuthentication (SDK 58)](https://docs.expo.dev/versions/v58.0.0/sdk/local-authentication/)
