import type { StepGroup } from "voice-leading/generators/StepsGenerator";
import { fromIntervals as compositeStepFromIntervals } from "../steps/composite/building";
import * as SingleSteps from "../steps/single/constants";
import { combineStepGroups } from "./combine-groups";
import { expectCombinations } from "./tests/combination";

it("expectCombinations should ignore sorting in combinations", () => {
  const groups: StepGroup[] = [
    [SingleSteps.X0_1, SingleSteps.X0_S1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const unsortedExpected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_S1],
    [SingleSteps.X1_1, SingleSteps.X0_S1],
  ];

  expectCombinations(actual, unsortedExpected);
} );

it("single steps, two groups", () => {
  const groups: StepGroup[] = [
    [SingleSteps.X0_1, SingleSteps.X0_S1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_1],
  ];

  expectCombinations(actual, expected);
} );

it("single steps and null", () => {
  const groups: StepGroup[] = [
    [SingleSteps.X0_1, null],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X1_S1],
    [SingleSteps.X1_1],
  ];

  expectCombinations(actual, expected);
} );

it("null is not the same as not put", () => {
  const groupsWithNull: StepGroup[] = [
    [SingleSteps.X0_1, null],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const groupsWithoutNull: StepGroup[] = [
    [SingleSteps.X0_1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actualWithNull = combineStepGroups(groupsWithNull).combinations;
  const actualWithoutNull = combineStepGroups(groupsWithoutNull).combinations;

  expect(()=> expectCombinations(actualWithNull, actualWithoutNull)).toThrow();
} );

it("single step and composite step without", () => {
  const groups: StepGroup[] = [
    [SingleSteps.X2_1, SingleSteps.X2_S1],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [[
    SingleSteps.X2_1,
    SingleSteps.X0_1,
    SingleSteps.X1_1,
  ],
  [
    SingleSteps.X2_S1,
    SingleSteps.X0_1,
    SingleSteps.X1_1,
  ]];

  expectCombinations(actual, expected);
} );

it("single step and composite step with overlapping", () => {
  const groups: StepGroup[] = [
    [SingleSteps.X0_1, null],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [[
    SingleSteps.X0_1,
    SingleSteps.X1_1,
  ]];

  expectCombinations(actual, expected);
} );
