import { RhythmPattern } from '../rythm/RhythmPattern';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { Time } from '../tempo/Time';
import { TimeLayer } from './TimeLayer';

export class RhythmSequence<T extends Time> {
    private _rhythmPattern: RhythmPattern;
    private _beat: MusicalDuration;
    private _layers: TimeLayer<T>[];

    private constructor() {
        this._layers = [];
    }

    static create<T extends Time>(rhythmPattern: RhythmPattern, beat: MusicalDuration): RhythmSequence<T> {
        let rhythmSequence = new RhythmSequence<T>();
        rhythmSequence._rhythmPattern = rhythmPattern;
        rhythmSequence._beat = beat;

        return rhythmSequence;
    }

    get layers(): TimeLayer<T>[] {
        return this._layers;
    }

    get beat(): MusicalDuration {
        return this._beat
    }

    get rhythmPattern(): RhythmPattern {
        return this._rhythmPattern;
    }
}