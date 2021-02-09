import { Chromatic } from "pitches";
import { ChromaticPattern } from "voicings";
import { ChromaticChord } from "../../ChromaticChord";
import { ChromaticChordFinder } from "./ChromaticChordFinder";

it("contains= C, G. MaxLength=3. NotInversions", () => {
    let finder = new ChromaticChordFinder()
        .containsNote(Chromatic.C, Chromatic.G)
        .notInversions()
        .maxChordLength(3);

    let actual = finder.find();
    let expected = [
        ChromaticChord.C5,
        ChromaticChord.C,
        ChromaticChord.Cm,
        ChromaticChord.Csus4,
        ChromaticChord.Gsus4
    ];
    expect(actual).toEqual(expected);
})

it("contains= C, G. MaxLength=3", () => {
    let finder = new ChromaticChordFinder()
        .containsNote(Chromatic.C, Chromatic.G)
        .maxChordLength(3);

    let actual = finder.find();
    let expected = [
        ChromaticChord.C5,
        ChromaticChord.C5.withInv(),

        ChromaticChord.C,
        ChromaticChord.C.withInv(),
        ChromaticChord.C.withInv(2),

        ChromaticChord.Cm,
        ChromaticChord.Cm.withInv(),
        ChromaticChord.Cm.withInv(2),

        ChromaticChord.Csus4,
        ChromaticChord.Fsus2,
        ChromaticChord.fromRootPattern(Chromatic.G, ChromaticPattern.TRIAD_QUARTAL),

        ChromaticChord.Gsus4,
        ChromaticChord.Csus2,
        ChromaticChord.fromRootPattern(Chromatic.D, ChromaticPattern.TRIAD_QUARTAL),
    ];
    expect(actual).toEqual(expected);
})

it("contains= C, G. MaxLength=3. Root=C", () => {
    let finder = new ChromaticChordFinder()
        .containsNote(Chromatic.C, Chromatic.G)
        .maxChordLength(3)
        .bass(Chromatic.C);

    let actual = finder.find();
    let expected = [
        ChromaticChord.C5,
        ChromaticChord.C,
        ChromaticChord.Cm,
        ChromaticChord.Csus4,
        ChromaticChord.Csus2,
    ];
    expect(actual).toEqual(expected);
})