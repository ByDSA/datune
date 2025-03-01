import { SymbolicChord } from "@datune/core/chords/octave/SymbolicChord";
import { OctavePitch } from "@datune/core/pitches/OctavePitch";
import { Options } from "lang/Options";

export abstract class ChordStringAbstract<C extends SymbolicChord<OctavePitch>> {
    abstract parse(): C | null;

    protected constructor(protected strValue: string, protected options?: Options) {
    }

    protected abstract parsingNormal(): C | null;

    protected abstract parsingInversion(): C | null;
}
