import { Degree } from '../degrees/Degree';
import { DegreePattern } from '../patterns/DegreePattern';

export interface Chord<D extends Degree, I> {
    pattern: DegreePattern<D, I>
    rootIndex: number;
    notes: D[];
    inversionNumber: number;
    root: D;
    withInv(n: number): Chord<D, I>;
}