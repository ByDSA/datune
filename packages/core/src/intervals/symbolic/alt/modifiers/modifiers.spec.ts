/* eslint-disable camelcase */
import type { Interval } from "../Interval";
import { Intervals as DIntervals } from "intervals/diatonic";
import { Intervals as I } from "..";
import { d } from "../quality/constants";
import { expectInterval } from "../tests/interval";
import { neg } from "./neg";
import { add } from "./add";
import { sub } from "./sub";

const { a5, a4, a2, a7, a1, d5, d9, M2, M7, M6, M3, m2, m7, m6, m3, P11, P4, P8, P12, P1, P5 } = I;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { FIFTH, FOURTH, neg: Dneg } = DIntervals;
// eslint-disable-next-line @typescript-eslint/naming-convention
const CASES_AmB = [
  [d5, m3, m3],
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
      const actual = add(a, b);

      expectInterval(actual, c);
    } );

    it(`-${String(b)} + -${String(a)} = -${String(c)}`, () => {
      const actual = add(neg(b), neg(a));

      expectInterval(actual, neg(c));
    } );

    it(`-${String(b)} + ${String(c)} = ${String(a)}`, () => {
      const actual = add(neg(b), c);

      expectInterval(actual, a);
    } );

    it(`${String(c)} + -${String(b)} = ${String(a)}`, () => {
      const actual = add(c, neg(b));

      expectInterval(actual, a);
    } );

    it(`${String(c)} - ${String(b)} = ${String(a)}`, () => {
      const actual = sub(c, b);

      expectInterval(actual, a);
    } );

    it(`${String(c)} - ${String(a)} = ${String(b)}`, () => {
      const actual = sub(c, a);

      expectInterval(actual, b);
    } );
  } );
} );
