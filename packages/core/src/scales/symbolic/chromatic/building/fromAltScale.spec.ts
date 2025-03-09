import { Scales as S } from "scales/chromatic";
import { Scales as AS } from "scales/alt";
import { fromAltScale } from "./fromAltScale";

const { MAJOR, MINOR } = AS;

describe.each([
  [MAJOR, S.MAJOR],
  [MINOR, S.MINOR],
])("fromAltScale", (base, expected) => {
  it(`${base.toString()} => ${expected.toString()}`, () => {
    const actual = fromAltScale(base);

    expect(actual).toBe(expected);
  } );
} );
