export type OvertoneAmplitudeType =
  "custom" | "exponential-decay" | "linear-decay" | "natural-harmonic" | "sawtooth" | "square" |
    "triangle";

type DecayTypes = "exponential-decay" | "linear-decay";
type NonDecayTypes = Exclude<OvertoneAmplitudeType, DecayTypes | "custom">;

export type GenOvertoneAmplitudesProps =
  {
    minAmplitude?: number;
  } & ( {
      type: "custom";
      num?: number;
      customFn: (i: number)=> number;
    }
  | {
      type: DecayTypes;
      num?: number;
      decayFactor?: number;
    }
  | {
      type: NonDecayTypes;
      num?: number;
    } );

/**
 * Genera amplitudes de overtones según el tipo de decaimiento/espectro.
 * @param props Objeto con las propiedades para generar el espectro
 */
export function genOvertoneAmplitudes(props: GenOvertoneAmplitudesProps): number[] {
  const { type, num = 6, minAmplitude = 0 } = props;

  switch (type) {
    // eslint-disable-next-line default-case-last
    default:
    case "natural-harmonic": {
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = 1 / (i + 1);

        if (amplitude < minAmplitude)
          break; // Decrece monotónicamente

        result.push(amplitude);
      }

      return result;
    }
    case "sawtooth": {
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = 1 / (i + 1);

        if (amplitude < minAmplitude)
          break; // Decrece monotónicamente

        result.push(amplitude);
      }

      return result;
    }
    case "exponential-decay": {
      const decayFactor = props.decayFactor ?? 0.5;
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = decayFactor ** i;

        if (decayFactor < 1 && amplitude < minAmplitude)
          break; // Solo para decay < 1

        result.push(amplitude);
      }

      return result;
    }
    case "linear-decay": {
      const decayFactor = props.decayFactor ?? 0.5;
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = Math.max(1 - (i * decayFactor / num), 0);

        if (amplitude < minAmplitude)
          break; // Decrece monotónicamente

        result.push(amplitude);
      }

      return result;
    }
    case "square": {
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = (i + 1) % 2 === 1 ? 1 / (i + 1) : 0;

        // Si es impar y menor que minAmplitude, parar (los siguientes impares serán aún menores)
        if ((i + 1) % 2 === 1 && amplitude < minAmplitude)
          break;

        result.push(amplitude);
      }

      return result;
    }
    case "triangle": {
      const result: number[] = [];

      for (let i = 0; i < num; i++) {
        const amplitude = (i + 1) % 2 === 1 ? 1 / ((i + 1) ** 2) : 0;

        // Si es impar y menor que minAmplitude, parar (los siguientes impares serán aún menores)
        if ((i + 1) % 2 === 1 && amplitude < minAmplitude)
          break;

        result.push(amplitude);
      }

      return result;
    }
    case "custom": {
      // Impredecible, usar filter al final
      const result = Array.from( {
        length: num,
      }, (_, i) => (props as { customFn: (i: number)=> number } ).customFn(i));

      return result.filter(amp => amp >= minAmplitude);
    }
  }
}

export interface Overtone {
  frequency: number;
  amplitude: number;
}

type Props = {
  amplitudes: number[];
  fundamentalFreq: number;
  frequencyLimit?: number;
};

export function genHarmonicOvertones(
  { amplitudes, fundamentalFreq, frequencyLimit = 20_000 }: Props,
): Overtone[] {
  const overtones: Overtone[] = [];

  for (let index = 0; index < amplitudes.length; index++) {
    const frequency = fundamentalFreq * (index + 1);

    if (frequency > frequencyLimit)
      break;

    overtones.push( {
      frequency,
      amplitude: amplitudes[index],
    } );
  }

  return overtones;
}

export const getShiftedOvertones = (newBaseFreq: number, overtones: Overtone[]): Overtone[] => {
  const ratio = newBaseFreq / overtones[0].frequency;

  return overtones.map(p => ( {
    frequency: p.frequency * ratio,
    amplitude: p.amplitude,
  } ));
};
