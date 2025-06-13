import type { Scale } from "./Scale";
import { Scales as S } from ".";

describe.each([
  [S.MAJOR, "Major"],
  [S.MINOR, "Minor"],
  [S.PHRYGIAN, "I-♭II-♭III-IV-V-♭VI-♭VII"],
])("toString", (scale: Scale, expected: string) => {
  it(`${scale} => ${expected}`, () => {
    const actual = String(scale);

    expect(actual).toBe(expected);
  } );
} );
