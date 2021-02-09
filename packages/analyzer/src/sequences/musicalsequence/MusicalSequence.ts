import { MusicalDuration } from '@datune/core';
import { LinearSequence } from '@datune/utils';

export function getDefaultCellSize() { return MusicalDuration.WHOLE }

export class MusicalSequence<E> extends LinearSequence<E, MusicalDuration> {
    constructor(cellSize: MusicalDuration = getDefaultCellSize()) {
        super(MusicalDuration.ZERO, cellSize);
    }
}