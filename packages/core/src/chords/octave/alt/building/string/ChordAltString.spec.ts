import { Language, Settings } from "config";
import { DiatonicAlt } from "pitches";
import { ChordAlt } from "../../ChordAlt";
import { ChordAltString } from "./ChordAltString";

it('from - ENG - " c  " = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = " c  ";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.C);
})

it('from - ENG - "C" = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = "C";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.C);
})

it('from - ENG - "c" = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = "c";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.C);
})

it('from - ENG - "cmaj7" = CMaj7', async () => {
    Settings.lang = Language.ENG;
    const str = "cmaj7";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.CMaj7);
})

it('from - ENG - "A7" = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = "a7";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.A7);
})

it('from - ENG - "B7" = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = "b7";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.B7);
})

it('from - null', async () => {
    Settings.lang = Language.ENG;
    const str = " hsfsdfsdc  ";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBeNull();
})

it('from - ENG - "bb7" = C SEVENTH', async () => {
    Settings.lang = Language.ENG;
    let expected = ChordAlt.fromNotes(
        DiatonicAlt.Bb, DiatonicAlt.D, DiatonicAlt.F, DiatonicAlt.Ab);
    const str = "bb7";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(expected);
})

it('from - ENG - "Dm7" = D MINOR MAJ7', async () => {
    Settings.lang = Language.ENG;
    const str = "Dm7";
    const chord = ChordAltString.from(str).parse();
    expect(chord).toBe(ChordAlt.Dm7);
})