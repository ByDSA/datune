import { Scales as CS } from "scales/chromatic";
import { Scales as S } from "..";
import { toChromatic } from "./chromatic";

const { MAJOR, MINOR } = S;

describe.each([
  [MAJOR, CS.MAJOR],
  [MINOR, CS.MINOR],
])("toChromatic", (base, expected) => {
  it(`${base.toString()} => ${expected.toString()}`, () => {
    const actual = toChromatic(base);

    expect(actual).toBe(expected);
  } );
} );
