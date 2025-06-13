/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { neg } from "./neg";
import { shift } from "./shift";

const { ET12_P5, J_a5, OCTAVE, PT_a7, PT_a1, PT_d2, UNISON } = I;

describe.each([
  ET12_P5,
  shift(ET12_P5, OCTAVE),
  J_a5,
  PT_a7,
  OCTAVE,
  PT_a1,
  PT_d2,
])("tests", (input: Interval): void => {
  it(`${input}`, (): void => {
    const actual = neg(input);

    expect(+actual.ratio).toEqual(1 / +input.ratio);
  } );

  it(`${input} + ${neg(input)} => ${UNISON}`, (): void => {
    const actual = shift(input, neg(input));

    expect(actual).toBe(UNISON);
  } );

  it(`--${input}`, (): void => {
    const actual = neg(neg(input));

    expect(actual).toBe(input);
  } );
} );

it("unison", () => {
  const expected = UNISON;
  const actual = neg(UNISON);

  expect(actual).toBe(expected);
} );
