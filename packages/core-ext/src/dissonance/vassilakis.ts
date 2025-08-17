/* eslint-disable @stylistic/lines-around-comment */
import { Overtone } from "./utils/overtones";
import { DissonanceResult } from "./utils/utils";

// Clase para el modelo de Roughness de Vassilakis (2001, 2005)
export class VassilakisRoughnessModel {
  /**
   * Modelo de Vassilakis basado en "Perceptual and Physical Properties of Amplitude Fluctuation"
   * Correlación r = 0.98 con percepciones humanas
   *
   * Fórmula: R = X^0.1 * 0.5 * Y^3.11 * Z
   * donde:
   * X = Amin * Amax (producto de amplitudes)
   * Y = 2*Amin / (Amin + Amax) (grado de fluctuación de amplitud)
   * Z = e^(-B1*s*(fmax-fmin)) - e^(-B2*s*(fmax-fmin))
   * s = 0.24 / (S1*fmin + S2) (factor de escala crítico)
   */

  private static readonly B1 = 3.5; // Coeficiente exponencial 1

  private static readonly B2 = 5.75; // Coeficiente exponencial 2

  private static readonly S1 = 0.0207; // Parámetro de escala 1

  private static readonly S2 = 18.96; // Parámetro de escala 2

  static calculateRoughness(overtones: Overtone[]): number {
    if (overtones.length < 2)
      return 0;

    const sortedPartials = [...overtones].sort((a, b) => a.frequency - b.frequency);
    let totalRoughness = 0;

    // Calcular rugosidad para todos los pares de parciales
    for (let i = 0; i < sortedPartials.length - 1; i++) {
      for (let j = i + 1; j < sortedPartials.length; j++) {
        totalRoughness += this.calculatePairRoughness(
          sortedPartials[i].frequency,
          sortedPartials[j].frequency,
          sortedPartials[i].amplitude,
          sortedPartials[j].amplitude,
        );
      }
    }

    return totalRoughness;
  }

  private static calculatePairRoughness(
    freq1: number,
    freq2: number,
    amp1: number,
    amp2: number,
  ): number {
    const fMin = Math.min(freq1, freq2);
    const fMax = Math.max(freq1, freq2);
    const aMin = Math.min(amp1, amp2);
    const aMax = Math.max(amp1, amp2);
    // X = Producto de amplitudes
    const X = aMin * aMax;
    // Y = Grado de fluctuación de amplitud
    const Y = (2 * aMin) / (aMin + aMax);
    // Factor de escala crítico basado en bandas críticas auditivas
    const s = 0.24 / ((this.S1 * fMin) + this.S2);
    // Z = Función de diferencia de frecuencias ponderada
    const sDiff = s * (fMax - fMin);
    const Z = Math.exp(-this.B1 * sDiff) - Math.exp(-this.B2 * sDiff);
    // Fórmula completa de Vassilakis
    const roughness = (X ** 0.1) * 0.5 * (Y ** 3.11) * Z;

    return Math.max(0, roughness);
  }

  private static getShiftedPartials(newBaseFreq: number, basePartials: Overtone[]): Overtone[] {
    const ratio = newBaseFreq / basePartials[0].frequency;
    const partials2: Overtone[] = basePartials.map(p => ( {
      frequency: p.frequency * ratio,
      amplitude: p.amplitude,
    } ));

    return partials2;
  }

  static analyzeInterval(
    fundamentalFreq: number,
    frequencyRatio: number,
    basePartials: Overtone[],
  ): DissonanceResult {
    const secondFreq = fundamentalFreq * frequencyRatio;
    // Generar espectro combinado
    const partials1: Overtone[] = basePartials;
    const partials2 = this.getShiftedPartials(secondFreq, partials1);
    const combinedPartials = [...partials1, ...partials2];
    const roughness = this.calculateRoughness(combinedPartials);

    return {
      frequencyRatio,
      dissonance: roughness,
    };
  }

  static analyzeRange(
    fundamentalFreq: number,
    cents: number,
    centsResolution: number,
    basePartials: Overtone[],
  ): DissonanceResult[] {
    const results: DissonanceResult[] = [];
    const numPoints = Math.floor(cents / centsResolution);

    for (let i = 0; i <= numPoints; i++) {
      const semitones = i * centsResolution / 100;
      const ratio = 2 ** (semitones / 12);
      const r = this.analyzeInterval(fundamentalFreq, ratio, basePartials);

      results.push(r);
    }

    return results;
  }
}
