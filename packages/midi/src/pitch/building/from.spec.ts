import { Spns as N } from "@datune/core/spns/chromatic";
import { from } from ".";

it("from - A5 -1200 cents", () => {
  const midiNote = from(N.A5, -1200);
  const { spn } = midiNote;
  const { detuned } = midiNote;

  expect(spn).toEqual(N.A5);
  expect(detuned).toBe(-1200);
} );
