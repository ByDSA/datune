import { FIFTH } from "../constants";
import Direction from "../Direction";
import Interval from "../Interval";
import { neg } from "../modifiers/neg";
import fromInt from "./int";
import { TestInit } from "tests";

TestInit.diatonicInterval();

it("uncached", () => {
  const actual: Interval = fromInt(1234);
  const expected = fromInt(1234);

  expect(actual).toBe(expected);
} );

it("uncached 17", () => {
  const actual: Interval = fromInt(17);
  const expected = fromInt(17);

  expect(actual).toBe(expected);
} );

it("4 = FIFTH", () => {
  const actual: Interval = fromInt(4);
  const expected = FIFTH;

  expect(actual).toBe(expected);
} );

it("-4 = -FIFTH", () => {
  const actual: Interval = fromInt(-4);
  const expected = neg(FIFTH);

  expect(actual).toBe(expected);
} );

it("4 DESC = -FIFTH", () => {
  const actual: Interval = fromInt(4, Direction.DESCENDENT);
  const expected = neg(FIFTH);

  expect(actual).toBe(expected);
} );

it("-4 DESC = -FIFTH", () => {
  const actual: Interval = fromInt(-4, Direction.DESCENDENT);
  const expected = neg(FIFTH);

  expect(actual).toBe(expected);
} );
