import { ET12_PERFECT_FIFTH, OCTAVE, PT_COMMA, PT_PERFECT_FIFTH, UNISON } from "./constants";
import { sub } from "./modifiers/independentModifiers";
import { mult } from "./modifiers/mult";
import { TestInit } from "tests";

TestInit.realInterval();

it("pythagorean Comma", () => {
  const expected = PT_COMMA;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(PT_PERFECT_FIFTH, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );

it("in ET12, Comma = UNISON", () => {
  const expected = UNISON;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(ET12_PERFECT_FIFTH, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );
