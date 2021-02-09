import { ParserBottomUp } from '@datune/utils';
import { DiatonicAlt } from '../../../../../pitches';
import { DiatonicAltPattern, normalizeInputString } from '../../../../../voicings';
import { ChordStringAbstract } from '../../../../octave/ChordStringAbstract';
import { ChordAlt } from '../../ChordAlt';
import { RootPatternAltBuilder } from '../builders/rootpattern/RootPatternAltBuilder';

export class ChordAltString extends ChordStringAbstract<ChordAlt> {
    private constructor(strValue: string) {
        super(strValue)
    }

    static from(strValue: string): ChordAltString {
        strValue = normalizeInputString(strValue);
        return new ChordAltString(strValue);
    }

    parse(): ChordAlt | null {
        let ret: ChordAlt | null;

        if (this.strValue.includes("/"))
            ret = this.parsingInversion();
        else
            ret = this.parsingNormal();

        return ret;
    }

    protected parsingNormal(): ChordAlt | null {
        let parser = new ParserBottomUp()
            .from(this.strValue)
            .expected([DiatonicAlt.name, DiatonicAltPattern.name])
            .add(DiatonicAlt.name, (str: string): DiatonicAlt | null => DiatonicAlt.fromString(str))
            .add(DiatonicAltPattern.name, (str: string): DiatonicAltPattern | null => DiatonicAltPattern.fromString(str));

        let objects = parser.parse();

        if (objects)
            return RootPatternAltBuilder
                .from(objects[0], objects[1])
                .build();

        return null;
    }

    protected parsingInversion(): ChordAlt | null {
        const strValueSplited: string[] = this.strValue.split("/");
        if (strValueSplited.length !== 2)
            return null;
        let baseChordStr, bassStr;
        [baseChordStr, bassStr] = strValueSplited;

        const baseChord: ChordAlt | null = ChordAltString.from(baseChordStr).parse();
        const bass: DiatonicAlt | null = DiatonicAlt.fromString(bassStr);

        if (!baseChord || !bass)
            return null;

        return baseChord.withBass(bass);
    }
}