import { Chromatic } from "../degrees/Chromatic";
import * as init from "../initializer";
import { ChromaticPattern } from "../patterns/ChromaticPattern";
import { RootPatternChord } from "./parametric/RootPatternChord";
import { ChromaticChord } from "./ChromaticChord";
init.chromaticPatterns.default();
init.chromaticChords.default();

describe('pattern', () => {
    it('C', () => {
        let chromaticChordPattern = ChromaticChord.C.pattern;
        expect(chromaticChordPattern).toBe(ChromaticPattern.TRIAD_MAJOR);
    });

    it('C/G', () => {
        const chord = ChromaticChord.C.withInv(2);
        let chromaticChordPattern = chord.pattern;
        let expected = ChromaticPattern.TRIAD_MAJOR.withInv(2);
        expect(chromaticChordPattern).toBe(expected);
    });

    it('C/E', () => {
        const chord = ChromaticChord.C.withInv();
        let chromaticChordPattern = chord.pattern;
        let expected = ChromaticPattern.TRIAD_MAJOR.withInv();
        expect(chromaticChordPattern).toBe(expected);
    });
})

describe('getShift', () => {
    it('C7 + 2 = D7', () => {
        let actual = ChromaticChord.C7.withShift(2);
        let expected = RootPatternChord.from(Chromatic.D, ChromaticPattern.SEVENTH).chord;
        expect(actual).toBe(expected);
    });

    it('C7 - 1 = B7', () => {
        let actual = ChromaticChord.C7.withShift(-1);
        let expected = RootPatternChord.from(Chromatic.B, ChromaticPattern.SEVENTH).chord;
        expect(actual).toBe(expected);
    });
})

test("Trying edit property notes", () => {
    let notes = ChromaticChord.C.notes;
    const t = () => {
        notes[0] = Chromatic.D;
    };
    expect(t).toThrow(TypeError);

})