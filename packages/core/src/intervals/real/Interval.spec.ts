import { TestInit } from "tests";
import { ET12_P5, OCTAVE, PT_COMMA, PT_P5, UNISON } from "./constants";
import { sub } from "./modifiers/independentModifiers";
import { mult } from "./modifiers/mult";

TestInit.realInterval();

it("pythagorean Comma", () => {
  const expected = PT_COMMA;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(PT_P5, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );

it("in ET12, Comma = UNISON", () => {
  const expected = UNISON;
  const sevenOctaves = mult(OCTAVE, 7);
  const twelveFifths = mult(ET12_P5, 12);
  const actual = sub(twelveFifths, sevenOctaves);

  expect(actual).toBe(expected);
} );
