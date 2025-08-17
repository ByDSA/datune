import { ratioToCents } from "./analysis";
import { type DissonanceResult } from "./utils/utils";

/**
 * Entropía Armónica según Paul Erlich (influenciado por Ernst Terhardt)
 *
 * Basado en la incertidumbre perceptual en la interpretación de intervalos
 * como proporciones de números enteros, usando series de Farey y mediantes.
 */
export class HarmonicEntropyModel {
  private static readonly DEFAULT_N = 25; // Límite de Farey (complejidad máxima)

  private static readonly DEFAULT_S = 0.02; // Ancho de banda crítica (σ)

  private static readonly MIN_RATIO = 1.0; // Ratio mínimo

  private static readonly MAX_RATIO = 2.0; // Ratio máximo (1 octava)

  static calculateHarmonicEntropy(
    frequencyRatio: number,
    n: number = this.DEFAULT_N,
    s: number = this.DEFAULT_S,
  ): number {
    // Normalizar ratio al rango [1, 2)
    const normalizedRatio = this.normalizeRatio(frequencyRatio);
    // Generar series de Farey y calcular probabilidades
    const fareyData = this.generateFareyData(n);
    const probabilities = this.calculateProbabilities(normalizedRatio, fareyData, s);

    // Calcular entropía de Shannon
    return this.calculateShannonEntropy(probabilities);
  }

  private static normalizeRatio(ratio: number): number {
    if (ratio <= 0)
      return 1.0;

    // Reducir a la octava base
    while (ratio >= 2.0)
      ratio /= 2.0;

    while (ratio < 1.0)
      ratio *= 2.0;

    return ratio;
  }

  private static generateFareyData(n: number): Array<{
    numerator: number;
    denominator: number;
    ratio: number;
    slice: number;
  }> {
    const fractions: Array<{ numerator: number;
denominator: number;
ratio: number; }> = [];

    for (let q = 1; q <= n; q++) {
      for (let p = q; p <= 2 * q; p++) {
        if (this.gcd(p, q) === 1) {
          fractions.push( {
            numerator: p,
            denominator: q,
            ratio: p / q,
          } );
        }
      }
    }

    fractions.sort((a, b) => a.ratio - b.ratio);

    return fractions.map((frac, i) => {
      const prevRatio = i > 0
        ? this.calculateMediant(fractions[i - 1], frac)
        : this.MIN_RATIO;
      const nextRatio = i < fractions.length - 1
        ? this.calculateMediant(frac, fractions[i + 1])
        : this.MAX_RATIO;

      return {
        ...frac,
        slice: nextRatio - prevRatio,
      };
    } );
  }

  private static calculateMediant(
    frac1: { numerator: number;
denominator: number;
ratio: number; },
    frac2: { numerator: number;
denominator: number;
ratio: number; },
  ): number {
    return (frac1.numerator + frac2.numerator) / (frac1.denominator + frac2.denominator);
  }

  private static gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;

      b = a % b;
      a = temp;
    }

    return a;
  }

  private static calculateProbabilities(
    targetRatio: number,
    fareyData: Array<{ numerator: number;
denominator: number;
ratio: number;
slice: number; }>,
    sigma: number,
  ): number[] {
    const probabilities = fareyData.map(data => {
      const distance = Math.abs(targetRatio - data.ratio);
      const gaussianProb = Math.exp(-(distance * distance) / (2 * sigma * sigma));

      return gaussianProb * data.slice;
    } );
    const totalProb = probabilities.reduce((sum, p) => sum + p, 0);

    return totalProb > 0 ? probabilities.map(p => p / totalProb) : probabilities;
  }

  private static calculateShannonEntropy(probabilities: number[]): number {
    let entropy = 0;

    for (const p of probabilities) {
      if (p > 0)
        entropy -= p * Math.log2(p);
    }

    return entropy;
  }

  static analyzeInterval(
    frequencyRatio: number,
  ): DissonanceResult {
    const harmonicEntropy = this.calculateHarmonicEntropy(frequencyRatio);
    // Normalizar entropía armónica (máximo teórico ≈ 4-5 bits)
    const normalizedHarmonicEntropy = Math.min(harmonicEntropy / 5.0, 1.0);

    return {
      frequencyRatio,
      dissonance: normalizedHarmonicEntropy,
    };
  }

  static analyzeRange(
    maxRatio: number,
    centsResolution: number,
  ): DissonanceResult[] {
    const results: DissonanceResult[] = [];
    const numPoints = Math.floor(ratioToCents(maxRatio) / centsResolution);

    for (let i = 0; i <= numPoints; i++) {
      const semitones = i * centsResolution / 100;
      const ratio = 2 ** (semitones / 12);

      results.push(this.analyzeInterval(ratio));
    }

    return results;
  }
}
