import { MidiPitches as M } from "..";
import { MidiCode } from "../MidiCode";
import { MidiPitch } from "../MidiPitch";
import { fromCode } from ".";

const { A4, A5, B0, B9, C0, C1, C10, C5, C6, C8, C9, MAX, MIN } = M;

describe.each([
  [C0, 0],
  [MIN, 0],
  [B0, 11],
  [C1, 12],
  [A5, 69],
  [A4, 57],
  [C5, 60],
  [C6, 72],
  [C8, 96],
  [C9, 108],
  [B9, 119],
  [C10, 120],
  [MAX, 127],
] as [MidiPitch, MidiCode][])("code", (midiPitch, code: MidiCode) => {
  it(`code = ${code} => ${midiPitch}`, () => {
    const actualMidiPitch = fromCode(code);

    expect(actualMidiPitch).toBe(midiPitch);
  } );
} );
