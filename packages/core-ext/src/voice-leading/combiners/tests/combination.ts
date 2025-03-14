import { SingleStep } from "../../steps/single/SingleStep";
import { SingleStepArray } from "../../steps/single/Array";
import { StepCombination, SingleStepCombination } from "../types";
import { sortByIndex } from "../../steps/single/Array";

type T = SingleStep[] | SingleStepArray | SingleStepCombination | StepCombination;
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
  actual: SingleStepCombination[],
  expected: SingleStepCombination[],
) {
  const actual2 = actual.map(c=>c.sort(sortByIndex));
  const expected2 = expected.map(c=>c.sort(sortByIndex));

  try {
    expect(actual2.sort()).toEqual(expected2.sort());
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual2.map(c=>(c.map(String).join(","))),
      expected: expected2.map(c=>c.map(String).join(",")),
    }, null, 2));
  }
}

export function stringifyCombination(combination: StepCombination): string {
  return JSON.stringify(combination.map(String));
}
