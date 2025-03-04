import { Chords } from "chords/alt";
import { TestInit } from "tests";
import { C } from "../constants";
import { rootChord4 } from "./rootChord4";

TestInit.diatonicAltChord();
TestInit.diatonicAltKey();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { CMaj7 } = Chords;

  it("rootChord4: C -> CMaj7", () => {
    const chord = rootChord4(C);

    expect(chord?.length).toBe(4);
    expect(chord).toBe(CMaj7);
  } );
} );
