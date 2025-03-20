import { SingleStep } from "voice-leading/steps";
import { Combination } from "../types";
import { singleStepsSortByIndex } from "../../steps/single/Array";

export function ensureIsCombination(a: unknown): a is Combination {
  if (!Array.isArray(a) || a.length === 0)
    return false;

  if (!Array.isArray(a[0]) || a.some(s => !Array.isArray(s) || s.length === 0))
    return false;

  return true;
}

type T = Combination;
export function expectCombination(
  actual: T,
  expected: T,
) {
  try {
    expect(actual).toEqual(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: stringifyCombination(actual),
      expected: stringifyCombination(expected),
    }, null, 2));
  }
}

export function expectCombinations(
  actual: SingleStep[][],
  expected: SingleStep[][],
) {
  ensureIsCombination(actual);
  ensureIsCombination(expected);
  const actual2 = actual.map(c=>c.sort(singleStepsSortByIndex));
  const expected2 = expected.map(c=>c.sort(singleStepsSortByIndex));

  try {
    expect(actual2.sort()).toEqual(expected2.sort());
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual2.map(c=>(c.map(String).join(","))),
      expected: expected2.map(c=>c.map(String).join(",")),
    }, null, 2));
  }
}

export function stringifyCombination(combination: Combination): string {
  return JSON.stringify(combination.map(String));
}
