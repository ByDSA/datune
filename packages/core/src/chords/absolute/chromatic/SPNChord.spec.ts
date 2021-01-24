import { SPN } from "pitches";
import { ChromaticPattern } from "voicings";
import { SPNArray, SPNChord } from "./SPNChord";

// test('CLOSED - G E C, o = 5', () => {
//     let degrees = [DiatonicAlt.G, DiatonicAlt.E, DiatonicAlt.C];
//     let voicing = VoicingGenerator.CLOSED.make(degrees);
//     let actual: SPNChord = createAbsoluteVoicing(voicing, 5);

//     expect(actual.length).toEqual(3);
//     expect(actual[0].degree).toEqual(DiatonicAlt.C);
//     expect(actual[0].octave).toEqual(5);
//     expect(actual[1].degree).toEqual(DiatonicAlt.E);
//     expect(actual[1].octave).toEqual(5);
//     expect(actual[2].degree).toEqual(DiatonicAlt.G);
//     expect(actual[2].octave).toEqual(5);
// })

// test('CLOSED UNSORTED - G E C, o = 5', () => {
//     let degrees = [DiatonicAlt.G, DiatonicAlt.E, DiatonicAlt.C];
//     let voicing = VoicingGenerator.CLOSED_UNSORTED.make(degrees);
//     let actual: SPNChord = createAbsoluteVoicing(voicing, 5);

//     expect(actual.length).toEqual(3);
//     expect(actual[0].degree).toEqual(DiatonicAlt.G);
//     expect(actual[0].octave).toEqual(5);
//     expect(actual[1].degree).toEqual(DiatonicAlt.E);
//     expect(actual[1].octave).toEqual(6);
//     expect(actual[2].degree).toEqual(DiatonicAlt.C);
//     expect(actual[2].octave).toEqual(7);
// })

it("cache", () => {
    let notes: SPNArray = [SPN.C4, SPN.E4, SPN.G4];
    let actual = SPNChord.fromNotes(...notes);
    let actual2 = SPNChord.fromNotes(...notes);

    expect(actual).toBe(actual2);
})

it("fromNotes - notes", () => {
    let notes: SPNArray = [SPN.C4, SPN.E4, SPN.G4];
    let actual = SPNChord.fromNotes(...notes);

    expect(actual.notes).toStrictEqual(notes);
})

it("fromNotes - pattern", () => {
    let actual = SPNChord.fromNotes(SPN.D4, SPN.F4, SPN.A4);
    let expected = ChromaticPattern.TRIAD_MINOR;

    expect(actual.pattern).toBe(expected);
})