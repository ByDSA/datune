import { SPN } from "pitches";
import { Tonality } from "tonalities";
import { SPNArray } from "../../../chords";
import { ChromaticArray } from "../../../chords/octave/chromatic/ChromaticChord";
import { CompositeStep } from "../composite/CompositeStep";
import { expandStepsArray } from "../forward/multi/Utils";
import { NearStepsGen } from "../generators/others/near/NearStepsGenerator";
import { SingleStep } from "../single/SingleStep";
import { StepArray, Target } from "../Step";
import { StepCombinationsApplier } from "./StepCombinationsApplier";

it("apply: notes and combinations", () => {
    const notes: SPNArray = [SPN.C5, SPN.E5, SPN.G5];
    const combinations = [
        [SingleStep._0_1, SingleStep._1_S1],
        [SingleStep._0_1, SingleStep.from(2, 2)],
        CompositeStep.fromIntervals(1, 2, 3).singleSteps,
    ];
    const applier = StepCombinationsApplier.create()
        .notes(...notes)
        .combinations(combinations);
    const actual = applier.apply().map(r => r.target);
    const expected = [
        [SPN.CC5, SPN.DD5, SPN.G5],
        [SPN.CC5, SPN.E5, SPN.A5],
        [SPN.CC5, SPN.FF5, SPN.AA5]
    ];

    expect(actual).toStrictEqual(expected);
})

it("overlapping discards", () => {
    const notes: SPNArray = [SPN.C5, SPN.E5, SPN.G5];
    const combinations = [
        CompositeStep.fromIntervals(5, 2, 3).singleSteps,
    ];
    const applier = StepCombinationsApplier.create()
        .notes(...notes)
        .combinations(combinations);
    const r = applier.apply();
    const actual: Target[] = r.map(r => r.target);
    const expected: Target[] = [];

    expect(actual).toStrictEqual(expected);
})

it("overlapping let", () => {
    const notes: SPNArray = [SPN.C5, SPN.E5, SPN.G5];
    const combinations = [
        CompositeStep.fromIntervals(5, 2, 3).singleSteps,
    ];
    const applier = StepCombinationsApplier.create()
        .notes(...notes)
        .letVoiceOverlapping()
        .combinations(combinations);
    const actual = applier.apply().map(r => r.target);
    const expected: SPNArray[] = [
        [SPN.F5, SPN.FF5, SPN.AA5]
    ];

    expect(actual).toStrictEqual(expected);
})

it("apply: without notes", () => {
    const applier = StepCombinationsApplier.create()
        .combinations([]);
    const t = () => applier.apply();
    expect(t).toThrow(Error);
})

it("near (2 steps) C5-E5-G5 in C", () => {
    const fromNotes: SPNArray = [SPN.C5, SPN.E5, SPN.G5];
    let nearMotion = NearStepsGen.create()
        .notesLength(fromNotes.length)
        .maxStep(2);
    let steps = nearMotion.generateSteps();
    let combinations = expandStepsArray(<StepArray>steps);
    let applier = StepCombinationsApplier.create()
        .notes(...fromNotes)
        .combinations(combinations);
    let actual: Target[] = applier.apply()
        .filter(result => Tonality.C.hasNotes(...<ChromaticArray>result.target.map(s => s?.degree || null)))
        .map(result => result.target);
    let expected: Target[] = [
        [SPN.B4, SPN.D5, SPN.F5],
        [SPN.B4, SPN.D5, SPN.A5],
        [SPN.B4, SPN.D5, SPN.G5],
        [SPN.B4, SPN.F5, SPN.A5],
        [SPN.B4, SPN.F5, SPN.G5],
        [SPN.B4, SPN.E5, SPN.F5],
        [SPN.B4, SPN.E5, SPN.A5],
        [SPN.B4, SPN.E5, SPN.G5],
        [SPN.D5, SPN.F5, SPN.A5],
        [SPN.D5, SPN.F5, SPN.G5],
        [SPN.D5, SPN.E5, SPN.F5],
        [SPN.D5, SPN.E5, SPN.A5],
        [SPN.D5, SPN.E5, SPN.G5],
        [SPN.C5, SPN.D5, SPN.F5],
        [SPN.C5, SPN.D5, SPN.A5],
        [SPN.C5, SPN.D5, SPN.G5],
        [SPN.C5, SPN.F5, SPN.A5],
        [SPN.C5, SPN.F5, SPN.G5],
        [SPN.C5, SPN.E5, SPN.F5],
        [SPN.C5, SPN.E5, SPN.A5],
    ];

    expect(new Set(actual)).toEqual(new Set(expected));
})