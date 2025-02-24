/* eslint-disable no-empty-function */

import SymbolicChord from "@datune/core/chords/octave/SymbolicChord";
import Options from "lang/Options";
import OctavePitch from "@datune/core/pitches/OctavePitch";

export default abstract class ChordStringAbstract<C extends SymbolicChord<OctavePitch>> {
    abstract parse(): C | null;

    // eslint-disable-next-line no-useless-constructor
    protected constructor(protected strValue: string, protected options?: Options) {
    }

    protected abstract parsingNormal(): C | null;

    protected abstract parsingInversion(): C | null;
}
