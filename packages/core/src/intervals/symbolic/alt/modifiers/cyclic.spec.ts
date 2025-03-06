import { expectInterval } from "../tests/interval";
import { Intervals as I } from "..";
import { neg } from "./neg";
import { cyclic } from "./cyclic";

describe.each([
  [neg(I.P5), I.P4],
  [I.P4, I.P4],
  [I.P11, I.P4],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${String(expected)}`, () => {
    const actual = cyclic(interval);

    expectInterval(actual, expected);
  } );
} );
