import type { IntervalSetArray, IntervalSet } from "@datune/core";
import { countCombinations, getCombinations } from "datils/math/combinatorics";
import { Interval, IntervalArray, IntervalSets as IS } from "@datune/core";
import { NonEmptyNumberArray } from "datils";
import { intervalSetIncludesInnerIntervalSet } from "./includesInnerIntervalSets";

export type InnerIntervalSetResult = {
  indexMap: NonEmptyNumberArray; // InnerIntervalSet -> BaseIntervalSet
  innerIntervalSet: IntervalSet;
 };

export function findInnerIntervalSets(
  base: IntervalSet,
  intervalSetsToFind: IntervalSetArray,
): InnerIntervalSetResult[] {
  return new InnerIntervalSetsFinder(base, intervalSetsToFind)
    .find();
}

class InnerIntervalSetsFinder {
  #base: IntervalSet;

  #intervalSetsToFind: IntervalSetArray;

  constructor(complexIntervalSet: IntervalSet, intervalSetsToFind: IntervalSetArray) {
    this.#base = complexIntervalSet;
    this.#intervalSetsToFind = intervalSetsToFind;
  }

  find(): InnerIntervalSetResult[] {
    const results: InnerIntervalSetResult[] = [];

    for (const innerIntervalSet of this.#intervalSetsToFind) {
      const partialResults = intervalSetIncludesInnerIntervalSet(this.#base, innerIntervalSet);

      results.push(...partialResults);
    }

    return results;
  }
}

export function getAllInnerIntervalSets(intervalSet: IntervalSet): InnerIntervalSetResult[] {
  const intervalToIndex: Record<Interval, number> = {};

  for (let i = 0; i < intervalSet.size; i++) {
    const interval = intervalSet.rootIntervals[i];

    intervalToIndex[interval] = i;
  }

  const combinations = getAllCombinationsFromAtLeast2UntilLengthMinus1(intervalSet.rootIntervals);
  const results: InnerIntervalSetResult[] = [];

  for (const c of combinations) {
    const indexMap = c.map(interval=>intervalToIndex[interval]) as NonEmptyNumberArray;
    const newRootIntervals = c.map(interval=>interval - c[0]) as IntervalArray;

    results.push( {
      indexMap,
      innerIntervalSet: IS.fromRootIntervals(...newRootIntervals),
    } );
  }

  return results;
}

export function countAllInnerIntervalSets(intervalSet: IntervalSet): bigint {
  let n = 0n;

  for (let k = 2; k < intervalSet.size; k++)
    n += countCombinations(intervalSet.rootIntervals.length, k);

  return n;
}

function getAllCombinationsFromAtLeast2UntilLengthMinus1<T>(array: T[]): T[][] {
  const ret: T[][] = [];

  for (let k = 2; k < array.length; k++)
    ret.push(...getCombinations(array, k));

  return ret;
}
