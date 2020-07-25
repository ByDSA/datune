import { Chromatic } from '../../degrees/Chromatic';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { ParserBottomUp } from '../../Utils/Parser/Parser';
import { ChordString } from '../ChordString';
import { RootPatternChord } from '../root-pattern/RootPatternChord';
import { ChromaticChord } from './ChromaticChord';

export class ChromaticChordString implements ChordString<ChromaticChord> {
    private constructor(private strValue: string) {
    }

    public static from(strValue: string): ChromaticChordString {
        strValue = this.normalizeInputString(strValue);

        return new ChromaticChordString(strValue);
    }

    public get chord() {
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

        try {
            if (objects)
                return <ChromaticChord>RootPatternChord.from(objects[0], objects[1]).chord;
            else
                throw new Error("Can't get Chromatic Chord from string: " + this.strValue);
        } catch (e) {
            throw e;
        }
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }
}