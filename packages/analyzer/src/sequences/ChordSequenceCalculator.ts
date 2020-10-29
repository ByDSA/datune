import { DiatonicAltChord } from "@datune/core";
import { MusicalDuration } from "@datune/core/tempo/MusicalDuration";
import { Interval } from "@datune/utils";
import { ChordEvent } from '../events/ChordEvent';
import { NoteEvent } from "../events/NoteEvent";
import { Node } from "sequences/Node";
import { ChordSequence } from "./ChordSequence";
import { HarmonicSequence } from "./HarmonicSequence";

export class ChordSequenceCalculator {
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
            const chordNode = ChordEvent.from(chord, interval.to.withSub(interval.from));
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

    private static _sortNodesByPitch(nodes: Node<NoteEvent, MusicalDuration>[]): Node<NoteEvent, MusicalDuration>[] {
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