// Perfiles tonales de Krumhansl & Kessler (1982)
const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09,
                      2.52, 5.19, 2.39, 3.66, 2.29, 2.88];

const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53,
                      2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

// Rota un array n posiciones a la izquierda
function rotateArray(arr: number[], n: number): number[] {
  return arr.slice(n).concat(arr.slice(0, n));
}

// Correlación de Pearson
function pearsonCorrelation(a: number[], b: number[]): number {
  const n = a.length;
  const meanA = a.reduce((sum, val) => sum + val, 0) / n;
  const meanB = b.reduce((sum, val) => sum + val, 0) / n;

  let num = 0;
  let denomA = 0;
  let denomB = 0;

  for (let i = 0; i < n; i++) {
    const diffA = a[i] - meanA;
    const diffB = b[i] - meanB;
    num += diffA * diffB;
    denomA += diffA ** 2;
    denomB += diffB ** 2;
  }

  return denomA && denomB ? num / Math.sqrt(denomA * denomB) : 0;
}

// Estimación de tonalidad
export function estimateKey(inputVector: number[]): {
  key: string;
  mode: "major" | "minor";
  correlation: number;
} {
  const pitchClasses = ['C', 'C#', 'D', 'D#', 'E', 'F',
                        'F#', 'G', 'G#', 'A', 'A#', 'B'];

  let bestKey = '';
  let bestMode: 'major' | 'minor' = 'major';
  let bestCorr = -Infinity;

  for (let i = 0; i < 12; i++) {
    const rotatedMajor = rotateArray(majorProfile, i);
    const corrMajor = pearsonCorrelation(inputVector, rotatedMajor);
    if (corrMajor > bestCorr) {
      bestCorr = corrMajor;
      bestKey = pitchClasses[i];
      bestMode = 'major';
    }

    const rotatedMinor = rotateArray(minorProfile, i);
    const corrMinor = pearsonCorrelation(inputVector, rotatedMinor);
    if (corrMinor > bestCorr) {
      bestCorr = corrMinor;
      bestKey = pitchClasses[i];
      bestMode = 'minor';
    }
  }

  return {
    key: bestKey,
    mode: bestMode,
    correlation: bestCorr
  };
}

