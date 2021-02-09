
import { SymbolicDegree } from '../../pitches';
import { SymbolicChord } from './SymbolicChord';

export abstract class ChordStringAbstract<C extends SymbolicChord<SymbolicDegree, any, any>> {
    abstract parse(): C | null;

    protected constructor(protected strValue: string) {
    }

    protected abstract parsingNormal(): C | null;
    protected abstract parsingInversion(): C | null;
}