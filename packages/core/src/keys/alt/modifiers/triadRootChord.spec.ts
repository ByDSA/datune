/* eslint-disable camelcase */
import { Chords as C } from "chords/alt";
import { Pitches as P } from "pitches/alt";
import { Scales as S } from "scales/alt";
import { from } from "../building";
import { Keys as K } from "..";
import { triadRootChord } from "./triadRootChord";

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Am: C_Am, C: C_C } = C;

  it("c -> C", () => {
    const chord = triadRootChord(K.C);

    expect(chord?.size).toBe(3);
    expect(chord).toBe(C_C);
  } );

  it("c Oriental -> Am", () => {
    const key = from(P.C, S.ORIENTAL);
    const chord = triadRootChord(key);

    expect(chord?.size).toBe(3);
    expect(chord).toBe(C_Am);
  } );
} );
