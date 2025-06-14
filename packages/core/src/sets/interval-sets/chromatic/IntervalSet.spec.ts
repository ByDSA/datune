import { Intervals as I } from "intervals/chromatic";
import { fromRootIntervals } from "./building/rootIntervals";
import { IntervalSets as IS } from ".";

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = I;
  const intervalSet = IS.TRIAD_MAJOR.withInv(2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(intervalSet).toBe(expected);
} );

it("withAdded", () => {
  const expected = IS.SEVENTH_MAJ7;
  const actual = IS.POWER_CHORD.withAdded(I.M7, I.M3);

  expect(actual).toBe(expected);
} );

it("withRemoved", () => {
  const expected = IS.POWER_CHORD;
  const actual = IS.SEVENTH_MAJ7.withRemoved(I.M7, I.M3);

  expect(actual).toBe(expected);
} );
