import { DiatonicAltChord } from '../../chords/DiatonicAltChord';
import { Tonality } from '../Tonality';
import { FunctionalChord } from '../../chords/parametric/FunctionalChord';

export abstract class HarmonicFunction {
    private static functionCache = new Map<string, DiatonicAltChord>();

    getChord(tonality: Tonality): DiatonicAltChord | null {
        let functionalChord: FunctionalChord = FunctionalChord.from(tonality, this);
        let functionalChordHashCode = functionalChord.hashCode();
        let diatonicAltChord = HarmonicFunction.functionCache.get(functionalChordHashCode);
        if (diatonicAltChord == undefined) {
            diatonicAltChord = this.calculateChord(tonality);
            HarmonicFunction.functionCache.set(functionalChordHashCode, diatonicAltChord);
        }
        return diatonicAltChord;
    }

    protected abstract calculateChord(tonality: Tonality): DiatonicAltChord | null;

    abstract hashCode(): string;
}