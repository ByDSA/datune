import { Intervals } from "@datune/core/intervals/diatonic";
import { TestLang } from "tests/index";
import { stringifyInterval } from ".";

TestLang.loadAll();

it("toString() - ENG", () => {
  const actual: string = stringifyInterval(Intervals.UNISON);
  const expected = "UNISON";

  expect(actual).toEqual(expected);
} );
