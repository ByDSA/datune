import { Language, Settings } from "config";
import { ChromaticChord } from "../../ChromaticChord";
import { ChromaticChordString } from "./ChromaticChordString";

describe.each([
    [Language.ENG, "b", ChromaticChord.B],
    [Language.ENG, " c  ", ChromaticChord.C],
    [Language.ESP, " do  ", ChromaticChord.C],
    [Language.ENG, "c7", ChromaticChord.C7],
    [Language.ESP, "do7", ChromaticChord.C7],
    [Language.ENG, "BMaj7", ChromaticChord.BMaj7],
    [Language.ESP, "siMaj7", ChromaticChord.BMaj7],
    [Language.ENG, "B7", ChromaticChord.B7],
    [Language.ESP, "Si7", ChromaticChord.B7],
    [Language.ENG, "b7", ChromaticChord.B7],
    [Language.ESP, "si7", ChromaticChord.B7],
    [Language.ENG, "a7", ChromaticChord.A7],
    [Language.ESP, "la7", ChromaticChord.A7],
]
)('from', (lang, str, expected) => {
    test(`${lang.id} - "${str}" => ${expected}`, async () => {
        Settings.lang = lang;
        const chordString = ChromaticChordString.from(str);
        const chord = chordString.parse();
        expect(chord).toBe(expected);
    });
});

test('from - null', async () => {
    Settings.lang = Language.ENG;
    const str = " hsfsdfsdc  ";
    const chord = ChromaticChordString.from(str).parse();
    expect(chord).toBeNull();
});