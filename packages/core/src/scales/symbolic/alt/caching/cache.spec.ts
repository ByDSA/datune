import { MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_UNISON } from "intervals/alt";
import { TestInit } from "tests";
import { fromRootIntervals } from "../building";
import { MAJOR, PHRYGIAN } from "../constants";
import hash from "./hash";
import toDto from "./toDto";

TestInit.diatonicAltScale();

const P1 = PERFECT_UNISON;
const m2 = MINOR_SECOND;
const M2 = MAJOR_SECOND;
const m3 = MINOR_THIRD;
const M3 = MAJOR_THIRD;
const P4 = PERFECT_FOURTH;
const P5 = PERFECT_FIFTH;
const m6 = MINOR_SIXTH;
const M6 = MAJOR_SIXTH;
const m7 = MINOR_SEVENTH;
const M7 = MAJOR_SEVENTH;
const PHRYGIAN_INLINE = fromRootIntervals(P1, m2, m3, P4, P5, m6, m7);
const MAJOR_INLINE = fromRootIntervals(P1, M2, M3, P4, P5, M6, M7);

describe.each([
  [PHRYGIAN_INLINE, PHRYGIAN],
  [MAJOR_INLINE, MAJOR],
])("tests", (actual, expected) => {
  it(`actual: ${String(actual)} => expected: ${String(expected)}`, () => {
    expect(actual).toBe(expected);
  } );

  it("same dto", () => {
    expect(toDto(actual)).toEqual(toDto(expected));
  } );
  it("same hash", () => {
    expect(hash(toDto(actual))).toBe(hash(toDto(expected)));
  } );
} );
