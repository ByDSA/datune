import { Pitches as P } from "pitches/alt";
import { Scales as S } from "scales/alt";
import { from } from "../building";

it("rootChord3: C Oriental -> Am", () => {
  const key = from(P.C, S.ORIENTAL);

  expect(key.root).toBeDefined();
  expect(key.scale).toBeDefined();
} );
