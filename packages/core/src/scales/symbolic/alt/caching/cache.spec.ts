import { Intervals as I } from "intervals/alt";
import { fromRootIntervals } from "../building";
import { Scales as S } from "..";
import { getKey, getId } from "./cache";

const { MAJOR, PHRYGIAN } = S;
const { M2, M7, M6, M3, m2, m7, m6, m3, P5, P4, P1 } = I;
const PHRYGIAN_INLINE = fromRootIntervals(P1, m2, m3, P4, P5, m6, m7);
const MAJOR_INLINE = fromRootIntervals(P1, M2, M3, P4, P5, M6, M7);

describe.each([
  [PHRYGIAN_INLINE, PHRYGIAN],
  [MAJOR_INLINE, MAJOR],
])("tests", (actual, expected) => {
  it(`actual: ${String(actual)} => expected: ${String(expected)}`, () => {
    expect(actual).toBe(expected);
  } );

  it("same key", () => {
    expect(getKey(actual)).toEqual(getKey(expected));
  } );

  it("same id", () => {
    expect(getId(getKey(actual))).toBe(getId(getKey(expected)));
  } );
} );
