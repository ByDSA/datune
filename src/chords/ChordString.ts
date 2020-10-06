import { Degree } from '../degrees/Degree';
import { Chord } from './Chord';

export interface ChordString<C extends Chord<Degree, any>> {
    chord: C;
}