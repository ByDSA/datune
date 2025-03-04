import type { Interval } from "../Interval";
import type { Quality } from "../quality/Quality";
import { TestInit } from "tests";
import { Intervals as DIntervals, Interval as DInterval } from "intervals/diatonic";
import { a1, M10, M3, P5 } from "../constants";
import { neg } from "../modifiers/neg";
import { a, M, m, P } from "../quality/constants";
import { expectInterval } from "../tests/interval";
import { fromIntervalQuality } from "./intervalQuality";

TestInit.diatonicAltInterval();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { FIFTH, neg: DNeg, TENTH, THIRD, UNISON } = DIntervals;

  it("should be defined", () => {
    const i = DIntervals.THIRD;
    const q = M;

    expect(i).toBeDefined();
    expect(q).toBeDefined();

    const actual = fromIntervalQuality(i, q);

    expect(actual).toBeDefined();
  } );

  describe("after initialization", () => {
    describe.each([
      [THIRD, M, M3],
      [DNeg(THIRD), M, neg(M3)],
      [DNeg(FIFTH), P, neg(P5)],
      [DNeg(UNISON), a, neg(a1)],
      [TENTH, M, M10],
      // invalids
      [FIFTH, M, null],
      [FIFTH, m, null],
      [THIRD, P, null],
    ])("tests", (diatonicInterval: DInterval, quality: Quality, expected: Interval | null) => {
      it(`(${diatonicInterval}, ${quality}) => ${expected}`, () => {
        const actual = fromIntervalQuality(diatonicInterval, quality);

        expectInterval(actual, expected);
      } );
    } );
  } );
} );
