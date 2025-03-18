import { MusicalDuration } from "@datune/core";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { PitchArray as ChromaticArray } from "@datune/core/pitches/chromatic";
import { Spn } from "@datune/core/spns/chromatic";
import { ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { Interval, TemporalNode } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import { NotesSequence } from "..";
import { ChordSequence } from "./chordsequence/ChordSequence";
import { RhythmSequence } from "./rhythmsequence/RhythmSequence";

export class ChordSequenceCalculator {
  #notesTimeSequence: NotesSequence;

  #rhythmSequence: RhythmSequence;

  constructor(notesTimeSequence: NotesSequence, rhythmSequence: RhythmSequence) {
    this.#notesTimeSequence = notesTimeSequence;
    this.#rhythmSequence = rhythmSequence;
  }

  calculate(): ChordSequence {
    const chordSequence = new ChordSequence();

    this.#forEachPart((interval) => {
      const nodes = this.#notesTimeSequence.get( {
        interval,
      } );
      const nodesSorted = sortNodesByPitch(nodes);
      const pitches = nodesSorted.map((node) => node.event.pitch) as ChromaticArray;
      const pitchesUnique = pitches;

      if (pitchesUnique.length < 2)
        return;

      const chord = fromPitches(...pitchesUnique);

      chordSequence.add( {
        event: chord,
        interval,
      } );
    } );

    return chordSequence;
  }

  #forEachPart(f: (interval: Interval<MusicalDuration>)=> void) {
    const [timeSignatureAtBegin] = this.#rhythmSequence.get( {
      at: ZERO,
    } );

    if (!timeSignatureAtBegin)
      throw new Error("RhythmSequence has no time signature at begin.");

    const compasDuration = timeSignatureAtBegin.event.denominatorBeat
    * timeSignatureAtBegin.event.numerator;
    const intervalIni = intervalOf(ZERO, compasDuration);
    const ceilDuration = getCeilDuration(this.#notesTimeSequence.duration, compasDuration);

    for (let interval = intervalIni;
      interval.from < ceilDuration;
      interval = intervalOf(interval.to, interval.to + compasDuration))
      f(interval);
  }
}

function sortNodesByPitch(
  nodes: TemporalNode<Spn>[],
): TemporalNode<Spn>[] {
  return nodes.sort((a, b) => {
    const valueA = a.event.valueOf();
    const valueB = b.event.valueOf();

    if (valueA < valueB)
      return -1;

    if (valueA > valueB)
      return 1;

    return 0;
  } );
}

function getCeilDuration(duration: MusicalDuration, compas: MusicalDuration): MusicalDuration {
  const compasses: number = duration / compas;
  const compassesCeil = Math.ceil(compasses);
  const ceilDuration = compassesCeil * compas;

  return ceilDuration;
}
