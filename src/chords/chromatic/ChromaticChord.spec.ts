import { Chromatic } from "../../degrees/Chromatic";
import { ChromaticPattern } from "../../patterns/ChromaticPattern";
import * as precalc from "../../precalc";
import { RootPatternChord } from "../root-pattern/RootPatternChord";
import { ChromaticChord } from "./ChromaticChord";
precalc.chromaticPatterns();
precalc.chromaticChords();

describe('pattern', () => {
    it('C', () => {
        let chromaticChordPattern = ChromaticChord.C.pattern;
        expect(chromaticChordPattern).toBe(ChromaticPattern.TRIAD_MAJOR);
    });

    it('C/G', () => {
        let chromaticChordPattern = ChromaticChord.C.withInv(2).pattern;
        let expected = ChromaticPattern.TRIAD_MAJOR.withInv(2);
        expect(chromaticChordPattern).toBe(expected);
    });

    it('C/E', () => {
        let chromaticChordPattern = ChromaticChord.C.withInv().pattern;
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