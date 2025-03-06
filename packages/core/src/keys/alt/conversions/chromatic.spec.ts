import { Keys as CKeys } from "keys/chromatic";
import { Keys as K } from "..";
import { toChromatic } from "./chromatic";

it("toChromatic", () => {
  const actual = toChromatic(K.C);
  const expected = CKeys.C;

  expect(actual).toBe(expected);
} );
