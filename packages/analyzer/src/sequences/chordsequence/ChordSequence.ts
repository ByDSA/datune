import { ChordEvent } from './ChordEvent';
import { ChordSequenceCalculator } from '../ChordSequenceCalculator';
import { TonalApporach } from '../../approaches/tonal/TonalApproach';
import { MusicalSequence } from '../musicalsequence/MusicalSequence';

export class ChordSequence extends MusicalSequence<ChordEvent> {
    calculateFrom(harmonicSequence: TonalApporach) {
        let calculator = new ChordSequenceCalculator(harmonicSequence, this);
        calculator.calculate();
    }
}