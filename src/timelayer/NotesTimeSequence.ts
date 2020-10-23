import { MusicalDuration } from '../tempo/MusicalDuration';
import { Note } from './Note';
import { TimeSequence, getDefaultCellSize } from './TimeSequence';

export class NotesTimeSequence extends TimeSequence<Note, MusicalDuration> {
    constructor() {
        super(getDefaultCellSize());
    }

    get startTime(): MusicalDuration {
        return MusicalDuration.ZERO;
    }
}