/* eslint-disable camelcase */
import type { Interval } from "../Interval";
import { Intervals as DI } from "intervals/diatonic";
import { Intervals as I } from "..";
import { d } from "../quality/constants";
import { expectInterval } from "../tests/interval";
import { neg } from "./neg";
import { shift } from "./shift";
import { shiftDown } from "./shiftDown";

const { a5, a4, a2, a7, a1, d5, d9, M2, M7, M6, M3, m2, m7, m6, m3, P11, P4, P8, P12, P1, P5 } = I;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { FIFTH, FOURTH, neg: Dneg } = DI;
// eslint-disable-next-line @typescript-eslint/naming-convention
const CASES_AmB = [
  [d5, m3, m3],
  [d5.withNeg(), m3.withNeg(), m3.withNeg()],
  [a5, M3, M3],
  [M3, M2, M2],
  [M3, m2, a2],
  [m3, M2, m2],
  [M3, m3, a1],
  [M2, m2, a1],
  [M6, m6, a1],
  [M7, m7, a1],
  [P5, P4, M2],
  [d9, d5, d5],
  [a7, a4, a4],
  [P1, d5,
     I.fromIntervalQuality(Dneg(FIFTH), d) as Interval],
  [P1, P1, P1],
  [P8, m2, M7],
  [P8, M2, m7],
  [P8, m3, M6],
  [P8, M3, m6],
  [P8, P4, P5],
  [P8, a4, d5],
  [P8, d5, a4],
  [P8, a5, I.fromIntervalQuality(FOURTH, d) as Interval],
  [M3, P1, M3],
  [P1, M3, neg(M3)],
  [P1, P12, neg(P12)],
  [P8, P11, neg(P4)],
  [P11, P8, P4],
];
const CASES_SUMA = [...CASES_AmB.map(
  (t) => [t[2], t[1], t[0]],
),
[P8, P4, P11],
];

describe("a + B", () => {
  describe.each(
    CASES_SUMA,
  )("tests", (a, b, c) => {
    it(`${String(a)} + ${String(b)} = ${String(c)}`, () => {
      const actual = shift(a, b);

      expectInterval(actual, c);
    } );

    it(`-${String(b)} + -${String(a)} = -${String(c)}`, () => {
      const actual = shift(neg(b), neg(a));

      expectInterval(actual, neg(c));
    } );

    it(`-${String(b)} + ${String(c)} = ${String(a)}`, () => {
      const actual = shift(neg(b), c);

      expectInterval(actual, a);
    } );

    it(`${String(c)} + -${String(b)} = ${String(a)}`, () => {
      const actual = shift(c, neg(b));

      expectInterval(actual, a);
    } );

    it(`${String(c)} - ${String(b)} = ${String(a)}`, () => {
      const actual = shiftDown(c, b);

      expectInterval(actual, a);
    } );

    it(`${String(c)} - ${String(a)} = ${String(b)}`, () => {
      const actual = shiftDown(c, a);

      expectInterval(actual, b);
    } );
  } );
} );

it("sharp limit", () => {
  const five = I.from(DI.UNISON, 5);
  const six = I.from(DI.UNISON, 6);
  const seven = I.from(DI.UNISON, 7);

  expect(five.alts).toBe(5);
  expect(six.alts).toBe(6);
  expect(seven.alts).toBe(-5);
} );

it("bemol limit", () => {
  const five = I.from(DI.UNISON, -5);
  const six = I.from(DI.UNISON, -6);
  const seven = I.from(DI.UNISON, -7);

  expect(five.alts).toBe(-5);
  expect(six.alts).toBe(6);
  expect(seven.alts).toBe(5);
} );

describe("d8, P8, non commutative", () => {
  it("d8 + a1 = P8", () => {
    const actual = I.d8.withShifted(I.a1);

    expect(actual).toBe(I.P8);
  } );

  it("p8 - d8 = a1", () => {
    const actual = I.P8.withShiftedDown(I.d8);

    expect(actual).toBe(I.a1);
  } );

  it("p8 - a8 = d1", () => {
    const actual = I.P8.withShiftedDown(I.a8);

    expect(actual).toBe(I.d1);
  } );
} );

it("a1 + d1 = P1", () => {
  const base1 = I.a1;
  const base2 = I.d1;
  const actual = base1.withShifted(base2);

  expect(actual).toBe(I.P1);
} );

it("a1 == -d1 = 1", () => {
  const a1Chromatic = I.a1.toChromaticInterval();

  expect(a1Chromatic).toBe(1);
  expect(a1Chromatic).toBe(I.d1.withNeg().toChromaticInterval());
} );

it("-a1 == d1 = -1", () => {
  const d1Chromatic = I.d1.toChromaticInterval();

  expect(d1Chromatic).toBe(-1);
  expect(I.a1.withNeg().toChromaticInterval()).toBe(d1Chromatic);
} );
