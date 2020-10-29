import { DiatonicAlt } from "../degrees/DiatonicAlt";
import * as init from "../initializer";
import { Language } from "../lang/Language";
import { Settings } from "../settings/Settings";
import { DiatonicAltChord, DiatonicAltChordString, getDiatonicAltChordFromString } from "./DiatonicAltChord";

init.diatonicAltChords.default();
init.settings.default();

test('from - ENG - " c  " = C MAJOR', async () => {
    Settings.lang = Language.ENG;
    const str = " c  ";
    const chord = DiatonicAltChordString.from(str).calculateChord();
    expect(chord).toBe(DiatonicAltChord.C);
});

test('from - undefined', async () => {
    Settings.lang = Language.ENG;
    const str = " hsfsdfsdc  ";
    const chord = getDiatonicAltChordFromString(str);
    expect(chord).toBeUndefined();
});

test('from - ENG - "bb7" = C SEVENTH', async () => {
    Settings.lang = Language.ENG;
    let expected = DiatonicAltChord.from(
        [DiatonicAlt.Bb, DiatonicAlt.D, DiatonicAlt.F, DiatonicAlt.Ab]);
    const str = "bb7";
    const chord = DiatonicAltChordString.from(str).calculateChord();
    expect(chord).toBe(expected);
});