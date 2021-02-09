import { Chord, MusicalDuration, SPN } from "@datune/core";
import { ChromaticArray } from "@datune/core/chords";
import { Interval, TemporalNode } from "@datune/utils";
import { NotesSequence } from "..";
import { ChordSequence } from "./chordsequence/ChordSequence";
import { RhythmSequence } from "./rhythmsequence/RhythmSequence";

export class ChordSequenceCalculator {
    constructor(private notesTimeSequence: NotesSequence, private _rhythmSequence: RhythmSequence) {
    }

    calculate(): ChordSequence {
        let chordSequence = new ChordSequence();
        this._forEachPart(interval => {
            const nodes = this.notesTimeSequence.getNodesAtInterval(interval);
            const nodesSorted = ChordSequenceCalculator._sortNodesByPitch(nodes);
            const degrees = nodesSorted.map(node => node.event.degree);
            const degreesUnique = degrees;
            if (degreesUnique.length < 2)
                return;
            const chord = Chord.fromNotes(...<ChromaticArray>degreesUnique);
            chordSequence.addEvent(chord, interval.from, interval.to);
        });

        return chordSequence;
    }

    private _getCeilDuration(duration: MusicalDuration, compas: MusicalDuration): MusicalDuration {
        const compasses: number = duration.value / compas.value;
        const compassesCeil = Math.ceil(compasses);
        const ceilDuration = MusicalDuration.from(compassesCeil * compas.value);

        return <MusicalDuration>ceilDuration;
    }

    private _forEachPart(f: (interval: Interval<MusicalDuration>) => void) {
        const timeSignatureAtBegin = this._rhythmSequence.getNodeAt(MusicalDuration.ZERO);
        if (!timeSignatureAtBegin)
            throw new Error("RhythmSequence has no time signature at begin.");

        const compasDuration = timeSignatureAtBegin.event.denominatorBeat.withMult(timeSignatureAtBegin.event.numerator);
        const intervalIni = Interval.fromInclusiveToExclusive(MusicalDuration.ZERO, compasDuration);
        const ceilDuration = this._getCeilDuration(this.notesTimeSequence.duration, compasDuration);
        for (let interval = intervalIni;
            interval.from.value < ceilDuration.value;
            interval = Interval.fromInclusiveToExclusive(interval.to, interval.to.withAdd(compasDuration))) {

            f(interval);
        }
    }

    private static _sortNodesByPitch(nodes: TemporalNode<SPN, MusicalDuration>[]): TemporalNode<SPN, MusicalDuration>[] {
        return nodes.sort((a, b) => {
            const valueA = a.event.valueOf();
            const valueB = b.event.valueOf();
            if (valueA < valueB)
                return -1;
            else if (valueA > valueB)
                return 1;
            else
                return 0;
        })
    }
}