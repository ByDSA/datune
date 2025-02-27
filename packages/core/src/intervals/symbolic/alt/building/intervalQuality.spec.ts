import { AUGMENTED_UNISON, MAJOR_TENTH, MAJOR_THIRD, PERFECT_FIFTH } from "../constants";
import Interval from "../Interval";
import { neg } from "../modifiers/neg";
import { fromIntervalQuality } from "./intervalQuality";
import { TestInit } from "tests";
import { AUGMENTED, MAJOR, MINOR, PERFECT, Quality } from "intervals/quality";
import { Intervals as DIntervals, Interval as DInterval } from "intervals/diatonic";

TestInit.diatonicAltInterval();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { FIFTH, neg: DNeg, TENTH, THIRD, UNISON } = DIntervals;

  it("should be defined", () => {
    const i = DIntervals.THIRD;
    const q = MAJOR;

    expect(i).toBeDefined();
    expect(q).toBeDefined();

    const actual = fromIntervalQuality(i, q);

    expect(actual).toBeDefined();
  } );

  describe("after initialization", () => {
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
    ])("tests", (diatonicInterval: DInterval, quality: Quality, expected: Interval | null) => {
      it(`(${diatonicInterval}, ${quality}) => ${expected}`, () => {
        const actual = fromIntervalQuality(diatonicInterval, quality);

        expect(actual).toBe(expected);
      } );
    } );
  } );
} );
