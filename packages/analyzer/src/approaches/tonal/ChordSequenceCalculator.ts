import { Chord, MusicalDuration, TimeSignature } from "@datune/core";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { Pitch, PitchArray } from "@datune/core/pitches/chromatic";
import { Spn } from "@datune/core/spns/chromatic";
import { MusicalDurations as MD } from "@datune/core";
import { TemporalNode, Time } from "@datune/utils";
import { sortNodesBySpn } from "approaches/utils";
import { NotesSequence } from "../..";
import { ChordSequence } from "../../sequences/ChordSequence";
import { RhythmSequence } from "../../sequences/RhythmSequence";

export class ChordSequenceCalculator {
  #notesTimeSequence: NotesSequence;

  #rhythmSequence: RhythmSequence;

  constructor(notesTimeSequence: NotesSequence, rhythmSequence: RhythmSequence) {
    this.#notesTimeSequence = notesTimeSequence;
    this.#rhythmSequence = rhythmSequence;
  }

  calculate(): ChordSequence {
    const chordSequence = new ChordSequence();
    let lastNode: TemporalNode<Chord> | undefined;
    const threhold = MD.THIRTYSECOND;
    const [timeSignatureAtBegin] = this.#rhythmSequence.get( {
      at: MD.ZERO,
    } );

    if (!timeSignatureAtBegin)
      throw new Error("RhythmSequence has no time signature at begin.");

    const beatDuration = timeSignatureAtBegin.event.denominatorBeat;
    const f = (time: Time) => {
      const { numerator, denominatorBeat } = this.#rhythmSequence.nodes[0].event;
      const isStrong = (time) % (numerator * denominatorBeat) === 0;

      if (lastNode) {
        chordSequence.remove(lastNode);
        // eslint-disable-next-line prefer-destructuring
        lastNode = chordSequence.add( {
          event: lastNode.event,
          interval: {
            ...lastNode.interval,
            to: time,
          },
        } )[0];
      }

      const nodes = this.#notesTimeSequence.get( {
        from: time - threhold,
        to: time + threhold,
      } )
        .filter(n=> {
          if (n.interval.to >= time + threhold || n.interval.from >= time - threhold)
            return true;

          return false;
        } );
      const nodesSorted = sortNodesBySpn(nodes);
      const pitches: PitchArray = [] as any;
      let bass: Pitch;
      let lastPitchBass: Spn;

      for (const node of nodesSorted) {
        const spn = node.event;

        if (pitches.length === 0) {
          bass = spn.pitch;
          lastPitchBass = spn;
          pitches.push(bass);
        } else {
          if (+spn - +lastPitchBass! > 12)
            break;

          if (spn.pitch === bass!)
            lastPitchBass = spn;
          else {
            const p = spn.pitch;
            const pitchNodesInBeat = this.#notesTimeSequence.get( {
              from: time - threhold,
              to: Math.min(
                time + (1.5 * beatDuration),
                getNextStrongTime(time, this.#rhythmSequence.nodes[0].event) - threhold,
              ),
            } ).filter(n=>n.event.pitch === spn.pitch);
            const endSpnNodeInBeat = pitchNodesInBeat.reduce((acc, n) => {
              if (n.interval.to > acc.interval.to)
                return n;

              return acc;
            }, pitchNodesInBeat[0]);
            const isPassNote = !isStrong
            && endSpnNodeInBeat.interval.to <= time + beatDuration
            && !lastNode?.event.pitches.includes(p);

            if (!pitches.includes(p) && !isPassNote)
              pitches.push(p);
          }
        }
      }

      if (pitches.length < 2)
        return;

      const currentChord = fromPitches(...pitches);
      const currentChordPitches = new Set(currentChord.pitches);
      const lastNodePitches = lastNode?.event ? new Set(lastNode.event.pitches) : undefined;
      const mustChange = !lastNodePitches
      || (lastNodePitches && !(setAIncludesSetB(currentChordPitches, lastNodePitches)
    || setAIncludesSetB(lastNodePitches, currentChordPitches)));

      if (mustChange) {
        // eslint-disable-next-line prefer-destructuring
        lastNode = chordSequence.add( {
          event: currentChord,
          interval: { // TODO: el intervalo [a,a) es inválido
            from: time,
            fromBound: true,
            to: time,
            toBound: false,
          },
        } )[0];
      }
    };
    const duration = getCeilDuration(this.#notesTimeSequence.duration, beatDuration);

    for (let time = MD.ZERO; time <= duration; time += beatDuration)
      f(time);

    return chordSequence;
  }
}

function getCeilDuration(duration: MusicalDuration, beat: MusicalDuration): MusicalDuration {
  const compasses: number = duration / beat;
  const compassesCeil = Math.ceil(compasses);
  const ceilDuration = compassesCeil * beat;

  return ceilDuration;
}

const setAIncludesSetB = <T>(setA: Set<T>, setB: Set<T>)=> {
  for (const item of setB) {
    if (!setA.has(item))
      return false;
  }

  return true;
};

function getNextStrongTime(time: Time, timeSignature: TimeSignature): Time {
  const beatDuration = timeSignature.denominatorBeat;
  const barDuration = timeSignature.numerator * beatDuration;

  return Math.ceil(time / barDuration) * barDuration;
}
