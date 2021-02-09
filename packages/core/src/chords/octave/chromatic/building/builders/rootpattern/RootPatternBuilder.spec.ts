import { Chromatic } from "../../../../../../pitches";
import { ChromaticPattern } from "../../../../../../voicings";
import { ChromaticChord } from "../../../ChromaticChord";
import { RootPatternBuilder } from "./RootPatternBuilder";

describe.each([
    [Chromatic.C, ChromaticPattern.TRIAD_MAJOR, ChromaticChord.C],
])("from Chromatic", (degree, pattern, expected) => {
    it(`(${degree}, ${pattern}) => ${expected}`, async () => {
        const builder = RootPatternBuilder.from(degree, pattern);
        expect(builder.getRoot()).toBe(degree);
        expect(builder.getPattern()).toBe(pattern);

        const diatonicAltChord = builder.build();
        expect(diatonicAltChord).toBe(expected);
    })
})

describe.each([
    [Chromatic.C, ChromaticPattern.TRIAD_MAJOR],
    [Chromatic.C, ChromaticPattern.SEVENTH],
    [Chromatic.A, ChromaticPattern.TRIAD_MINOR],
    [Chromatic.C, ChromaticPattern.SEVENTH_MAJ7],
    [Chromatic.C, ChromaticPattern.NINTH],
])("Chromatic = chord.root + Pattern = chord.pattern", (degree, pattern) => {
    it(`root=${degree}, pattern=${pattern}`, async () => {
        const chord = RootPatternBuilder.from(degree, pattern)
            .build();
        expect(chord.root).toBe(degree);
        expect(chord.pattern).toBe(pattern);
    })
})