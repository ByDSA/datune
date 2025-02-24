import { fromInt as pitchFromInt, NUMBER, Pitch as Note } from "@datune/core/pitches/chromatic";
import { fromPitchOctave as spnFrom, SPN } from "@datune/core/spns/chromatic";
import { cache } from "../caching";
import MidiCode from "../MidiCode";
import Pitch from "../MidiPitch";

export function from(spn: SPN, detuned: number = 0) {
  return cache.getOrCreate( {
    spn,
    detuned,
  } );
}

export function fromFrequency(f: number): Pitch {
  const semis = 12 * Math.log2(f / 440);
  const roundSemis = Math.round(semis);
  let code = 69 + roundSemis as MidiCode;
  let detuned = Math.round(100 * (semis - roundSemis));

  if (code < 0) {
    code = 0;
    detuned = 0;
  } else if (code > 127) {
    code = 127;
    detuned = 0;
  }

  return fromCode(code, detuned);
}

export function fromCode(code: MidiCode, detuned: number = 0): Pitch {
  const octave = Math.floor(code / NUMBER);
  const noteInt = code - NUMBER * octave;
  const note: Note = pitchFromInt(noteInt);
  const spn: SPN = <SPN>spnFrom(note, octave - 1);

  return from(spn, detuned);
}
