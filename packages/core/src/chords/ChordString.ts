import { Degree } from '../degrees/Degree';
import { Chord } from './Chord';

export abstract class ChordString<C extends Chord<Degree, any>> {
    abstract parse(): C;

    protected constructor(protected strValue: string) {
    }

    protected abstract parsingNormal(): C;
    protected abstract parsingInversion(): C;
}