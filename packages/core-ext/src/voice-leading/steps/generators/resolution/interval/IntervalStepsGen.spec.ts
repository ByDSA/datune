import { SPNArray, SPNs } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { CompositeSteps } from "../../../composite";
import { Step } from "../../../Step";
import { IntervalStepsGen } from "./IntervalStepsGen";

TestInit.loadAll();

const { B3, C4, F4, G4 } = SPNs;

it("sUS: F4, G4", () => {
  const bottom = F4;
  const top = G4;
  const notes: SPNArray = [bottom, top];
  const solver = IntervalStepsGen.create()
    .notes(...notes);
  const actual = solver.generateSteps();
  const expected = [
    CompositeSteps.fromIntervalsKeepZero(-1, 0),
    CompositeSteps.fromIntervalsKeepZero(-2, 0),
    CompositeSteps.fromIntervalsKeepZero(0, 1),
    CompositeSteps.fromIntervalsKeepZero(0, 2),
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

it("dIM: B3, F4", () => {
  const bottom = B3;
  const top = F4;
  const notes: SPNArray = [bottom, top];
  const solver = IntervalStepsGen.create()
    .notes(...notes);
  const actual = solver.generateSteps();
  const expected = [
    CompositeSteps.fromIntervals(1, 2),
    CompositeSteps.fromIntervals(1, -1),
    CompositeSteps.fromIntervals(1, -2),
    CompositeSteps.fromIntervals(2, 1),
    CompositeSteps.fromIntervals(2, -1),
    CompositeSteps.fromIntervals(2, -2),
    CompositeSteps.fromIntervals(-1, 1),
    CompositeSteps.fromIntervals(-1, 2),
    CompositeSteps.fromIntervals(-1, -2),
    CompositeSteps.fromIntervals(-2, 1),
    CompositeSteps.fromIntervals(-2, 2),
    CompositeSteps.fromIntervals(-2, -1),
  ];

  expect(actual).toStrictEqual(expected);
} );
