/* eslint-disable no-restricted-syntax */
import { Voicings as V, Voicing } from "@datune/core";
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

  V.TRIAD_SUS2; // Initialize voicings

  for (let i = 0; i < 12 - 2; i++) {
    for (let j = i + 1; j < 12 - 1; j++) {
      inner: for (let k = j + 1; k < 12; k++) {
        let voicing = V.fromRootIntervals(i, j, k);
        const group = getInversionsGroup(voicing);

        for (const v of group) {
          if (ignore.has(v.rootIntervals.toString()))
            continue inner;

          const name = stringifyShortNameLang(v);

          if (name !== null)
            continue inner;
        }

        throw new Error("Voicing with no name: " + group.map(v=>"[" + v.rootIntervals.join(", ") + "]").join(" "));
      }
    }
  }
} );

function getInversionsGroup(voicing: Voicing): Voicing[] {
  const ret: Voicing[] = [voicing];

  for (let i = 1; i < voicing.length; i++)
    ret.push(voicing.withInv(i));

  return ret;
}
