import { Chords as C } from "chords/alt";
import { Keys as K } from "..";
import { seventhRootChord } from "./seventhRootChord";

it("seventhRootChord: C -> CMaj7", () => {
  const chord = seventhRootChord(K.C);

  expect(chord?.size).toBe(4);
  expect(chord).toBe(C.CMaj7);
} );
