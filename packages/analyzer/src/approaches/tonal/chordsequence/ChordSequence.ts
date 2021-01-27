import { Chord } from '@datune/core';
import { ChordSequenceCalculator } from 'sequences/ChordSequenceCalculator';
import { MusicalSequence } from 'sequences/musicalsequence/MusicalSequence';
import { NotesSequence } from 'sequences/notessequence/NotesSequence';
import { TonalApporach } from '../TonalApproach';

export class ChordSequence extends MusicalSequence<Chord> {
    calculateFrom(notesSequence: NotesSequence) {
        let calculator = new ChordSequenceCalculator(notesSequence, this);
        calculator.calculate();
    }
}