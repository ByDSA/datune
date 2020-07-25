import { ChordString } from 'chords/ChordString';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { ParserBottomUp } from '../../Utils/Parser/Parser';
import { RootPatternChord } from '../root-pattern/RootPatternChord';
import { DiatonicAltChord } from './DiatonicAltChord';

export class DiatonicAltChordString implements ChordString<DiatonicAltChord> {
    private constructor(private strValue: string) {
    }

    public static from(strValue: string): DiatonicAltChordString {
        strValue = this.normalizeInputString(strValue);
        return new DiatonicAltChordString(strValue);
    }

    public get chord(): DiatonicAltChord {
        let ret: DiatonicAltChord = null;

        if (this.strValue.includes("/"))
            ret = DiatonicAltChordString.parsingInversion(this.strValue);
        else
            ret = DiatonicAltChordString.parsingNormal(this.strValue);

        if (ret)
            return ret;
        throw new Error("Can't get DiatonicAlt Chord from string: " + this.strValue);
    }

    private static parsingNormal(strValue: string): DiatonicAltChord {
        let parser = new ParserBottomUp()
            .from(strValue)
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

    private static parsingInversion(strValue: string): DiatonicAltChord {
        const strValueSplited: string[] = strValue.split("/");
        if (strValueSplited.length !== 2)
            return null;
        let baseChordStr, bassStr;
        [baseChordStr, bassStr] = strValueSplited;

        const baseChord: DiatonicAltChord = this.parsingNormal(baseChordStr);
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