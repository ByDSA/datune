import { TonalityFunctionBuilder } from '../../chords/builders/TonalityFunctionBuilder';
import { DiatonicAltChord } from '../../chords/DiatonicAltChord';
import { Tonality } from '../Tonality';

export abstract class HarmonicFunction {
    private static functionCache = new Map<string, DiatonicAltChord>();

    getChord(tonality: Tonality): DiatonicAltChord | null {
        let builder: TonalityFunctionBuilder = TonalityFunctionBuilder.create()
            .setTonality(tonality)
            .setFunction(this);
        let hashCode = builder.hashCode();
        let diatonicAltChord = HarmonicFunction.functionCache.get(hashCode);
        if (diatonicAltChord == undefined) {
            diatonicAltChord = this.calculateChord(tonality);
            HarmonicFunction.functionCache.set(hashCode, diatonicAltChord);
        }
        return diatonicAltChord;
    }

    protected abstract calculateChord(tonality: Tonality): DiatonicAltChord | null;

    abstract hashCode(): string;
}