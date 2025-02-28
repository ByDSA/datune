/* eslint-disable camelcase */
import * as Keys from "../constants";
import { from } from "../building";
import { rootChord3 } from "./rootChord3";
import { Chords } from "chords/alt";
import { Pitches as P } from "pitches/alt";
import { Scales } from "scales/alt";
import { TestInit } from "tests";

TestInit.diatonicAltChord();
TestInit.diatonicAltKey();
TestInit.diatonicAltScale();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Am: C_Am, C: C_C } = Chords;

  it("rootChord3: C -> C", () => {
    const chord = rootChord3(Keys.C);

    expect(chord?.length).toBe(3);
    expect(chord).toBe(C_C);
  } );

  it("rootChord3: C Oriental -> Am", () => {
    const key = from(P.C, Scales.ORIENTAL);
    const chord = rootChord3(key);

    expect(chord?.length).toBe(3);
    expect(chord).toBe(C_Am);
  } );
} );
