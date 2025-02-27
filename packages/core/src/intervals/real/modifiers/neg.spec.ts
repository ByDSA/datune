import { ET12_PERFECT_FIFTH, J_AUGMENTED_FIFTH, OCTAVE, PT_AUGMENTED_SEVENTH, PT_AUGMENTED_UNISON, PT_DIMINISHED_SECOND, UNISON } from "../constants";
import Interval from "../Interval";
import { neg } from "./neg";
import add from "./add";
import { TestInit } from "tests";

TestInit.realInterval();

describe.each([
  ET12_PERFECT_FIFTH,
  add(ET12_PERFECT_FIFTH, OCTAVE),
  J_AUGMENTED_FIFTH,
  PT_AUGMENTED_SEVENTH,
  OCTAVE,
  PT_AUGMENTED_UNISON,
  PT_DIMINISHED_SECOND,
])("tests", (input: Interval): void => {
  it(`${input}`, (): void => {
    const actual = neg(input);

    expect(+actual.ratio).toEqual(1 / +input.ratio);
  } );

  it(`${input} + ${neg(input)} => ${UNISON}`, (): void => {
    const actual = add(input, neg(input));

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
