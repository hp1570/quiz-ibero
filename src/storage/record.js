// Récord guardado de forma cifrada (checkpoint 6).
// expo-secure-store usa el almacenamiento seguro de cada plataforma:
// Keychain en iOS y Keystore en Android. Viene incluido en Expo Go.

import * as SecureStore from 'expo-secure-store';

// Las claves solo admiten letras, números, ".", "-" y "_".
const CLAVE = 'quizibero.record';

export async function leerRecord() {
  try {
    const texto = await SecureStore.getItemAsync(CLAVE);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

export async function guardarRecord(puntaje) {
  const record = { puntaje, fecha: new Date().toISOString() };
  await SecureStore.setItemAsync(CLAVE, JSON.stringify(record));
  return record;
}
