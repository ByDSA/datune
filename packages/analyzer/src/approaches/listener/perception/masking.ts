/* eslint-disable max-len */
import { Amplitude, DiscreteFrequencySpectrum, Frequency } from "./perception2";

function applyMaskingToDiscreteSpectrum(spectrum: DiscreteFrequencySpectrum): DiscreteFrequencySpectrum {
  // Parámetros configurables:
  const FREQUENCY_TOLERANCE = 3; // tolerancia en Hz para considerar frecuencias cercanas
  const AMPLITUDE_RATIO_THRESHOLD = 0.5; // si la amplitud de la frecuencia débil es inferior al 50% de la fuerte, se enmascara
  // Convertimos el espectro a un array de [frecuencia, amplitud]
  const spectrumEntries = Object.entries(spectrum)
    .map(([freqStr, amplitude]) => [parseFloat(freqStr), amplitude] as [Frequency, Amplitude]);

  // Ordenamos descendientemente según la amplitud
  spectrumEntries.sort((a, b) => b[1] - a[1]);

  // Mantenemos un set de frecuencias enmascaradas (se identificarán por su valor)
  const masked = new Set<Frequency>();
  // Almacenamos el resultado
  const maskedSpectrum: DiscreteFrequencySpectrum = {};

  // Para cada pico, si no está enmascarado, se considera "fuerte" y se utiliza para enmascarar a los vecinos
  for (const [freqStrong, amplitudeStrong] of spectrumEntries) {
    if (masked.has(freqStrong))
      continue;

    // Conservamos el pico fuerte
    maskedSpectrum[freqStrong] = amplitudeStrong;

    // Recorremos el resto del espectro para ver si alguna frecuencia cercana se enmascara
    for (const [freqWeak, amplitudeWeak] of spectrumEntries) {
      if (freqWeak === freqStrong)
        continue;

      // Si ya se enmascaró, continuamos
      if (masked.has(freqWeak))
        continue;

      // Si la diferencia es menor o igual que la tolerancia y la amplitud es menor al umbral,
      // enmascaramos la frecuencia débil.
      if (Math.abs(freqStrong - freqWeak) <= FREQUENCY_TOLERANCE
          && amplitudeWeak < AMPLITUDE_RATIO_THRESHOLD * amplitudeStrong)
        masked.add(freqWeak);
    }
  }

  return maskedSpectrum;
}

// Ejemplo de uso:
const inputSpectrum: DiscreteFrequencySpectrum = {
  130.81: 50,
  132.00: 10,
  196.00: 50,
  261.63: 40,
  329.63: 40,
};

console.log(applyMaskingToDiscreteSpectrum(inputSpectrum));
