import { Chord, MusicalDuration } from "@datune/core";
import { ChromaticArray } from "@datune/core/chords";
import { Interval } from "@datune/utils";
import { ChordEvent } from './chordsequence/ChordEvent';
import { NoteEvent } from "./notessequence/NoteEvent";
import { ChordSequence } from "./chordsequence/ChordSequence";
import { TonalApporach } from "../approaches/tonal/TonalApproach";
import { TemporalNode } from "./TemporalNode";

export class ChordSequenceCalculator {
    constructor(private harmonicSequence: TonalApporach, private chordSequence: ChordSequence) {
    }

    calculate() {
        this.chordSequence.clear();
        this._forEachPart(interval => {
            const nodes = this.harmonicSequence.notesTimeSequence.getNodesAtInterval(interval);
            const nodesSorted = ChordSequenceCalculator._sortNodesByPitch(nodes);
            const degrees = nodesSorted.map(node => node.event.pitch.degree);
            const degreesUnique = degrees;
            if (degreesUnique.length < 2)
                return;
            const chord = Chord.fromNotes(...<ChromaticArray>degreesUnique);
            const chordNode = ChordEvent.from(chord, interval.to.withSub(interval.from));
            this.chordSequence.addEventAt(interval.from, chordNode);
        });
    }

    private _getCeilDuration(duration: MusicalDuration, compas: MusicalDuration): MusicalDuration {
        const compasses: number = duration.value / compas.value;
        const compassesCeil = Math.ceil(compasses);
        const ceilDuration = MusicalDuration.from(compassesCeil * compas.value);

        return <MusicalDuration>ceilDuration;
    }

    private _forEachPart(f: (interval: Interval<MusicalDuration>) => void) {
        const harmonicSequence = this.harmonicSequence;
        const beat = harmonicSequence.beat;
        const times = harmonicSequence.rhythmPattern.values.length;
        const compasDuration = beat.withMult(times);
        const intervalIni = Interval.fromInclusiveToExclusive(MusicalDuration.ZERO, compasDuration);
        const ceilDuration = this._getCeilDuration(harmonicSequence.notesTimeSequence.duration, compasDuration);
        for (let interval = intervalIni;
            interval.from.value < ceilDuration.value;
            interval = Interval.fromInclusiveToExclusive(interval.to, interval.to.withAdd(compasDuration))) {

            f(interval);
        }
    }

    private static _sortNodesByPitch(nodes: TemporalNode<NoteEvent, MusicalDuration>[]): TemporalNode<NoteEvent, MusicalDuration>[] {
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