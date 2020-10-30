import * as init from "../initializer";
import { Language } from "../lang/Language";
import { Settings } from "../settings/Settings";
import { ChromaticChord, ChromaticChordString, getChromaticChordFromString } from "./ChromaticChord";
init.chromaticPatterns.default();
init.chromaticChords.default();
init.settings.default();

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
        const chromaticChord = chromaticChordString.parse();
        expect(chromaticChord).toBe(expected);
    });
});

test('from - undefined', async () => {
    Settings.lang = Language.ENG;
    const str = " hsfsdfsdc  ";
    const chord = getChromaticChordFromString(str);
    expect(chord).toBeUndefined();
});