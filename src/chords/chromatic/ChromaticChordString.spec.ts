import { Language } from "../../lang/Language";
import * as precalc from "../../precalc";
import { Settings } from "../../settings/Settings";
import { ChromaticChord } from "./ChromaticChord";
import { ChromaticChordString } from "./ChromaticChordString";
precalc.chromaticPatterns();
precalc.chromaticChords();
precalc.settings();

describe.each([
    [Language.ENG, " c  ", ChromaticChord.C],
    [Language.ESP, " do  ", ChromaticChord.C],
    [Language.ENG, "c7", ChromaticChord.C7],
    [Language.ESP, "do7", ChromaticChord.C7],
]
)('from', (lang, str, expected) => {
    test(`${lang.id} - "${str}" => ${expected}`, async () => {
        Settings.lang = lang;
        const chromaticChordString = ChromaticChordString.from(str);
        const chromaticChord = chromaticChordString.chord;
        expect(chromaticChord).toBe(expected);
    });
});