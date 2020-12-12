import { MusicalDuration } from '@datune/core/tempo/MusicalDuration';
import { Node } from '@datune/analyzer/sequences/Node';
import { Sequence } from "@datune/analyzer/sequences/Sequence";
import { MidiNote } from './MidiNote';

export class MidiSequence extends Sequence<MidiNote, MusicalDuration> {
    protected constructor(cellSize: MusicalDuration) {
        super(cellSize);
    }

    static create(): MidiSequence {
        return new MidiSequence(MusicalDuration.QUARTER);
    }

    protected get cellSize(): MusicalDuration {
        return super.cellSize;
    }

    get nodes(): Node<MidiNote, MusicalDuration>[] {
        return super.nodes;
    }

    get duration(): MusicalDuration {
        return super.duration;
    }

    get startTime(): MusicalDuration {
        return MusicalDuration.ZERO;
    }
}