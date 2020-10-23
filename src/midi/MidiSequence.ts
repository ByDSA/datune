import { MusicalDuration } from '../tempo/MusicalDuration';
import { TemporalNode } from '../timelayer/TemporalNode';
import { TimeSequence } from "../timelayer/TimeSequence";
import { MidiNote } from './MidiNote';

export class MidiSequence extends TimeSequence<MidiNote, MusicalDuration> {
    protected constructor(cellSize: MusicalDuration) {
        super(cellSize);
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