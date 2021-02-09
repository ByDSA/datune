import { Chromatic, SymbolicDegree } from "../../../../../../pitches";
import { ChromaticPattern } from "../../../../../../voicings";
import { ChromaticArray, ChromaticChord } from "../../../ChromaticChord";

export class RootPatternBuilder {
    private constructor(private _root: Chromatic, private _pattern: ChromaticPattern) {
    }

    static from(root: Chromatic, pattern: ChromaticPattern): RootPatternBuilder {
        return new RootPatternBuilder(root, pattern);
    }

    build(): ChromaticChord {
        return this._buildChord();
    }

    private _buildNotes(): ChromaticArray {
        let notes: Chromatic[] = [];
        for (let semis of this.getPattern()) {
            let shifted: Chromatic = this._root.withShift(semis);
            notes.push(shifted);
        }

        return <ChromaticArray>notes;
    }

    private _buildChord(): ChromaticChord {
        let notes = this._buildNotes();
        return ChromaticChord.fromNotes(...notes);
    }

    /* Getters and setters */

    getRoot(): SymbolicDegree {
        return this._root;
    }

    getPattern(): ChromaticPattern {
        return this._pattern;
    }
}
