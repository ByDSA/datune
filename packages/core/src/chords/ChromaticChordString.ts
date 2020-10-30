import { ParserBottomUp } from '@datune/utils/parser/Parser';
import { Chromatic } from '../degrees/Chromatic';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { ChordString } from './ChordString';
import { ChromaticChord } from './ChromaticChord';
import { RootPatternChord } from './parametric/RootPatternChord';

export class ChromaticChordString extends ChordString<ChromaticChord> {
    private constructor(strValue: string) {
        super(strValue);
    }

    static from(strValue: string): ChromaticChordString {
        strValue = this.normalizeInputString(strValue);
        return new ChromaticChordString(strValue);
    }

    parse(): ChromaticChord | undefined {
        let ret: ChromaticChord;

        if (this.strValue.includes("/"))
            ret = this.parsingInversion();
        else
            ret = this.parsingNormal();

        return ret;
    }

    protected parsingNormal(): ChromaticChord {
        let parser = new ParserBottomUp()
            .from(this.strValue)
            .expected([Chromatic.name, ChromaticPattern.name])
            .add(Chromatic.name, function (str: string): Chromatic {
                return Chromatic.fromString(str);
            })
            .add(ChromaticPattern.name, function (str: string): ChromaticPattern {
                return ChromaticPattern.fromString(str);
            });

        let objects = parser.parse();

        if (objects)
            return <ChromaticChord>RootPatternChord.from(objects[0], objects[1]).chord;
    }

    protected parsingInversion(): ChromaticChord {
        const strValueSplited: string[] = this.strValue.split("/");
        if (strValueSplited.length !== 2)
            return null;
        let baseChordStr, bassStr;
        [baseChordStr, bassStr] = strValueSplited;

        const baseChord: ChromaticChord = ChromaticChordString.from(baseChordStr).parse();
        const bass: Chromatic = Chromatic.fromString(bassStr);

        if (!baseChord || !bass)
            return null;

        return baseChord.withBass(bass);
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }
}

export function fromString(str: string): ChromaticChord | undefined {
    return ChromaticChordString.from(str).parse();
}