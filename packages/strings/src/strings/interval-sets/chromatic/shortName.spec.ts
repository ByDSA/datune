/* eslint-disable no-restricted-syntax */
import { IntervalSets as IS, IntervalSet } from "@datune/core";
import { stringifyShortNameLang } from "./shortName";

// eslint-disable-next-line jest/expect-expect
it("most of triads should have name", () => {
  const ignore = new Set([
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 1, 5],
    [0, 1, 9],
    [0, 1, 10],
    [0, 2, 4],
  ].map(String));

  IS.TRIAD_SUS2; // Initialize intervalSets

  for (let i = 0; i < 12 - 2; i++) {
    for (let j = i + 1; j < 12 - 1; j++) {
      inner: for (let k = j + 1; k < 12; k++) {
        let intervalSet = IS.fromRootIntervals(i, j, k);
        const group = getInversionsGroup(intervalSet);

        for (const v of group) {
          if (ignore.has(v.rootIntervals.toString()))
            continue inner;

          const name = stringifyShortNameLang(v);

          if (name !== null)
            continue inner;
        }

        throw new Error("IntervalSet with no name: " + group.map(v=>"[" + v.rootIntervals.join(", ") + "]").join(" "));
      }
    }
  }
} );

function getInversionsGroup(intervalSet: IntervalSet): IntervalSet[] {
  const ret: IntervalSet[] = [intervalSet];

  for (let i = 1; i < intervalSet.length; i++)
    ret.push(intervalSet.withInv(i));

  return ret;
}
