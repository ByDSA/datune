import { from } from "../building";
import { Pitches as P } from "pitches/alt";
import { Scales } from "scales/alt";
import { TestInit } from "tests";

TestInit.diatonicAltKey();

describe("tests", () => {
  it("rootChord3: C Oriental -> Am", () => {
    const key = from(P.C, Scales.ORIENTAL);

    expect(key.root).toBeDefined();
    expect(key.scale).toBeDefined();
  } );
} );
