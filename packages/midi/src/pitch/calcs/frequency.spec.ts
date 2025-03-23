import { MidiPitches as M } from "../";
import { calcFrequency } from "./frequency";

describe.each([
  [M.C0, 8.18],
  [M.A0, 13.75],
  [M.A1, 27.5],
  [M.A2, 55],
  [M.B2, 61.74],
  [M.A3, 110],
  [M.C4, 130.81],
  [M.A4, 220],
  [M.A5, 440],
  [M.C10, 8372.02],
  [M.G10, 12543.85],
])("frequency", (midiPitch, expectedFrequency) => {
  it(`${midiPitch}.frequency = ${expectedFrequency}`, () => {
    const frequency = calcFrequency(midiPitch);

    expect(frequency).toBeCloseTo(expectedFrequency);
  } );
} );
