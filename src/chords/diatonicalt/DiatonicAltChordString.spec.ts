import { DiatonicAlt } from "../../degrees/DiatonicAlt";
import { Language } from "../../lang/Language";
import * as precalc from "../../precalc";
import { Settings } from "../../settings/Settings";
import { DiatonicAltChord } from "./DiatonicAltChord";
import { DiatonicAltChordString } from "./DiatonicAltChordString";

precalc.diatonicAltChords();
precalc.settings();

test('from - ENG - " c  " = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = " c  ";
    const chord = DiatonicAltChordString.from(str).chord;
    expect(chord).toBe(DiatonicAltChord.C);
});

test('from - ENG - "bb7" = C SEVENTH', async () => {
    Settings.lang = Language.ENG;
    let expected = DiatonicAltChord.from(
        [DiatonicAlt.Bb, DiatonicAlt.D, DiatonicAlt.F, DiatonicAlt.Ab]);
    const str = "bb7";
    const chord = DiatonicAltChordString.from(str).chord;
    expect(chord).toBe(expected);
});