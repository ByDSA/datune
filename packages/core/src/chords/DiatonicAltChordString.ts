import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { ParserBottomUp } from '@datune/utils/parser/Parser';
import { ChordString } from './ChordString';
import { DiatonicAltChord } from './DiatonicAltChord';
import { RootPatternChord } from './parametric/RootPatternChord';

export class DiatonicAltChordString extends ChordString<DiatonicAltChord> {
    private constructor(strValue: string) {
        super(strValue)
    }

    static from(strValue: string): DiatonicAltChordString {
        strValue = this.normalizeInputString(strValue);
        return new DiatonicAltChordString(strValue);
    }

    parse(): DiatonicAltChord | undefined {
        let ret: DiatonicAltChord;

        if (this.strValue.includes("/"))
            ret = this.parsingInversion();
        else
            ret = this.parsingNormal();

        return ret;
    }

    protected parsingNormal(): DiatonicAltChord {
        let parser = new ParserBottomUp()
            .from(this.strValue)
            .expected([DiatonicAlt.name, DiatonicAltPattern.name])
            .add(DiatonicAlt.name, function (str: string): DiatonicAlt {
                return DiatonicAlt.fromString(str);
            })
            .add(DiatonicAltPattern.name, function (str: string): DiatonicAltPattern {
                return DiatonicAltPattern.fromString(str);
            });

        let objects = parser.parse();

        if (objects)
            return <DiatonicAltChord>RootPatternChord.from(objects[0], objects[1]).chord;
    }

    protected parsingInversion(): DiatonicAltChord {
        const strValueSplited: string[] = this.strValue.split("/");
        if (strValueSplited.length !== 2)
            return null;
        let baseChordStr, bassStr;
        [baseChordStr, bassStr] = strValueSplited;

        const baseChord: DiatonicAltChord = DiatonicAltChordString.from(baseChordStr).parse();
        const bass: DiatonicAlt = DiatonicAlt.fromString(bassStr);

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

export function fromString(str: string): DiatonicAltChord | undefined {
    return DiatonicAltChordString.from(str).parse();
}