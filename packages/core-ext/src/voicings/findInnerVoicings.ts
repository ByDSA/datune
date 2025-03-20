import type { VoicingArray, Voicing } from "@datune/core/voicings/chromatic";
import { countCombinations, getCombinations } from "datils/math/combinatorics";
import { Interval, IntervalArray, Voicings as V } from "@datune/core";
import { NonEmptyNumberArray } from "datils";
import { voicingIncludesInnerVoicing } from "./includesInnerVoicing";

export type InnerVoicingResult = {
  indexMap: NonEmptyNumberArray; // InnerVoicing -> BaseVoicing
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

export function getAllInnerVoicings(voicing: Voicing): InnerVoicingResult[] {
  const intervalToIndex: Record<Interval, number> = {};

  for (let i = 0; i < voicing.length; i++) {
    const interval = voicing.rootIntervals[i];

    intervalToIndex[interval] = i;
  }

  const combinations = getAllCombinationsFromAtLeast2UntilLengthMinus1(voicing.rootIntervals);
  const results: InnerVoicingResult[] = [];

  for (const c of combinations) {
    const indexMap = c.map(interval=>intervalToIndex[interval]) as NonEmptyNumberArray;
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
