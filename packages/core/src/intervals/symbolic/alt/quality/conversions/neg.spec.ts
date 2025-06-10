import { d, m, M, P, dd, da, a } from "../constants";
import { Quality } from "../Quality";
import { neg } from "./neg";

describe.each([
  [m, M],
  [M, m],
  [P, P],
  [a, d],
  [da, dd],
  [d, a],
  [dd, da],
])("neg", (base: Quality, expected: Quality) => {
  it("test", () => {
    const actual = neg(base);

    expect(actual).toBe(expected);
  } );
} );
