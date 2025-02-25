import { TestInit } from "tests";
import { ET12_PERFECT_FIFTH, OCTAVE, PT_COMMA, PT_PERFECT_FIFTH, UNISON } from "./constants";
import { mult, sub } from "./modifiers";

TestInit.realInterval();

it("Pythagorean Comma", () => {
  const expected = PT_COMMA;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(PT_PERFECT_FIFTH, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );

it("In ET12, Comma = UNISON", () => {
  const expected = UNISON;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(ET12_PERFECT_FIFTH, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );
