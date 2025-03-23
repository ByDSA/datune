import type { MidiCode } from "../MidiCode";
import type { MidiPitch } from "../MidiPitch";
import { Pitch as CPitch } from "@datune/core/pitches/chromatic";
import { fromInt as cPitchFromInt } from "@datune/core/pitches/chromatic/building";
import { NUMBER } from "@datune/core/pitches/chromatic/constants";
import { Spn } from "@datune/core/spns/chromatic";
import { fromPitchOctave as spnFrom } from "@datune/core/spns/symbolic/chromatic/building/pitch-octave";
import { from } from "./from";

export function fromCode(code: MidiCode, detuned: number = 0): MidiPitch {
  const octave = Math.floor(code / NUMBER);
  const noteInt = code - (NUMBER * octave);
  const note: CPitch = cPitchFromInt(noteInt);
  const spn: Spn = spnFrom(note, octave - 1)!;

  return from(spn, detuned);
}
