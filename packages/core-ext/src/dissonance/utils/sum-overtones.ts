import { Overtone } from "./overtones";

/**
 * Simplifica un array de overtones combinando aquellos con frecuencias idénticas
 * Las amplitudes se suman para frecuencias que coinciden exactamente
 */
export const simplifyOvertones = (
  overtones: Overtone[],
  frequencyTolerance: number = 0.001, // Tolerancia en Hz para considerar frecuencias "idénticas"
): Overtone[] => {
  if (overtones.length === 0)
    return [];

  // Crear un mapa para agrupar por frecuencia
  const frequencyGroups = new Map<number, number>(); // frequency -> total amplitude

  for (const overtone of overtones) {
    const freq = overtone.frequency;
    let foundKey: number | null = null;

    // Buscar si ya existe una frecuencia dentro de la tolerancia
    for (const existingFreq of frequencyGroups.keys()) {
      if (Math.abs(freq - existingFreq) <= frequencyTolerance) {
        foundKey = existingFreq;
        break;
      }
    }

    if (foundKey !== null) {
      // Sumar amplitud a la frecuencia existente
      frequencyGroups.set(foundKey, frequencyGroups.get(foundKey)! + overtone.amplitude);
    } else {
      // Nueva frecuencia
      frequencyGroups.set(freq, overtone.amplitude);
    }
  }

  // Convertir de vuelta a array de Overtone y ordenar por frecuencia
  return Array.from(frequencyGroups.entries())
    .map(([frequency, amplitude]) => ( {
      frequency,
      amplitude,
    } ))
    .sort((a, b) => a.frequency - b.frequency);
};
