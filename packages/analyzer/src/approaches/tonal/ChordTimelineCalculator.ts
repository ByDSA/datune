import { MusicalDuration } from "@datune/core";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { PitchArray } from "@datune/core/pitches/chromatic";
import { MusicalDurations as MD } from "@datune/core";
import { Interval } from "datils/math";
import { intervalBetween } from "datils/math/intervals";
import { sortNodesBySpn } from "approaches/utils";
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
      const nodesSorted = sortNodesBySpn(nodes);
      const pitches = nodesSorted.map((node) => node.event.pitch) as PitchArray;
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

function getCeilDuration(duration: MusicalDuration, compas: MusicalDuration): MusicalDuration {
  const compasses: number = duration / compas;
  const compassesCeil = Math.ceil(compasses);
  const ceilDuration = compassesCeil * compas;

  return ceilDuration;
}
