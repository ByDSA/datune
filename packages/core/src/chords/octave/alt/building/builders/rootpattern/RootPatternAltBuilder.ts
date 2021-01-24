import { DiatonicAlt } from "../../../../../../pitches";
import { DiatonicAltPattern } from "../../../../../../voicings";
import { ChordAlt, DiatonicAltArray } from "../../../ChordAlt";

export class RootPatternAltBuilder {
    private constructor(private _root: DiatonicAlt, private _pattern: DiatonicAltPattern) {
    }

    static from(root: DiatonicAlt, pattern: DiatonicAltPattern): RootPatternAltBuilder {
        return new RootPatternAltBuilder(root, pattern);
    }

    build(): ChordAlt {
        return this._buildChord();
    }

    private _buildDiatonicAlts(): DiatonicAltArray {
        let noteAlts: DiatonicAlt[] = [];
        for (let semis of this.pattern) {
            let shiftedDiatonicAlt: DiatonicAlt = this.root.withAdd(semis);
            noteAlts.push(shiftedDiatonicAlt);
        }

        return <DiatonicAltArray>noteAlts;
    }

    private _buildChord(): ChordAlt {
        let notes = this._buildDiatonicAlts();
        return ChordAlt.fromNotes(...notes);
    }

    /* Getters and setters */

    get root(): DiatonicAlt {
        return this._root;
    }

    get pattern(): DiatonicAltPattern {
        return this._pattern;
    }
}
