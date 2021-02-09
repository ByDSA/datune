import { Chord, SPNArray } from "../../../../chords";
import { ChromaticArray } from "../../../../chords/octave/chromatic/ChromaticChord";
import { Chromatic, SPN } from "../../../../pitches";
import { Tonality } from "../../../../tonalities";
import { ChromaticPattern, ChromaticPatternArray } from "../../../../voicings/relative/chromatic/ChromaticPattern";
import { MotionCreator } from "./MotionCreator";
import { transformToChordsRootPosition, transformToSPNArray } from "./result/MotionCreatorResultTransforms";

it("C near Key.C", () => {
    const fromNotes: SPNArray = [SPN.C5, SPN.E5, SPN.G5];
    const patterns = <ChromaticPatternArray>[
        ...ChromaticPattern.TRIAD_MAJOR.getAllInversions(),
        ...ChromaticPattern.TRIAD_MINOR.getAllInversions(),
        ChromaticPattern.TRIAD_DIMINISHED
    ];
    const resolution = MotionCreator.create()
        .fromNotes(...fromNotes)
        .configApplier(applier => applier.letVoiceOverlapping())
        .filterByPatterns(...patterns)
        .keysAll(Tonality.C);
    const motionCreatorResults = resolution.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.Dm,
        Chord.Em,
        Chord.F,
        Chord.G,
        Chord.Am,
        Chord.B0,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Csus4 resolution", () => {
    const fromNotes: SPNArray = [SPN.C5, SPN.F5, SPN.G5];
    const resolution = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requirePatternResolution()
        .filterByPatterns(...ChromaticPattern.sets.triadsMajorMinor);
    const motionCreatorResults = resolution.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.C,
        Chord.Cm,
        Chord.CC,
        Chord.Dm,
        Chord.DD,
        Chord.Em,
        Chord.F,
        Chord.Fm,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Csus4 resolution in C", () => {
    const fromNotes: SPNArray = [SPN.C5, SPN.F5, SPN.G5];
    const resolution = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requirePatternResolution()
        .filterByPatterns(...ChromaticPattern.sets.commonTriads)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = resolution.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.C,
        Chord.Dm,
        Chord.Em,
        Chord.F
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Bº resolution", () => {
    const fromNotes: SPNArray = [SPN.B4, SPN.D5, SPN.F5];
    const patterns: ChromaticPatternArray = <ChromaticPatternArray>[
        ...ChromaticPattern.TRIAD_MAJOR.getAllInversions(),
        ...ChromaticPattern.TRIAD_MINOR.getAllInversions()
    ]
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .maxStep(3)
        .requirePatternResolution()
        .filterByPatterns(...patterns);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.Cm,
        Chord.C,
        Chord.FF,
        Chord.DDm,
        Chord.DD,
        Chord.Gm,
        Chord.FFm,
        Chord.D,
        Chord.Am,
        Chord.A,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("C+ resolution", () => {
    const fromNotes: SPNArray = [SPN.C5, SPN.E5, SPN.GG5];
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requirePatternResolution()
        .filterByPatterns(...ChromaticPattern.sets.triadsMajorMinor);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.A,
        Chord.Am,
        Chord.AA,
        Chord.AAm,
        Chord.B,
        Chord.Bm,
        Chord.C,
        Chord.Cm,
        Chord.CC,
        Chord.CCm,
        Chord.D,
        Chord.Dm,
        Chord.DD,
        Chord.DDm,
        Chord.E,
        Chord.Em,
        Chord.F,
        Chord.Fm,
        Chord.FF,
        Chord.FFm,
        Chord.G,
        Chord.Gm,
        Chord.GG,
        Chord.GGm,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Bº resolution in Key C", () => {
    const fromNotes: SPNArray = [SPN.B4, SPN.D5, SPN.F5];
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requirePatternResolution()
        .filterByAnyKeys(Tonality.C)
        .filterByPatterns(...ChromaticPattern.sets.commonTriads);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.C,
        Chord.Am,
        Chord.Csus2,
        Chord.Asus4,
        Chord.Gsus2.withInv(), // Aquartal
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Dm resolution in Key C (resting=root3)", () => {
    const fromNotes: SPNArray = [SPN.D5, SPN.F5, SPN.A5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord3?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByPatterns(...ChromaticPattern.sets.commonTriads)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.Am,
        Chord.C,
        Chord.Csus4,
        Chord.Dsus2,
        Chord.Dsus4,
        Chord.Em,
        Chord.F,
        Chord.G,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("D5 note resolution in Key C (resting=root3)", () => {
    const fromNotes: SPNArray = [SPN.D5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord3?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
    const expected: SPN[][] = [
        [SPN.E5],
        [SPN.C5],
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("C5 note resolution in Key C (resting=root4)", () => {
    const fromNotes: SPNArray = [SPN.C5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord4?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
    const expected: SPN[][] = [
        [SPN.B4],
    ].sort();
    expect(actual.sort()).toEqual(expected.sort());
})

it("D5 note resolution in Key C (resting=root4, maxStep=3)", () => {
    const fromNotes: SPNArray = [SPN.D5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord4?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .maxStep(3)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: SPN[][] = transformToSPNArray(motionCreatorResults).sort();
    const expected: SPN[][] = [
        [SPN.E5],
        [SPN.C5],
        [SPN.B4],
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Dm resolution in Key C (resting=root3)", () => {
    const fromNotes: SPNArray = [SPN.D5, SPN.F5, SPN.A5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord3?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByPatterns(...ChromaticPattern.sets.triadsMajorMinor)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.C,
        Chord.Am,
        Chord.F,
        Chord.G,
        Chord.Em,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Dm resolution in Key C (resting=root4)", () => {
    const fromNotes: SPNArray = [SPN.D5, SPN.F5, SPN.A5];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord4?.notes;
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByPatterns(...ChromaticPattern.sets.triadsMajorMinor)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.C,
        Chord.Am,
        Chord.F,
        Chord.G,
        Chord.Em,
    ];
    expect(actual.sort()).toEqual(expected.sort());
})

it("Dm7 resolution in Key C (resting=root4)", () => {
    const fromNotes: SPNArray = [SPN.D5, SPN.F5, SPN.A5, SPN.C6];
    const restingNotes: ChromaticArray = <ChromaticArray>Tonality.C.rootChord4?.notes;
    const patterns: ChromaticPatternArray = <ChromaticPatternArray>[
        ...ChromaticPattern.SEVENTH.getAllInversions(),
        ...ChromaticPattern.SEVENTH_SUS4.getAllInversions(),
        ...ChromaticPattern.SEVENTH_MINOR.getAllInversions(),
        ...ChromaticPattern.SEVENTH_MINOR_b5.getAllInversions(),
        ...ChromaticPattern.SEVENTH_MAJ7.getAllInversions(),
        ...ChromaticPattern.SEVENTH_MAJ7_b5.getAllInversions(),
        ...ChromaticPattern.SEVENTH_MINOR_a5.getAllInversions()
    ];
    const motionCreator = MotionCreator.create()
        .fromNotes(...fromNotes)
        .requireRestingResolution()
        .restingNotes(...restingNotes)
        .filterByPatterns(...patterns)
        .filterByAnyKeys(Tonality.C);
    const motionCreatorResults = motionCreator.calc();
    const actual: Chord[] = transformToChordsRootPosition(motionCreatorResults);
    const expected: Chord[] = [
        Chord.CMaj7,
        Chord.Am7,
        Chord.FMaj7,
        Chord.Em7,
        Chord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH_SUS4),
        Chord.fromRootPattern(Chromatic.B, ChromaticPattern.SEVENTH_MINOR_a5).withInv(), // D6sus4
        Chord.G7,
        Chord.fromRootPattern(Chromatic.D, ChromaticPattern.SIXTH_MINOR), // Bm7b5/D
        Chord.fromRootPattern(Chromatic.A, ChromaticPattern.SEVENTH_SUS4),
        Chord.fromRootPattern(Chromatic.F, ChromaticPattern.SEVENTH_MAJ7_b5),
        Chord.fromRootPattern(Chromatic.E, ChromaticPattern.SEVENTH_MINOR_a5),
        Chord.fromRootPattern(Chromatic.D, ChromaticPattern.SEVENTH_SUS4),
        Chord.fromRootPattern(Chromatic.G, ChromaticPattern.SEVENTH_SUS4),
    ];
    expect(actual.sort()).toEqual(expected.sort());
})