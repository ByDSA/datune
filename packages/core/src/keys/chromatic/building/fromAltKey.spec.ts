import { Keys as K } from "keys/chromatic";
import { Keys as AK } from "../../alt";
import { fromAltKey } from "./fromAltKey";

it("fromAltKey", () => {
  const actual = fromAltKey(AK.C);
  const expected = K.C;

  expect(actual).toBe(expected);
} );
