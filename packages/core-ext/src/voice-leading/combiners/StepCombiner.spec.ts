import type { StepGroup } from "voice-leading/generators/StepsGenerator";
import { compositeStepFromIntervals } from "../steps/composite/building";
import * as SS from "../steps/single/constants";
import { combineStepGroups } from "./combine-groups";
import { expectCombinations } from "./tests/combination";

it("expectCombinations should ignore sorting in combinations", () => {
  const groups: StepGroup[] = [
    [SS.SS_0_1, SS.SS_0_S1],
    [SS.SS_1_1, SS.SS_1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const unsortedExpected = [
    [SS.SS_0_1, SS.SS_1_1],
    [SS.SS_0_1, SS.SS_1_S1],
    [SS.SS_0_S1, SS.SS_1_S1],
    [SS.SS_1_1, SS.SS_0_S1],
  ];

  expectCombinations(actual, unsortedExpected);
} );

it("single steps, two groups", () => {
  const groups: StepGroup[] = [
    [SS.SS_0_1, SS.SS_0_S1],
    [SS.SS_1_1, SS.SS_1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [
    [SS.SS_0_1, SS.SS_1_1],
    [SS.SS_0_1, SS.SS_1_S1],
    [SS.SS_0_S1, SS.SS_1_S1],
    [SS.SS_0_S1, SS.SS_1_1],
  ];

  expectCombinations(actual, expected);
} );

it("single steps and null", () => {
  const groups: StepGroup[] = [
    [SS.SS_0_1, null],
    [SS.SS_1_1, SS.SS_1_S1],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [
    [SS.SS_0_1, SS.SS_1_1],
    [SS.SS_0_1, SS.SS_1_S1],
    [SS.SS_1_S1],
    [SS.SS_1_1],
  ];

  expectCombinations(actual, expected);
} );

it("null is not the same as not put", () => {
  const groupsWithNull: StepGroup[] = [
    [SS.SS_0_1, null],
    [SS.SS_1_1, SS.SS_1_S1],
  ];
  const groupsWithoutNull: StepGroup[] = [
    [SS.SS_0_1],
    [SS.SS_1_1, SS.SS_1_S1],
  ];
  const actualWithNull = combineStepGroups(groupsWithNull).combinations;
  const actualWithoutNull = combineStepGroups(groupsWithoutNull).combinations;

  expect(()=> expectCombinations(actualWithNull, actualWithoutNull)).toThrow();
} );

it("single step and composite step without", () => {
  const groups: StepGroup[] = [
    [SS.SS_2_1, SS.SS_2_S1],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [[
    SS.SS_2_1,
    SS.SS_0_1,
    SS.SS_1_1,
  ],
  [
    SS.SS_2_S1,
    SS.SS_0_1,
    SS.SS_1_1,
  ]];

  expectCombinations(actual, expected);
} );

it("single step and composite step with overlapping", () => {
  const groups: StepGroup[] = [
    [SS.SS_0_1, null],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups).combinations;
  const expected = [[
    SS.SS_0_1,
    SS.SS_1_1,
  ]];

  expectCombinations(actual, expected);
} );
