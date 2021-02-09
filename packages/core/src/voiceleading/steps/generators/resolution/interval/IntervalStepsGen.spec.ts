import { SPNArray } from "../../../../../chords";
import { SPN } from "../../../../../pitches";
import { CompositeStep } from "../../../composite/CompositeStep";
import { Step } from "../../../Step";
import { IntervalStepsGen } from "./IntervalStepsGen";

it("SUS: F4, G4", () => {
    const bottom = SPN.F4;
    const top = SPN.G4;
    const notes: SPNArray = [bottom, top];
    let solver = IntervalStepsGen.create()
        .notes(...notes);
    let actual = solver.generateSteps();
    let expected = [
        CompositeStep.fromIntervalsKeepZero(-1, 0),
        CompositeStep.fromIntervalsKeepZero(-2, 0),
        CompositeStep.fromIntervalsKeepZero(0, 1),
        CompositeStep.fromIntervalsKeepZero(0, 2),
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("nothing: C4, G4", () => {
    const bottom = SPN.C4;
    const top = SPN.G4;
    const notes: SPNArray = [bottom, top];
    let solver = IntervalStepsGen.create()
        .notes(...notes);
    let actual = solver.generateSteps();
    let expected: Step[] = [];

    expect(actual).toStrictEqual(expected);
})

it("DIM: B3, F4", () => {
    const bottom = SPN.B3;
    const top = SPN.F4;
    const notes: SPNArray = [bottom, top];
    let solver = IntervalStepsGen.create()
        .notes(...notes);
    let actual = solver.generateSteps();
    let expected = [
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
        CompositeStep.fromIntervals(-2, -1)
    ];

    expect(actual).toStrictEqual(expected);
})