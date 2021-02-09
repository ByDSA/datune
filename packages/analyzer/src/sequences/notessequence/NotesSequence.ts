import { MusicalDuration, SPN } from '@datune/core';
import { ParallelSequence } from '@datune/utils';
import { getDefaultCellSize } from '../../sequences/musicalsequence/MusicalSequence';

export class NotesSequence extends ParallelSequence<SPN, MusicalDuration> {
    constructor(cellSize: MusicalDuration = getDefaultCellSize()) {
        super(MusicalDuration.ZERO, cellSize);
    }
}