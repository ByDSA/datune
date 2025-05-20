// parker-root-finder.ts
import { Intervals, Pitch } from "@datune/core";
import { Arrays } from "datils/datatypes/arrays";

/**
 * Tabla de penalizaciones (penalty) para cada intervalo
 * según Parker (1983). Los valores son heurísticos,
 * reflejando la disonancia/raridad perceptual.
 */
const INTERVAL_PENALTY: Record<number, number> = {
  0: 0.00, // unísono
  1: 9.26, // minor 2nd
  2: 4.52, // major 2nd
  3: 2.66, // minor 3rd
  4: 1.69, // major 3rd
  5: 1.88, // perfect 4th
  6: 7.33, // tritone
  7: 0.00, // perfect 5th
  8: 1.62, // minor 6th
  9: 3.36, // major 6th
  10: 7.02, // minor 7th
  11: 9.00, // major 7th
};

/**
 * Calcula el "coste" de interpretar `rootPc` como la raíz
 * de un conjunto de pitch-classes `pcs`, sumando penalties.
 */
function costForRoot(rootPc: Pitch, pitches: Pitch[]): number {
  let cost = 0;
  const pcs = [...pitches];

  Arrays.rotateRight(pcs, pitches.indexOf(rootPc));

  for (const pc of pcs) {
    if (pitches[0] === pcs[0] && pc === pcs[0])
      cost -= 2;

    const interval = Intervals.betweenNext(rootPc, pc) % 12;

    cost += INTERVAL_PENALTY[interval] ?? 0;
  }

  return cost;
}

/**
 * Parker’s Root Algorithm:
 * - Convierte a pitch-classes
 * - Para cada candidate root, calcula el coste
 * - Elige el root con coste mínimo
 */
export function detectRootParker(pcs: Pitch[]): Pitch {
  if (pcs.length === 0)
    throw new Error("No hay pitches válidos");

  let [bestRoot] = pcs;
  let bestCost = Infinity;

  for (const candidate of pcs) {
    const c = costForRoot(candidate, pcs);

    if (c < bestCost) {
      bestCost = c;
      bestRoot = candidate;
    }
  }

  return bestRoot;
}
