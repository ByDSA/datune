/* eslint-disable padding-line-between-statements */
import { ratioToCents } from "./analysis";
import { Overtone, getShiftedOvertones } from "./utils/overtones";
import { DissonanceResult } from "./utils/utils";

// Parámetros del modelo oficial de Sethares (Ecuaciones E.1, E.3)
const X_STAR = 0.24; // Punto de máxima disonancia (x*)
const S1 = 0.021; // Parámetro s1 para el factor de escala
const S2 = 19; // Parámetro s2 para el factor de escala
const B1 = 3.5; // Exponente b1 de la curva de Plomp-Levelt
const B2 = 5.75; // Exponente b2 de la curva de Plomp-Levelt

/**
 * Convierte amplitud a loudness usando la ecuación (E.5) de Sethares
 * Esto es una aproximación simplificada
 */
const amplitudeToLoudness = (amplitude: number): number => {
  // Para simplificar, asumimos que la amplitud ya está en una escala apropiada
  // En una implementación completa, se calcularía SPL y luego loudness
  return amplitude;
};

/**
 * Calcula la disonancia entre dos sinusoides usando el modelo de Sethares
 * Implementa las ecuaciones E.1, E.2, E.3, E.4
 */
const calculatePairDissonance = (
  f1: number,
  f2: number,
  loudness1: number,
  loudness2: number,
): number => {
  // Asegurar que f1 <= f2
  if (f1 > f2) {
    [f1, f2] = [f2, f1];
    [loudness1, loudness2] = [loudness2, loudness1];
  }

  // Calcular el factor de escala s (Ecuación E.3)
  const s = X_STAR / ((S1 * f1) + S2);
  // Diferencia de frecuencias escalada
  const scaledFreqDiff = s * (f2 - f1);
  // Curva de disonancia de Plomp-Levelt (Ecuación E.1)
  const plompLeventCurve = Math.exp(-B1 * scaledFreqDiff) - Math.exp(-B2 * scaledFreqDiff);
  // Factor de amplitud mínima (Ecuación E.4)
  const minLoudness = Math.min(loudness1, loudness2);

  // Disonancia final (Ecuación E.2)
  return minLoudness * plompLeventCurve;
};

/**
 * Calcula la disonancia total usando el modelo oficial de Sethares
 * Implementa la ecuación (E.6)
 */
export const calcSetharesRoughness = (overtones: Overtone[]): number => {
  if (overtones.length < 2)
    return 0;

  const simpleOvertones = overtones;// simplifyOvertones(overtones);

  let totalDissonance = 0;

  // Calcular disonancia para todos los pares únicos de parciales/overtones (Ecuación E.6)
  for (let i = 0; i < simpleOvertones.length; i++) {
    for (let j = i + 1; j < simpleOvertones.length; j++) {
      const f1 = simpleOvertones[i].frequency;
      const f2 = simpleOvertones[j].frequency;
      const loudness1 = amplitudeToLoudness(simpleOvertones[i].amplitude);
      const loudness2 = amplitudeToLoudness(simpleOvertones[j].amplitude);
      const pairDissonance = calculatePairDissonance(f1, f2, loudness1, loudness2);

      totalDissonance += pairDissonance;
    }
  }

  // El factor 1/2 de la ecuación E.6 ya está implícito en el bucle
  // (solo calculamos cada par una vez)
  return totalDissonance;
};

export const analyzeInterval = (
  fundamentalFreq: number,
  frequencyRatio: number,
  basePartials: Overtone[],
): Omit<DissonanceResult, "frequencyRatio"> => {
  const secondFreq = fundamentalFreq * frequencyRatio;
  // Generar espectro combinado según la ecuación (E.7)
  const overtones1: Overtone[] = basePartials;
  const overtones2 = getShiftedOvertones(secondFreq, overtones1);
  const combinedOvertones = [...overtones1, ...overtones2];
  // Calcular disonancia usando el modelo de Sethares
  const dissonance = calcSetharesRoughness(combinedOvertones);

  return {
    dissonance,
  };
};

export const analyzeRange = (
  fundamentalFreq: number,
  maxRatio: number,
  centsResolution: number,
  basePartials: Overtone[],
): DissonanceResult[] => {
  const results: DissonanceResult[] = [];
  const numPoints = Math.floor(ratioToCents(maxRatio) / centsResolution);

  for (let i = 0; i <= numPoints; i++) {
    const semitones = i * centsResolution / 100;
    const ratio = 2 ** (semitones / 12);
    const result: DissonanceResult = {
      ...analyzeInterval(fundamentalFreq, ratio, basePartials),
      frequencyRatio: ratio,
    };

    results.push(result);
  }

  return results;
};
