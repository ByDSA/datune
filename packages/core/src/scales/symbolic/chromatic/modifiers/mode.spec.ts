import type { Scale } from "../Scale";
import { Scales as S } from "..";
import { mode } from ".";

const { DORIAN, AEOLIAN, IONIAN, LOCRIAN, LYDIAN, MAJOR, MIXOLYDIAN, PHRYGIAN } = S;

describe.each(<[Scale, number, Scale][]>[
  [MAJOR, 1, IONIAN],
  [MAJOR, 2, DORIAN],
  [MAJOR, 3, PHRYGIAN],
  [MAJOR, 4, LYDIAN],
  [MAJOR, 5, MIXOLYDIAN],
  [MAJOR, 6, AEOLIAN],
  [MAJOR, 7, LOCRIAN],
  [MAJOR, 8, IONIAN],
])("get that scale", (scaleBase, n: number, scaleTarget) => {
  it(`${String(scaleBase)} mode=${n}=> ${String(scaleTarget)}`, () => {
    const actual = mode(scaleBase, n);

    expect(actual).toBe(scaleTarget);
  } );

  it(`${String(scaleTarget)} mode=${-n}=> ${String(scaleBase)}`, () => {
    const actual = mode(scaleTarget, -n);

    expect(actual).toBe(scaleBase);
  } );
} );
