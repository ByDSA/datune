import { Spns as N } from "@datune/core/spns/chromatic";
import { MidiCode } from "./MidiCode";
import { MidiPitch } from "./MidiPitch";
import { MidiPitches as M } from "./";

describe.each([
  [M.C5, N.C4],
  [M.C0, N.C_S1],
  [M.A0, N.A_S1],
  [M.A5, N.A4],
  [M.C10, N.C9],
])("precalc Spn", (midiPitch, expectedSpn) => {
  const { spn } = midiPitch;

  it("precalc spn", () => {
    expect(spn).toBe(expectedSpn);
  } );
} );

describe.each([
  [M.C0, 0],
  [M.MIN, 0],
  [M.B0, 11],
  [M.C1, 12],
  [M.A5, 69],
  [M.A4, 57],
  [M.C5, 60],
  [M.C6, 72],
  [M.C8, 96],
  [M.C9, 108],
  [M.B9, 119],
  [M.C10, 120],
  [M.MAX, 127],
] as [MidiPitch, MidiCode][])("code", (midiPitch, code: MidiCode) => {
  it(`${midiPitch} => code = ${code}`, () => {
    const actualCode: number = +midiPitch;

    expect(actualCode).toBe(code);
  } );
} );
