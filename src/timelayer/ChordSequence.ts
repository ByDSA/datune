import { DiatonicAltChord } from '../chords/DiatonicAltChord';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { Interval } from '../utils/Interval';
import { HarmonicSequence } from './HarmonicSequence';
import { Note } from './Note';
import { TemporalEvent } from './TemporalEvent';
import { TemporalNode } from './TemporalNode';
import { getDefaultCellSize, TimeSequence } from './TimeSequence';

export class ChordSequence extends TimeSequence<ChordNode, MusicalDuration> {
    constructor() {
        super(getDefaultCellSize());
    }

    get startTime(): MusicalDuration {
        return MusicalDuration.ZERO;
    }

    calculateFrom(harmonicSequence: HarmonicSequence) {
        let calculator = new ChordSequenceCalculator(harmonicSequence, this);
        calculator.calculate();
    }
}

class ChordSequenceCalculator {
    constructor(private harmonicSequence: HarmonicSequence, private chordSequence: ChordSequence) {

    }

    calculate() {
        this.chordSequence.clear();
        this._forEachPart(interval => {
            const nodes = this.harmonicSequence.notesTimeSequence.getNodesAtInterval(interval);
            const nodesSorted = ChordSequenceCalculator._sortNodesByPitch(nodes);
            const degrees = nodesSorted.map(node => node.event.pitch.degree);
            const degreesUnique = degrees;
            const chord = DiatonicAltChord.from(degreesUnique);
            const chordNode = ChordNode.from(chord, interval.to.withSub(interval.from));
            this.chordSequence.addEventAt(interval.from, chordNode);
        });
    }

    private _getCeilDuration(duration: MusicalDuration, compas: MusicalDuration) {
        const compasses: number = duration.value / compas.value;
        const compassesCeil = Math.ceil(compasses);
        const ceilDuration = MusicalDuration.from(compassesCeil * compas.value);

        return ceilDuration;
    }

    private _forEachPart(f: (interval: Interval<MusicalDuration>) => void) {
        const harmonicSequence = this.harmonicSequence;
        const beat = harmonicSequence.beat;
        const times = harmonicSequence.rhythmPattern.length;
        const compasDuration = beat.withMult(times);
        const intervalIni = Interval.fromInclusiveToExclusive(MusicalDuration.ZERO, compasDuration);
        const ceilDuration = this._getCeilDuration(harmonicSequence.notesTimeSequence.duration, compasDuration);
        for (let interval = intervalIni;
            interval.from.value < ceilDuration.value;
            interval = Interval.fromInclusiveToExclusive(interval.to, interval.to.withAdd(compasDuration))) {

            f(interval);
        }
    }

    private static _sortNodesByPitch(nodes: TemporalNode<Note, MusicalDuration>[]): TemporalNode<Note, MusicalDuration>[] {
        return nodes.sort((a, b) => {
            const valueA = a.event.pitch.valueOf();
            const valueB = b.event.pitch.valueOf();
            if (valueA < valueB)
                return -1;
            else if (valueA > valueB)
                return 1;
            else
                return 0;
        })
    }
}

export class ChordNode implements TemporalEvent<MusicalDuration> {
    private _chord: DiatonicAltChord;
    private _duration: MusicalDuration;

    private constructor(chord: DiatonicAltChord, duration: MusicalDuration) {
        this._chord = chord;
        this._duration = duration;
    }

    static from(chord: DiatonicAltChord, duration: MusicalDuration) {
        return new ChordNode(chord, duration);
    }

    get duration() {
        return this._duration;
    }

    get chord() {
        return this._chord;
    }
}