import { ChordEvent } from '../events/ChordEvent';
import { ChordSequenceCalculator } from './ChordSequenceCalculator';
import { HarmonicSequence } from './HarmonicSequence';
import { MusicalSequence } from './MusicalSequence';

export class ChordSequence extends MusicalSequence<ChordEvent> {
    calculateFrom(harmonicSequence: HarmonicSequence) {
        let calculator = new ChordSequenceCalculator(harmonicSequence, this);
        calculator.calculate();
    }
}