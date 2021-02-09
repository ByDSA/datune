import { SPNArray } from "../../../../chords";
import { SPN } from "../../../../pitches";
import { CompositeStep } from "../../composite/CompositeStep";
import { SingleStep } from "../../single/SingleStep";
import { MultiStepsGen } from "./MultiStepsGen";

it("combinations - SUS in notes: C4, F4, G4", () => {
    const notes: SPNArray = [SPN.C4, SPN.F4, SPN.G4];
    let solver = MultiStepsGen.create()
        .notes(...notes);
    let results = solver.initializeCombiner();
    let combinations = results.combiner.calcSets();
    let actual: SingleStep[][] = combinationsProcess(combinations);
    let expected = [
        [SingleStep.from(1, -1), SingleStep.from(2, 0)],
        [SingleStep.from(1, -2), SingleStep.from(2, 0)],
        [SingleStep.from(1, 0), SingleStep.from(2, 1)],
        [SingleStep.from(1, 0), SingleStep.from(2, 2)],
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("combinations - near (1): C4, G4", () => {
    const notes: SPNArray = [SPN.C4, SPN.G4];
    let solver = MultiStepsGen.create()
        .notes(...notes)
        .enableNear()
        .maxStep(1);
    let results = solver.initializeCombiner();
    let combinations = results.combiner.calcSets();
    let actual: SingleStep[][] = combinationsProcess(combinations);
    let expected = [
        CompositeStep.fromIntervals(-1, -1),
        CompositeStep.fromIntervals(-1, 1),
        CompositeStep.fromIntervals(-1),
        CompositeStep.fromIntervals(1, -1),
        CompositeStep.fromIntervals(1),
        CompositeStep.fromIntervals(1, 1),
        CompositeStep.fromIntervals(0, -1),
        CompositeStep.fromIntervals(0, 1),
    ].map(cm => cm.singleSteps);

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("DIM in notes: D3, F4, B4", () => {
    const notes: SPNArray = [SPN.D3, SPN.F4, SPN.B4];
    let solver = MultiStepsGen.create()
        .notes(...notes);
    let results = solver.initializeCombiner();
    let combinations = results.combiner.calcSets();
    let actual: SingleStep[][] = combinationsProcess(combinations);
    let expected = [
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
        CompositeStep.fromIntervals(0, -2, -1)
    ].map(cm => cm.singleSteps.sort());

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("DIM in notes: G3, B3, D4, F4", () => {
    const notes: SPNArray = [SPN.G3, SPN.B3, SPN.D4, SPN.F4];
    let solver = MultiStepsGen.create()
        .notes(...notes);
    let results = solver.initializeCombiner();
    let combinations = results.combiner.fillZeroIntervals().calcSets();
    let actual: SingleStep[][] = combinationsProcess(combinations);
    let expected: SingleStep[][] = [
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
    ].map(cs => cs.singleSteps.sort()).sort();

    for (let i = 0; i < actual.length; i++)
        for (let j = 0; j < actual[i].length; j++)
            expect(actual[i][j]).toEqual(expected[i][j]);
})

it("disableResolutions - DIM in notes: G3, B3, D4, F4", () => {
    const notes: SPNArray = [SPN.G3, SPN.B3, SPN.D4, SPN.F4];
    let solver = MultiStepsGen.create()
        .notes(...notes)
        .disableResolutions();
    let results = solver.initializeCombiner();
    let combinations = results.combiner.calcSets();
    let actual: SingleStep[][] = combinationsProcess(combinations);
    let expected: SingleStep[][] = [];

    expect(new Set(actual)).toStrictEqual(new Set(expected));
})

function combinationsProcess(combinations: Set<SingleStep>[]) {
    return combinations.map(set => [...set].sort()).sort();
}