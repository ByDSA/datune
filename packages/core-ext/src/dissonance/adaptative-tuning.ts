import { GeneralOptions, OptimizationResult, MomentumOptions, AdamOptions, GradientOptimizer } from "./gradient-optimizers";
import { calcSetharesRoughness } from "./sethares";
import { Overtone } from "./utils/overtones";

export type RelativeOvertone = {
  frequencyRatio: number;
  amplitudeRatio: number;
};

// Configuración de una nota con sus parciales
export interface NoteConfiguration {
  fundamentalFrequency: number;
  overtones: RelativeOvertone[]; // Relativo a la fundamental
  isFixed?: boolean; // Si true, esta nota no se ajustará
}

// Tipos de algoritmos de optimización disponibles
export type OptimizationAlgorithm = "adam" | "momentum";

type Mode = "fast" | "normal" | "slow";
type ModeOpts = {
    convergenceThreshold?: number; // δ en el algoritmo original
    maxIterations?: number;
  };

// Opciones del algoritmo de Adaptive Tuning
export interface AdaptiveTuningOptions {
  mode?: Mode | ModeOpts;

  // Selección del algoritmo de optimización
  optimizationAlgorithm?: OptimizationAlgorithm;

  // Opciones específicas para cada algoritmo
  momentumOptions?: MomentumOptions;
  adamOptions?: AdamOptions;

  // Opciones del optimizador de gradiente
  optimizerOptions?: GeneralOptions;

  reversed?: boolean; // false = minimizar disonancia, true = maximizar disonancia
}

// Resultado del proceso de adaptive tuning
export interface AdaptiveTuningResult {
  originalFrequencies: number[];
  tunedFrequencies: number[];
  originalDissonance: number;
  finalDissonance: number;
  iterations: number;
  converged: boolean;
  dissonanceReduction: number; // Porcentaje de reducción
  intervalRatios?: number[]; // Ratios entre notas consecutivas
  algorithmUsed: OptimizationAlgorithm;
}

// Resultado de benchmark comparativo
export interface BenchmarkResult {
  partials: number;
  chordType: string;
  result: AdaptiveTuningResult;
}

export interface BenchmarkSummary {
  results: BenchmarkResult[];
  summary: {
    partials: number;
    chordType: string;
    bestAlgorithm: OptimizationAlgorithm;
    bestDissonanceReduction: number;
    fastestAlgorithm: OptimizationAlgorithm;
    fastestTime: number;
    convergenceRates: Record<OptimizationAlgorithm, number>;
  }[];
}

export class AdaptiveTuning {
  private options: Pick<AdaptiveTuningOptions, "adamOptions" | "momentumOptions"> &
    Required<Omit<AdaptiveTuningOptions, "adamOptions" | "momentumOptions">>;

  constructor(options: AdaptiveTuningOptions = {} ) {
    this.options = {
      mode: options.mode ?? "normal",
      optimizationAlgorithm: options.optimizationAlgorithm ?? "adam",
      optimizerOptions: options.optimizerOptions ?? {},
      reversed: options.reversed ?? false,
      ...options,
    };
  }

  /**
   * Calcula la disonancia total para un conjunto de notas
   */
  private calculateTotalDissonance(notes: NoteConfiguration[]): number {
    // Recopilar todos los parciales de todas las notas
    const allPartials: Overtone[] = [];

    for (const note of notes) {
      for (const partial of note.overtones) {
        allPartials.push( {
          frequency: note.fundamentalFrequency * partial.frequencyRatio,
          amplitude: partial.amplitudeRatio,
        } );
      }
    }

    return calcSetharesRoughness(allPartials);
  }

  /**
   * Crea la función objetivo para el optimizador de gradiente
   */
  private createObjectiveFunction(
    notes: NoteConfiguration[],
    reversed = false,
  ): (x: number[])=> number {
    const updateNotes = (x: number[]) => {
      // Crear copia de las notas con frecuencias actualizadas
      const updatedNotes: NoteConfiguration[] = notes.map((note, i) => ( {
        ...note,
        fundamentalFrequency: note.isFixed ? note.fundamentalFrequency : x[i],
      } ));

      return updatedNotes;
    };

    if (reversed) {
      return (x: number[]) => {
        return -this.calculateTotalDissonance(updateNotes(x));
      };
    } else {
      return (x: number[]) => {
        const updatedNotes: NoteConfiguration[] = notes.map((note, i) => ( {
          ...note,
          fundamentalFrequency: note.isFixed ? note.fundamentalFrequency : x[i],
        } ));

        return this.calculateTotalDissonance(updatedNotes);
      };
    }
  }

