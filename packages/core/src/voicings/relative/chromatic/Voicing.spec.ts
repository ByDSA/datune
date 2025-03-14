import { Intervals as I } from "intervals/chromatic";
import { fromRootIntervals } from "./building/rootIntervals";
import { Voicings as V } from ".";

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = I;
  const voicing = V.TRIAD_MAJOR.withInv(2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(voicing).toBe(expected);
} );

it("withAdd", () => {
  const expected = V.SEVENTH_MAJ7;
  const actual = V.POWER_CHORD.withAdd(I.M7, I.M3);

  expect(actual).toBe(expected);
} );

it("withOmit", () => {
  const expected = V.POWER_CHORD;
  const actual = V.SEVENTH_MAJ7.withOmit(I.M7, I.M3);

  expect(actual).toBe(expected);
} );
