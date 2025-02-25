import { TestInit } from "tests";
import { A0, A1, A2, A3, A4, A5, B2, C0, C10, C4, G10 } from "../constants";
import calcFrequency from "./frequency";

TestInit.initAll();

describe.each([
  [C0, 8.18],
  [A0, 13.75],
  [A1, 27.5],
  [A2, 55],
  [B2, 61.74],
  [A3, 110],
  [C4, 130.81],
  [A4, 220],
  [A5, 440],
  [C10, 8372.02],
  [G10, 12543.85],
])("frequency", (midiPitch, expectedFrequency) => {
  it(`${midiPitch}.frequency = ${expectedFrequency}`, () => {
    const frequency = calcFrequency(midiPitch);

    expect(frequency).toBeCloseTo(expectedFrequency);
  } );
} );
