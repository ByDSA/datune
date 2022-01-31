import { FIFTH, Interval as DiatonicInterval, neg as DNeg, TENTH, THIRD, UNISON } from "intervals/diatonic";
import { AUGMENTED, MAJOR, MINOR, PERFECT, Quality } from "intervals/quality";
import { TestInit } from "tests";
import { AUGMENTED_UNISON, MAJOR_TENTH, MAJOR_THIRD, PERFECT_FIFTH } from "../constants";
import Interval from "../Interval";
import { neg } from "../modifiers";
import fromIntervalQuality from "./intervalQuality";

TestInit.diatonicAltInterval();

describe.each([
  [THIRD, MAJOR, MAJOR_THIRD],
  [DNeg(THIRD), MAJOR, neg(MAJOR_THIRD)],
  [DNeg(FIFTH), PERFECT, neg(PERFECT_FIFTH)],
  [DNeg(UNISON), AUGMENTED, neg(AUGMENTED_UNISON)],
  [TENTH, MAJOR, MAJOR_TENTH],
  // invalids
  [FIFTH, MAJOR, null],
  [FIFTH, MINOR, null],
  [THIRD, PERFECT, null],
])("tests", (diatonicInterval: DiatonicInterval, quality: Quality, expected: Interval | null) => {
  it(`(${diatonicInterval}, ${quality}) => ${expected}`, () => {
    const actual = fromIntervalQuality(diatonicInterval, quality);

    expect(actual).toBe(expected);
  } );
} );
