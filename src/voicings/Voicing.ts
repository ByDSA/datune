import { Degree } from 'degrees/Degree';
import { RelativePitch } from './RelativePitch';

export type Voicing<D extends Degree> = RelativePitch<D>[];