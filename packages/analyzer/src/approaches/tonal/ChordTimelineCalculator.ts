import { MusicalDuration } from "@datune/core";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { PitchArray as ChromaticArray } from "@datune/core/pitches/chromatic";
import { Spn } from "@datune/core/spns/chromatic";
import { MusicalDurations as MD } from "@datune/core";
import { Interval } from "datils/math";
import { intervalBetween } from "datils/math/intervals";
import { TimelineNode } from "@datune/utils";
import { NotesTimeline } from "../..";
import { ChordTimeline } from "../../timelines/ChordTimeline";
import { TimeSignatureTimeline } from "../../timelines/TimeSignatureTimeline";

export class ChordTimelineCalculator {
  #notesTimeline: NotesTimeline;

  #timeSignatureTimeline: TimeSignatureTimeline;

  constructor(notesTimeline: NotesTimeline, timeSignatureTimeline: TimeSignatureTimeline) {
    this.#notesTimeline = notesTimeline;
    this.#timeSignatureTimeline = timeSignatureTimeline;
  }

  calculate(): ChordTimeline {
    const chordTimeline = new ChordTimeline();

    this.#forEachPart((interval) => {
      const nodes = this.#notesTimeline.getAtInterval(interval);
      const nodesSorted = sortNodesByPitch(nodes);
      const pitches = nodesSorted.map((node) => node.event.pitch) as ChromaticArray;
      const pitchesUnique = pitches;

      if (pitchesUnique.length < 2)
        return;

      const chord = fromPitches(...pitchesUnique);

      chordTimeline.add( {
        event: chord,
        interval,
      } );
    } );

    return chordTimeline;
  }

  #forEachPart(f: (interval: Interval<MusicalDuration>)=> void) {
    const timeSignatureAtBegin = this.#timeSignatureTimeline.getAt(MD.ZERO);

    if (!timeSignatureAtBegin)
      throw new Error("RhythmSequence has no time signature at begin.");

    const compasDuration = timeSignatureAtBegin.event.denominatorBeat
    * timeSignatureAtBegin.event.numerator;
    const intervalIni = intervalBetween(MD.ZERO, compasDuration);
    const ceilDuration = getCeilDuration(this.#notesTimeline.duration, compasDuration);

    for (let interval = intervalIni;
      interval.from < ceilDuration;
      interval = intervalBetween(interval.to, interval.to + compasDuration))
      f(interval);
  }
}

function sortNodesByPitch(
  nodes: TimelineNode<Spn>[],
): TimelineNode<Spn>[] {
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
