import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { IntervalSets as IS } from "..";
import { fromIntervalSets } from "./intervalSets";

const { SEVENTH } = IS;

it("fromIntervalSets - IntervalSet SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH", () => {
  const intervalSet = fromIntervalSets(CIS.SEVENTH, DIS.SEVENTH);
  const intervalSet2 = SEVENTH;

  expect(intervalSet2).toBe(intervalSet);
} );
