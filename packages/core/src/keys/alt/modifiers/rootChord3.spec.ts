/* eslint-disable camelcase */
import { Chords as C } from "chords/alt";
import { Pitches as P } from "pitches/alt";
import { Scales as S } from "scales/alt";
import { from } from "../building";
import { Keys as K } from "..";
import { rootChord3 } from "./rootChord3";

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Am: C_Am, C: C_C } = C;

  it("rootChord3: C -> C", () => {
    const chord = rootChord3(K.C);

    expect(chord?.length).toBe(3);
    expect(chord).toBe(C_C);
  } );

  it("rootChord3: C Oriental -> Am", () => {
    const key = from(P.C, S.ORIENTAL);
    const chord = rootChord3(key);

    expect(chord?.length).toBe(3);
    expect(chord).toBe(C_Am);
  } );
} );
