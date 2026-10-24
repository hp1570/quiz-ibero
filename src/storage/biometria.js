// Demostración de biometría (solo la presentan Hernán y Sebas, no es parte de la práctica guiada).
// expo-local-authentication viene incluido en Expo Go.
// Face ID NO funciona en Expo Go en iOS, por eso la app solo lo usa en Android.

import * as LocalAuthentication from 'expo-local-authentication';

// true si el teléfono tiene lector biométrico y hay al menos una huella o rostro registrado.
export async function biometriaDisponible() {
  try {
    const [tieneHardware, tieneRegistro] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);
    return tieneHardware && tieneRegistro;
  } catch {
    return false;
  }
}

export async function autenticar() {
  const resultado = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Confirma tu identidad para ver el récord',
  });
  return resultado.success;
}
