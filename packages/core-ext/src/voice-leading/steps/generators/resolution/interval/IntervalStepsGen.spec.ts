import { Array as SPNArray, B3, C4, F4, G4 } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { CompositeStep } from "../../../composite/CompositeStep";
import { Step } from "../../../Step";
import IntervalStepsGen from "./IntervalStepsGen";

TestInit.loadAll();
it("SUS: F4, G4", () => {
  const bottom = F4;
  const top = G4;
  const notes: SPNArray = [bottom, top];
  const solver = IntervalStepsGen.create()
    .notes(...notes);
  const actual = solver.generateSteps();
  const expected = [
    CompositeStep.fromIntervalsKeepZero(-1, 0),
    CompositeStep.fromIntervalsKeepZero(-2, 0),
    CompositeStep.fromIntervalsKeepZero(0, 1),
    CompositeStep.fromIntervalsKeepZero(0, 2),
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("nothing: C4, G4", () => {
  const bottom = C4;
  const top = G4;
  const notes: SPNArray = [bottom, top];
  const solver = IntervalStepsGen.create()
    .notes(...notes);
  const actual = solver.generateSteps();
  const expected: Step[] = [];

  expect(actual).toStrictEqual(expected);
} );

it("DIM: B3, F4", () => {
  const bottom = B3;
  const top = F4;
  const notes: SPNArray = [bottom, top];
  const solver = IntervalStepsGen.create()
    .notes(...notes);
  const actual = solver.generateSteps();
  const expected = [
    CompositeStep.fromIntervals(1, 2),
    CompositeStep.fromIntervals(1, -1),
    CompositeStep.fromIntervals(1, -2),
    CompositeStep.fromIntervals(2, 1),
    CompositeStep.fromIntervals(2, -1),
    CompositeStep.fromIntervals(2, -2),
    CompositeStep.fromIntervals(-1, 1),
    CompositeStep.fromIntervals(-1, 2),
    CompositeStep.fromIntervals(-1, -2),
    CompositeStep.fromIntervals(-2, 1),
    CompositeStep.fromIntervals(-2, 2),
    CompositeStep.fromIntervals(-2, -1),
  ];

  expect(actual).toStrictEqual(expected);
} );
