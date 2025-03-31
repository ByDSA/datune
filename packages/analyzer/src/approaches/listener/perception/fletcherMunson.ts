/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { freeze } from "datils/datatypes/objects";

/* eslint-disable no-mixed-operators */
const fletcherMunsonCurves: [number, number][] = [
  [20, -20], [25, -17], [31.5, -14], [40, -11], [50, -9],
  [63, -7], [80, -6], [100, -5], [125, -4], [160, -3],
  [200, -2], [250, -1], [315, 0], [400, 1], [500, 2],
  [630, 3], [800, 4], [1000, 5], [1250, 6], [1600, 7],
  [2000, 8], [2500, 9], [3150, 8], [4000, 7], [5000, 6],
  [6300, 4], [8000, 2], [10000, 0], [12500, -2], [16000, -5],
  [20000, -8],
];

export function applyFletcherMunsonCurveCorrection(frequency: number): number {
  if (frequency <= fletcherMunsonCurves[0][0])
    return 10 ** (fletcherMunsonCurves[0][1] / 20);

  if (frequency >= fletcherMunsonCurves[fletcherMunsonCurves.length - 1][0])
    return 10 ** (fletcherMunsonCurves[fletcherMunsonCurves.length - 1][1] / 20);

  for (let i = 0; i < fletcherMunsonCurves.length - 1; i++) {
    const [f1, v1] = fletcherMunsonCurves[i];
    const [f2, v2] = fletcherMunsonCurves[i + 1];

    if (frequency >= f1 && frequency <= f2) {
      const ratio = (frequency - f1) / (f2 - f1);
      const perceivedDb = v1 + (ratio * (v2 - v1));

      return 10 ** (perceivedDb / 20);
    }
  }

  return 1;
}

// Fuente: https://cdn.standards.iteh.ai/samples/83117/6afa5bd94e0e4f32812c28c3b0a7b8ac/ISO-226-2023.pdf
function iso226rev2023Formula2(
  L_f: number, // Nivel de presión sonora en dB SPL
  L_U: number, // Magnitud de la función de transferencia lineal normalizada a 1000 Hz en dB
  T_f: number, // Umbral de audición en dB
  a_f: number, // Exponente para la percepción de la sonoridad
): number {
  const term1 = 10 ** ((a_f * (L_f + L_U)) / 10);
  const term2 = 10 ** ((a_f * (T_f + L_U)) / 10);
  const denominator = (4 * (10 ** -10)) ** (0.3 - a_f);

  return (100 / 3) * Math.log10((term1 - term2) / denominator + (10 ** 0.072));
}

export function applyLoudnessLevelIso226rev2023(frequency: number, velocity: number): number {
  const L_max = 90;
  const L_f = 20 * Math.log10(velocity / 127) + L_max;
  const L_N = continuousLoudnessLevelIso226rev2023(frequency, L_f);
  const fixedVelocity = 127 * L_N / L_max;

  return fixedVelocity / velocity;
}

function continuousLoudnessLevelIso226rev2023(frequency: number, L_f: number): number {
  if (frequency <= frequencies[0]) {
    const params = frequencyData[frequencies[0]];

    return iso226rev2023Formula2(L_f, params.LU, params.Tf, params.af);
  }

  if (frequency >= frequencies.at(-1)!) {
    const params = frequencyData[frequencies.at(-1)!];
    // Para atenuar desde 12.5kHz hasta 20kHz. Esto no está en el paper
    const attenuationFactor = highFrequencyAttenuation(frequency);

    return attenuationFactor * iso226rev2023Formula2(L_f, params.LU, params.Tf, params.af);
  }

  let rightIndex;

  for (rightIndex = 0; rightIndex < frequencies.length; rightIndex++) {
    if (frequency <= frequencies[rightIndex])
      break;
  }

  const leftIndex = rightIndex - 1;
  const f1 = frequencies[leftIndex];
  const f2 = frequencies[rightIndex];
  const f1Params = frequencyData[f1];
  const f2Params = frequencyData[f2];
  const ratio = (frequency - f1) / (f2 - f1);
  const ln1 = iso226rev2023Formula2(L_f, f1Params.LU, f1Params.Tf, f1Params.af);
  const ln2 = iso226rev2023Formula2(L_f, f2Params.LU, f2Params.Tf, f2Params.af);

  return interpolate(ln1, ln2, ratio);
}

