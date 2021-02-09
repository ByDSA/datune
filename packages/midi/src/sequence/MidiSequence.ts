import { MusicalDuration } from '@datune/core';
import { ParallelSequence, TemporalNode } from '@datune/utils';
import { MidiNote } from './note/MidiNote';

export class MidiSequence extends ParallelSequence<MidiNote, MusicalDuration> {
    protected constructor(cellSize: MusicalDuration) {
        super(MusicalDuration.ZERO, cellSize);
    }

    static create(): MidiSequence {
        return new MidiSequence(MusicalDuration.QUARTER);
    }

    protected get cellSize(): MusicalDuration {
        return super.cellSize;
    }

    get nodes(): TemporalNode<MidiNote, MusicalDuration>[] {
        return super.nodes;
    }

    get duration(): MusicalDuration {
        return super.duration;
    }

    get startTime(): MusicalDuration {
        return MusicalDuration.ZERO;
    }
}