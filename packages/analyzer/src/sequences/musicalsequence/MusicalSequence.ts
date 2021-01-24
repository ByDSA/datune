import { MusicalDuration } from '@datune/core';
import { TemporalEvent } from '../../events/TemporalEvent';
import { Sequence } from '../sequence/Sequence';

export function getDefaultCellSize() { return MusicalDuration.WHOLE }

export class MusicalSequence<E extends TemporalEvent<MusicalDuration>> extends Sequence<E, MusicalDuration> {
    constructor(cellSize: MusicalDuration = getDefaultCellSize()) {
        super(cellSize);
    }

    get startTime(): MusicalDuration {
        return MusicalDuration.ZERO;
    }
}