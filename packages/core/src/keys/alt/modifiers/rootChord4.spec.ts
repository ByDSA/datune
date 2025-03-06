import { Chords as C } from "chords/alt";
import { Keys as K } from "..";
import { rootChord4 } from "./rootChord4";

it("rootChord4: C -> CMaj7", () => {
  const chord = rootChord4(K.C);

  expect(chord?.length).toBe(4);
  expect(chord).toBe(C.CMaj7);
} );
