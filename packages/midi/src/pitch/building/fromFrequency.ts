import { MidiCode } from "../MidiCode";
import { MidiPitch } from "../MidiPitch";
import { fromCode } from "./fromCode";

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
