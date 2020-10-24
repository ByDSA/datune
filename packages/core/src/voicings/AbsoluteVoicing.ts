import { Degree } from '../degrees/Degree';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { SPN } from '../pitches/symbolic/SPN';
import { SymbolicPitch } from '../pitches/symbolic/SymbolicPitch';
import { Voicing } from './Voicing';

export type AbsoluteVoicing = SymbolicPitch[];

export function createAbsoluteVoicing<D extends Degree>(voicing: Voicing<D>, absoluteOctaveBase: number): AbsoluteVoicing {
    let absoluteVoices: SymbolicPitch[] = [];

    for (let relativeVoice of voicing) {
        let degree = relativeVoice.degree;
        let octave = absoluteOctaveBase + relativeVoice.octaveRelative;

        let symbolicPitch: SymbolicPitch;
        if (degree instanceof DiatonicAlt) {
            symbolicPitch = SPN.from(degree, octave);
        } else
            throw new Error();

        absoluteVoices.push(symbolicPitch);
    }
    return absoluteVoices;
}
