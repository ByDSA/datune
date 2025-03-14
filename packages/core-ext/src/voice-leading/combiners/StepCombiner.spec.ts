import { fromIntervals as compositeStepFromIntervals } from "../steps/composite/building";
import * as SingleSteps from "../steps/single/constants";
import { combineStepGroups } from "./combine-groups";
import { expectCombinations } from "./tests/combination";

it("expectCombinations should ignore sorting in combinations", () => {
  const groups = [
    [SingleSteps.X0_1, SingleSteps.X0_S1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups);
  const unsortedExpected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_S1],
    [SingleSteps.X1_1, SingleSteps.X0_S1],
  ];

  expectCombinations(actual, unsortedExpected);
} );

it("single steps, two groups", () => {
  const groups = [
    [SingleSteps.X0_1, SingleSteps.X0_S1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups);
  const expected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_S1],
    [SingleSteps.X0_S1, SingleSteps.X1_1],
  ];

  expectCombinations(actual, expected);
} );

it("single steps and null", () => {
  const groups = [
    [SingleSteps.X0_1, null],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actual = combineStepGroups(groups);
  const expected = [
    [SingleSteps.X0_1, SingleSteps.X1_1],
    [SingleSteps.X0_1, SingleSteps.X1_S1],
    [SingleSteps.X1_S1],
    [SingleSteps.X1_1],
  ];

  expectCombinations(actual, expected);
} );

it("null is not the same as not put", () => {
  const groupsWithNull = [
    [SingleSteps.X0_1, null],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const groupsWithoutNull = [
    [SingleSteps.X0_1],
    [SingleSteps.X1_1, SingleSteps.X1_S1],
  ];
  const actualWithNull = combineStepGroups(groupsWithNull);
  const actualWithoutNull = combineStepGroups(groupsWithoutNull);

  expect(()=> expectCombinations(actualWithNull, actualWithoutNull)).toThrow();
} );

it("single step and composite step without", () => {
  const groups = [
    [SingleSteps.X2_1, SingleSteps.X2_S1],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups);
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
  const groups = [
    [SingleSteps.X0_1, null],
    [compositeStepFromIntervals(1, 1)],
  ];
  const actual = combineStepGroups(groups);
  const expected = [[
    SingleSteps.X0_1,
    SingleSteps.X1_1,
  ]];

  expectCombinations(actual, expected);
} );
