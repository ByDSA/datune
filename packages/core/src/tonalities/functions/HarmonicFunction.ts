import { Chord, ChordAlt } from '../../chords';
import { TonalityAlt } from '../alt/TonalityAlt';
import { Tonality } from '../chromatic/Tonality';

export abstract class HarmonicFunction {
    private static functionCache = new Map<string, Chord>();
    private static functionCacheAlt = new Map<string, ChordAlt>();

    getChordAlt(tonalityAlt: TonalityAlt): ChordAlt {
        let hashCode = tonalityAlt + " " + this.toString();
        let chordAlt = HarmonicFunction.functionCacheAlt.get(hashCode);
        if (chordAlt === undefined) {
            chordAlt = this.calculateChordAlt(tonalityAlt);
            HarmonicFunction.functionCacheAlt.set(hashCode, chordAlt);
        }
        return chordAlt;
    }

    getChord(tonality: Tonality): Chord {
        let hashCode = tonality + " " + this.toString();
        let chord = HarmonicFunction.functionCache.get(hashCode);
        if (chord === undefined) {
            chord = this.calculateChord(tonality);
            HarmonicFunction.functionCache.set(hashCode, chord);
        }
        return chord;
    }

    protected abstract calculateChordAlt(tonality: TonalityAlt): ChordAlt;
    protected abstract calculateChord(tonality: Tonality): Chord;
}