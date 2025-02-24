import { Array as SPNArray, B3, B4, C4, D3, D4, F4, G3, G4 } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { CompositeStep } from "../../composite/CompositeStep";
import { from, SingleStep } from "../../single";
import { MultiStepsGen } from "./MultiStepsGen";

TestInit.loadAll();
it("combinations - SUS in notes: C4, F4, G4", () => {
  const notes: SPNArray = [C4, F4, G4];
  const solver = MultiStepsGen.create()
    .notes(...notes);
  const results = solver.initializeCombiner();
  const combinations = results.combiner.calcSets();
  const actual: SingleStep[][] = combinationsProcess(combinations);
  const expected = [
    [from(1, -1), from(2, 0)],
    [from(1, -2), from(2, 0)],
    [from(1, 0), from(2, 1)],
    [from(1, 0), from(2, 2)],
  ];

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("combinations - near (1): C4, G4", () => {
  const notes: SPNArray = [C4, G4];
  const solver = MultiStepsGen.create()
    .notes(...notes)
    .enableNear()
    .maxStep(1);
  const results = solver.initializeCombiner();
  const combinations = results.combiner.calcSets();
  const actual: SingleStep[][] = combinationsProcess(combinations);
  const expected = [
    CompositeStep.fromIntervals(-1, -1),
    CompositeStep.fromIntervals(-1, 1),
    CompositeStep.fromIntervals(-1),
    CompositeStep.fromIntervals(1, -1),
    CompositeStep.fromIntervals(1),
    CompositeStep.fromIntervals(1, 1),
    CompositeStep.fromIntervals(0, -1),
    CompositeStep.fromIntervals(0, 1),
  ].map((cm) => cm.singleSteps);

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("DIM in notes: D3, F4, B4", () => {
  const notes: SPNArray = [D3, F4, B4];
  const solver = MultiStepsGen.create()
    .notes(...notes);
  const results = solver.initializeCombiner();
  const combinations = results.combiner.calcSets();
  const actual: SingleStep[][] = combinationsProcess(combinations);
  const expected = [
    CompositeStep.fromIntervals(0, 1, 2),
    CompositeStep.fromIntervals(0, 1, -1),
    CompositeStep.fromIntervals(0, 1, -2),
    CompositeStep.fromIntervals(0, 2, 1),
    CompositeStep.fromIntervals(0, 2, -1),
    CompositeStep.fromIntervals(0, 2, -2),
    CompositeStep.fromIntervals(0, -1, 1),
    CompositeStep.fromIntervals(0, -1, 2),
    CompositeStep.fromIntervals(0, -1, -2),
    CompositeStep.fromIntervals(0, -2, 1),
    CompositeStep.fromIntervals(0, -2, 2),
    CompositeStep.fromIntervals(0, -2, -1),
  ].map((cm) => cm.singleSteps.sort());

  expect(actual.sort()).toStrictEqual(expected.sort());
} );

it("DIM in notes: G3, B3, D4, F4", () => {
  const notes: SPNArray = [G3, B3, D4, F4];
  const solver = MultiStepsGen.create()
    .notes(...notes);
  const results = solver.initializeCombiner();
  const combinations = results.combiner.fillZeroIntervals().calcSets();
  const actual: SingleStep[][] = combinationsProcess(combinations);
  const expected: SingleStep[][] = [
    CompositeStep.fromIntervalsKeepZero(0, 0, 0, -1),
    CompositeStep.fromIntervalsKeepZero(0, 0, 0, -2),
    CompositeStep.fromIntervalsKeepZero(1, 0, 0, 0),
    CompositeStep.fromIntervalsKeepZero(2, 0, 0, 0),
    CompositeStep.fromIntervalsKeepZero(0, -1, 0, -2),
    CompositeStep.fromIntervalsKeepZero(0, -1, 0, 1),
    CompositeStep.fromIntervalsKeepZero(0, -1, 0, 2),
    CompositeStep.fromIntervalsKeepZero(0, -2, 0, -1),
    CompositeStep.fromIntervalsKeepZero(0, -2, 0, 1),
    CompositeStep.fromIntervalsKeepZero(0, -2, 0, 2),
    CompositeStep.fromIntervalsKeepZero(0, 1, 0, -1),
    CompositeStep.fromIntervalsKeepZero(0, 1, 0, -2),
    CompositeStep.fromIntervalsKeepZero(0, 1, 0, 2),
    CompositeStep.fromIntervalsKeepZero(0, 2, 0, -1),
    CompositeStep.fromIntervalsKeepZero(0, 2, 0, -2),
    CompositeStep.fromIntervalsKeepZero(0, 2, 0, 1),
  ].map((cs) => cs.singleSteps.sort()).sort();

  for (let i = 0; i < actual.length; i++) {
    for (let j = 0; j < actual[i].length; j++)
      expect(actual[i][j]).toEqual(expected[i][j]);
  }
} );

it("disableResolutions - DIM in notes: G3, B3, D4, F4", () => {
  const notes: SPNArray = [G3, B3, D4, F4];
  const solver = MultiStepsGen.create()
    .notes(...notes)
    .disableResolutions();
  const results = solver.initializeCombiner();
  const combinations = results.combiner.calcSets();
  const actual: SingleStep[][] = combinationsProcess(combinations);
  const expected: SingleStep[][] = [];

  expect(new Set(actual)).toStrictEqual(new Set(expected));
} );

function combinationsProcess(combinations: Set<SingleStep>[]) {
  return combinations.map((set) => [...set].sort()).sort();
}
