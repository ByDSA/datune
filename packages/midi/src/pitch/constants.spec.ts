import { Spns as N } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { A0, A4, A5, B0, B9, C0, C1, C10, C5, C6, C8, C9, MAX, MIN } from "./constants";
import { MidiCode } from "./MidiCode";

TestInit.initAll();

describe.each([
  [C5, N.C4],
  [C0, N.C_S1],
  [A0, N.A_S1],
  [A5, N.A4],
  [C10, N.C9],
])("precalc Spn", (midiPitch, expectedSpn) => {
  const { spn } = midiPitch;

  it("precalc spn", () => {
    expect(spn).toBe(expectedSpn);
  } );
} );

describe.each([
  [C0, <MidiCode>0],
  [MIN, <MidiCode>0],
  [B0, <MidiCode>11],
  [C1, <MidiCode>12],
  [A5, <MidiCode>69],
  [A4, <MidiCode>57],
  [C5, <MidiCode>60],
  [C6, <MidiCode>72],
  [C8, <MidiCode>96],
  [C9, <MidiCode>108],
  [B9, <MidiCode>119],
  [C10, <MidiCode>120],
  [MAX, <MidiCode>127],
])("code", (midiPitch, code: MidiCode) => {
  it(`${midiPitch} => code = ${code}`, () => {
    const actualCode: number = +midiPitch;

    expect(actualCode).toBe(code);
  } );
} );
