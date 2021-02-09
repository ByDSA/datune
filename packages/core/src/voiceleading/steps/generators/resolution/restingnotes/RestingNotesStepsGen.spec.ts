import { SPNArray } from "../../../../../chords";
import { ChromaticArray } from "../../../../../chords/octave/chromatic/ChromaticChord";
import { SPN } from "../../../../../pitches";
import { Tonality } from "../../../../../tonalities";
import { SingleStep } from "../../../single/SingleStep";
import { RestingNotesStepsGen } from "./RestingNotesStepsGen";

it("B4 in Key=C (root=3)", () => {
    const notes: SPNArray = [SPN.B4];
    let solver = RestingNotesStepsGen.create()
        .notes(...notes)
        .restingNotes(...<ChromaticArray>Tonality.C.rootChord3?.notes);
    let actual = solver.generateSteps();
    let expected = [
        SingleStep.from(0, 1),
    ];

    expect(actual).toStrictEqual(expected);
})

it("D5 in Key=C (root=3)", () => {
    const notes: SPNArray = [SPN.D5];
    let solver = RestingNotesStepsGen.create()
        .notes(...notes)
        .restingNotes(...<ChromaticArray>Tonality.C.rootChord3?.notes);
    let actual = solver.generateSteps();
    let expected = [
        SingleStep.from(0, 2),
        SingleStep.from(0, -2),
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("C5 in Key=C (root=3)", () => {
    const notes: SPNArray = [SPN.C5];
    let solver = RestingNotesStepsGen.create()
        .notes(...notes)
        .restingNotes(...<ChromaticArray>Tonality.C.rootChord3?.notes);
    let actual = solver.generateSteps();
    let expected = [
        SingleStep.from(0, 0),
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("C5 in Key=C (root=4)", () => {
    const notes: SPNArray = [SPN.C5];
    let solver = RestingNotesStepsGen.create()
        .notes(...notes)
        .restingNotes(...<ChromaticArray>Tonality.C.rootChord4?.notes);
    let actual = solver.generateSteps();
    let expected = [
        SingleStep.from(0, -1),
        SingleStep.from(0, 0),
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})

it("D5 in Key=C (root=4, maxStep=3)", () => {
    const notes: SPNArray = [SPN.D5];
    let solver = RestingNotesStepsGen.create()
        .notes(...notes)
        .maxStep(3)
        .restingNotes(...<ChromaticArray>Tonality.C.rootChord4?.notes);
    let actual = solver.generateSteps();
    let expected = [
        SingleStep.from(0, -3),
        SingleStep.from(0, -2),
        SingleStep.from(0, 2),
    ];

    expect(actual.sort()).toStrictEqual(expected.sort());
})