function interpolate(from: number, to: number, ratio: number) {
  return from + (ratio * (to - from));
}

function highFrequencyAttenuation(frequency: number): number {
  const fThreshold = frequencies.at(-1)!;
  const fMax = 20000;

  if (frequency <= fThreshold)
    return 1;
  else if (frequency >= fMax)
    return 0;
  else {
    const norm = (frequency - fThreshold) / (fMax - fThreshold);
    const alpha = 6; // Cuanto mayor, más rápido decae

    return Math.exp(-alpha * norm);
  }
}
type FormulaParameters = {
  af: number;
  LU: number;
  Tf: number;
};
const frequencyData: Record<number, FormulaParameters> = freeze( {
  20: {
    af: 0.635,
    LU: -31.5,
    Tf: 78.1,
  },
  25: {
    af: 0.602,
    LU: -27.2,
    Tf: 68.7,
  },
  31.5: {
    af: 0.569,
    LU: -23.1,
    Tf: 59.5,
  },
  40: {
    af: 0.537,
    LU: -19.3,
    Tf: 51.1,
  },
  50: {
    af: 0.509,
    LU: -16.1,
    Tf: 44.0,
  },
  63: {
    af: 0.482,
    LU: -13.1,
    Tf: 37.5,
  },
  80: {
    af: 0.456,
    LU: -10.4,
    Tf: 31.5,
  },
  100: {
    af: 0.433,
    LU: -8.2,
    Tf: 26.5,
  },
  125: {
    af: 0.412,
    LU: -6.3,
    Tf: 22.1,
  },
  160: {
    af: 0.391,
    LU: -4.6,
    Tf: 17.9,
  },
  200: {
    af: 0.373,
    LU: -3.2,
    Tf: 14.4,
  },
  250: {
    af: 0.357,
    LU: -2.1,
    Tf: 11.4,
  },
  315: {
    af: 0.343,
    LU: -1.2,
    Tf: 8.6,
  },
  400: {
    af: 0.330,
    LU: -0.5,
    Tf: 6.2,
  },
  500: {
    af: 0.320,
    LU: 0.0,
    Tf: 4.4,
  },
  630: {
    af: 0.311,
    LU: 0.4,
    Tf: 3.0,
  },
  800: {
    af: 0.303,
    LU: 0.5,
    Tf: 2.2,
  },
  1000: {
    af: 0.300,
    LU: 0.0,
    Tf: 2.4,
  },
  1250: {
    af: 0.295,
    LU: -2.7,
    Tf: 3.5,
  },
  1600: {
    af: 0.292,
    LU: -4.2,
    Tf: 1.7,
  },
  2000: {
    af: 0.290,
    LU: -1.2,
    Tf: -1.3,
  },
  2500: {
    af: 0.290,
    LU: 1.4,
    Tf: -4.2,
  },
  3150: {
    af: 0.289,
    LU: 2.3,
    Tf: -6.0,
  },
  4000: {
    af: 0.289,
    LU: 1.0,
    Tf: -5.4,
  },
  5000: {
    af: 0.289,
    LU: -2.3,
    Tf: -1.5,
  },
  6300: {
    af: 0.293,
    LU: -7.2,
    Tf: 6.0,
  },
  8000: {
    af: 0.303,
    LU: -11.2,
    Tf: 12.6,
  },
  10000: {
    af: 0.323,
    LU: -10.9,
    Tf: 13.9,
  },
  12500: {
    af: 0.354,
    LU: -3.5,
    Tf: 12.3,
  },
} );
const frequencies = freeze(
  Object.keys(frequencyData)
    .map(Number)
    .sort((a, b)=>a - b),
);
