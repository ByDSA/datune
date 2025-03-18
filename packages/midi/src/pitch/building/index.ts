import { Pitch as CPitch } from "@datune/core/pitches/chromatic";
import { fromInt as cPitchFromInt } from "@datune/core/pitches/chromatic/building";
import { NUMBER } from "@datune/core/pitches/chromatic/constants";
import { Spn } from "@datune/core/spns/chromatic";
import { fromPitchOctave as spnFrom } from "@datune/core/spns/symbolic/chromatic/building/pitch-octave";
import { cache } from "../caching";
import { MidiCode } from "../MidiCode";
import { MidiPitch } from "../MidiPitch";

export function from(spn: Spn, detuned: number = 0) {
  return cache.getOrCreate( {
    spn,
    detuned,
  } );
}

export function fromFrequency(f: number): MidiPitch {
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

export function fromCode(code: MidiCode, detuned: number = 0): MidiPitch {
  const octave = Math.floor(code / NUMBER);
  const noteInt = code - (NUMBER * octave);
  const note: CPitch = cPitchFromInt(noteInt);
  const spn: Spn = <Spn>spnFrom(note, octave - 1);

  return from(spn, detuned);
}