  /**
   * Ejecuta la optimización usando el algoritmo seleccionado
   */
  private runOptimization(
    optimizer: GradientOptimizer,
    objectiveFunction: (x: number[])=> number,
    initialFreqs: number[],
  ): OptimizationResult {
    switch (this.options.optimizationAlgorithm) {
      case "momentum":
        return optimizer.momentum(objectiveFunction, initialFreqs, this.options.momentumOptions);
      case "adam":
        return optimizer.adam(objectiveFunction, initialFreqs, this.options.adamOptions);
      default:
        throw new Error(
          `Algoritmo de optimización no soportado: ${this.options.optimizationAlgorithm}`,
        );
    }
  }

  /**
   * Algoritmo principal de Adaptive Tuning
   */
  tune(notes: NoteConfiguration[]): AdaptiveTuningResult {
    if (notes.length === 0)
      throw new Error("Se requiere al menos una nota para aplicar adaptive tuning");

    const originalFreqs = notes.map(note => note.fundamentalFrequency);
    const originalDissonance = this.calculateTotalDissonance(notes);
    // Preparar variables para la optimización
    let currentFreqs = [...originalFreqs];
    const fixedMask = notes.map(note => note.isFixed ?? false);

    // Si todas las notas están fijas, no hay nada que optimizar
    if (fixedMask.every(fixed => fixed)) {
      return {
        originalFrequencies: originalFreqs,
        tunedFrequencies: currentFreqs,
        originalDissonance,
        finalDissonance: originalDissonance,
        iterations: 0,
        converged: true,
        dissonanceReduction: 0,
        intervalRatios: this.calculateIntervalRatios(currentFreqs),
        algorithmUsed: this.options.optimizationAlgorithm,
      };
    }

    // Configurar el optimizador
    const ratio33Cents = 2 ** (33 / 1200);
    const modeOpts = typeof this.options.mode === "string"
      ? modeStrToOpts(this.options.mode)
      : this.options.mode;
    const optimizerOptions: GeneralOptions = {
      maxIter: modeOpts.maxIterations,
      tolerance: modeOpts.convergenceThreshold,
      bounds: (i)=>[i / ratio33Cents, i * ratio33Cents],
      ...this.options.optimizerOptions,
    };
    const optimizer = new GradientOptimizer(optimizerOptions);
    const objectiveFunction = this.createObjectiveFunction(notes, this.options.reversed);
    // Ejecutar optimización
    const result: OptimizationResult = this.runOptimization(
      optimizer,
      objectiveFunction,
      currentFreqs,
    );
    const tunedFreqs = result.x;
    const finalDissonance = result.fx;
    const dissonanceReduction = ((originalDissonance - finalDissonance) / originalDissonance) * 100;

    return {
      originalFrequencies: originalFreqs,
      tunedFrequencies: tunedFreqs,
      originalDissonance,
      finalDissonance,
      iterations: result.iterations,
      converged: result.converged,
      dissonanceReduction,
      intervalRatios: this.calculateIntervalRatios(tunedFreqs),
      algorithmUsed: this.options.optimizationAlgorithm,
    };
  }

  /**
   * Calcula los ratios de intervalos entre notas consecutivas
   */
  private calculateIntervalRatios(frequencies: number[]): number[] {
    if (frequencies.length < 2)
      return [];

    const sortedFreqs = [...frequencies].sort((a, b) => a - b);
    const ratios: number[] = [];

    for (let i = 1; i < sortedFreqs.length; i++)
      ratios.push(sortedFreqs[i] / sortedFreqs[i - 1]);

    return ratios;
  }
}

function modeStrToOpts(mode: Mode): ModeOpts {
  switch (mode) {
    case "slow":
      return {
        maxIterations: 400_000,
        convergenceThreshold: 1e-5,
      };
    case "fast":
      return {
        maxIterations: 500,
        convergenceThreshold: 2.5e-3,
      };
    case "normal":
      return {
        maxIterations: 20_000,
        convergenceThreshold: 1e-3,
      };
  }
}
