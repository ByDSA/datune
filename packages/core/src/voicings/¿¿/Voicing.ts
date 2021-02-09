import { SymbolicDegree } from '../../pitches';
import { RelativePitch } from './RelativePitch';

export type Voicing<D extends SymbolicDegree> = RelativePitch<D>[];