import type { Scale } from "../Scale";
import { Scales as S } from "..";
import { hash } from "./hash";

const { MAJOR, MINOR } = S;

describe.each([
  [MAJOR, "+0P|+1M|+2M|+3P|+4P|+5M|+6M"],
  [MINOR, "+0P|+1M|+2m|+3P|+4P|+5m|+6m"],
])("tests", (scale: Scale, expected: string) => {
  it(`${scale} => ${expected}`, () => {
    const actual = hash(scale);

    expect(actual).toBe(expected);
  } );
} );
