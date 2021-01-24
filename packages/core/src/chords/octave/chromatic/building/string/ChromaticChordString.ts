import { ParserBottomUp } from '@datune/utils';
import { Chromatic } from '../../../../../pitches';
import { ChromaticPattern, normalizeInputString } from '../../../../../voicings';
import { ChordStringAbstract } from '../../../../octave/ChordStringAbstract';
import { ChromaticChord } from '../../ChromaticChord';

export class ChromaticChordString extends ChordStringAbstract<ChromaticChord> {
    private constructor(strValue: string) {
        super(strValue);
    }

    static from(strValue: string): ChromaticChordString {
        strValue = normalizeInputString(strValue);
        return new ChromaticChordString(strValue);
    }

    parse(): ChromaticChord | null {
        let ret: ChromaticChord | null;

        if (this.strValue.includes("/"))
            ret = this.parsingInversion();
        else
            ret = this.parsingNormal();

        return ret;
    }

    protected parsingNormal(): ChromaticChord | null {
        let parser = new ParserBottomUp()
            .from(this.strValue)
            .expected([Chromatic.name, ChromaticPattern.name])
            .add(Chromatic.name, (str: string): Chromatic | null => Chromatic.fromString(str))
            .add(ChromaticPattern.name, (str: string): ChromaticPattern | null => ChromaticPattern.fromString(str));

        let objects = parser.parse();

        if (objects)
            return ChromaticChord.fromRootPattern(objects[0], objects[1]);

        return null;
    }

    protected parsingInversion(): ChromaticChord | null {
        const strValueSplited: string[] = this.strValue.split("/");
        if (strValueSplited.length !== 2)
            return null;
        let baseChordStr, bassStr;
        [baseChordStr, bassStr] = strValueSplited;

        const baseChord: ChromaticChord | null = ChromaticChordString.from(baseChordStr).parse();
        const bass: Chromatic | null = Chromatic.fromString(bassStr);

        if (!baseChord || !bass)
            return null;

        return baseChord.withBass(bass);
    }
}

