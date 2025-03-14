import type { Arrays } from "@datune/utils";
import type { VoicingArray, Voicing } from "@datune/core/voicings/chromatic";
import { countCombinations, getCombinations } from "@datune/utils/math";
import { Interval, IntervalArray, Voicings as V } from "@datune/core";

export type InnerVoicingResult = {
  indexMap: Arrays.Number; // InnerVoicing -> BaseVoicing
  innerVoicing: Voicing;
 };

export function findInnerVoicings(
  base: Voicing,
  voicingsToFind: VoicingArray,
): InnerVoicingResult[] {
  return new InnerVoicingsFinder(base, voicingsToFind)
    .find();
}

class InnerVoicingsFinder {
  #base: Voicing;

  #voicingsToFind: VoicingArray;

  constructor(complexVoicing: Voicing, voicingsToFind: VoicingArray) {
    this.#base = complexVoicing;
    this.#voicingsToFind = voicingsToFind;
  }

  find(): InnerVoicingResult[] {
    const results: InnerVoicingResult[] = [];

    for (const innerVoicing of this.#voicingsToFind) {
      const partialResults = voicingIncludesInnerVoicing(this.#base, innerVoicing);

      results.push(...partialResults);
    }

    return results;
  }
}

// TODO: mover a core
function voicingIncludesInnerVoicing(base: Voicing, innerVoicing: Voicing): InnerVoicingResult[] {
  const results: InnerVoicingResult[] = [];
  const baseRootIntervals = base.rootIntervals;

  // eslint-disable-next-line no-restricted-syntax
  baseFor: for (const intervalInBase of base) {
    const indexMap = [] as unknown as Arrays.Number;

    for (const interval of innerVoicing) {
      const shiftedInterval = intervalInBase + interval;
      const index = baseRootIntervals.indexOf(shiftedInterval);

      if (index === -1)
        continue baseFor;

      indexMap.push(index);
    }

    results.push( {
      indexMap,
      innerVoicing,
    } );
  }

  return results;
}

// TODO: mover a core
export function voicingWithOmit(voicing: Voicing, ...intervals: Interval[]): Voicing | null {
  let newIntervals: Interval[] = [];

  for (const i of voicing.rootIntervals) {
    if (!intervals.includes(i))
      newIntervals.push(i);
  }

  if (newIntervals.length <= 1)
    return null;

  return V.fromRootIntervals(...newIntervals as IntervalArray);
}

export function getAllInnerVoicings(voicing: Voicing): InnerVoicingResult[] {
  const intervalToIndex: Record<Interval, number> = {};

  for (let i = 0; i < voicing.length; i++) {
    const interval = voicing.rootIntervals[i];

    intervalToIndex[interval] = i;
  }

  const combinations = getAllCombinationsFromAtLeast2UntilLengthMinus1(voicing.rootIntervals);
  const results: InnerVoicingResult[] = [];

  for (const c of combinations) {
    const indexMap = c.map(interval=>intervalToIndex[interval]) as Arrays.Number;
    const newRootIntervals = c.map(interval=>interval - c[0]) as IntervalArray;

    results.push( {
      indexMap,
      innerVoicing: V.fromRootIntervals(...newRootIntervals),
    } );
  }

  return results;
}

export function countAllInnerVoicings(voicing: Voicing): bigint {
  let n = 0n;

  for (let k = 2; k < voicing.length; k++)
    n += countCombinations(voicing.rootIntervals.length, k);

  return n;
}

function getAllCombinationsFromAtLeast2UntilLengthMinus1<T>(array: T[]): T[][] {
  const ret: T[][] = [];

  for (let k = 2; k < array.length; k++)
    ret.push(...getCombinations(array, k));

  return ret;
}
