import { Chromatic } from '../degrees/Chromatic';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { ParserBottomUp } from '../Utils/Parser/Parser';
import { RootPatternChord } from './parametric/RootPatternChord';
import { ChromaticChord } from './ChromaticChord';
import { ChordString } from './ChordString';

export class ChromaticChordString implements ChordString<ChromaticChord> {
    private constructor(private strValue: string) {
    }

    static from(strValue: string): ChromaticChordString {
        strValue = this.normalizeInputString(strValue);

        return new ChromaticChordString(strValue);
    }

    get chord(): ChromaticChord | undefined {
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
        else
            return undefined;
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }
}

export function fromString(str: string): ChromaticChord | undefined {
    return ChromaticChordString.from(str).chord;
}