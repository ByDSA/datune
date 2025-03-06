import { Intervals as I } from "..";
import { add } from "./add";
import { neg } from "./neg";

const { ELEVENTH, FIFTEENTH, FIFTH, FOURTEENTH,
  FOURTH, NINTH, OCTAVE, SECOND, SEVENTH, SIXTH,
  TENTH, THIRD, THIRTEENTH, TWELFTH, UNISON } = I;

describe.each([
  [UNISON, SECOND, SECOND],
  [UNISON, THIRD, THIRD],
  [UNISON, FOURTH, FOURTH],
  [UNISON, FIFTH, FIFTH],
  [UNISON, SIXTH, SIXTH],
  [UNISON, SEVENTH, SEVENTH],
  [UNISON, OCTAVE, OCTAVE],
  [UNISON, NINTH, NINTH],
  [UNISON, TENTH, TENTH],
  [UNISON, ELEVENTH, ELEVENTH],
  [UNISON, TWELFTH, TWELFTH],
  [UNISON, THIRTEENTH, THIRTEENTH],
  [UNISON, FOURTEENTH, FOURTEENTH],
  [UNISON, FIFTEENTH, FIFTEENTH],
  [SECOND, SECOND, THIRD],
  [SECOND, THIRD, FOURTH],
  [SECOND, FOURTH, FIFTH],
  [SECOND, FIFTH, SIXTH],
  [SECOND, SIXTH, SEVENTH],
  [SECOND, SEVENTH, OCTAVE],
  [SECOND, OCTAVE, NINTH],
  [SECOND, NINTH, TENTH],
  [SECOND, TENTH, ELEVENTH],
  [SECOND, ELEVENTH, TWELFTH],
  [SECOND, TWELFTH, THIRTEENTH],
  [SECOND, THIRTEENTH, FOURTEENTH],
  [SECOND, FOURTEENTH, FIFTEENTH],
  [THIRD, THIRD, FIFTH],
  [THIRD, FOURTH, SIXTH],
  [THIRD, FIFTH, SEVENTH],
  [THIRD, SIXTH, OCTAVE],
  [THIRD, SEVENTH, NINTH],
  [THIRD, OCTAVE, TENTH],
  [THIRD, NINTH, ELEVENTH],
  [THIRD, TENTH, TWELFTH],
  [THIRD, ELEVENTH, THIRTEENTH],
  [THIRD, TWELFTH, FOURTEENTH],
  [THIRD, THIRTEENTH, FIFTEENTH],
  [FOURTH, FOURTH, SEVENTH],
  [FOURTH, FIFTH, OCTAVE],
  [FOURTH, SIXTH, NINTH],
  [FOURTH, SEVENTH, TENTH],
  [FOURTH, OCTAVE, ELEVENTH],
  [FOURTH, NINTH, TWELFTH],
  [FOURTH, TENTH, THIRTEENTH],
  [FOURTH, ELEVENTH, FOURTEENTH],
  [FOURTH, TWELFTH, FIFTEENTH],
  [FIFTH, FIFTH, NINTH],
  [FIFTH, SIXTH, TENTH],
  [FIFTH, SEVENTH, ELEVENTH],
  [FIFTH, OCTAVE, TWELFTH],
  [FIFTH, NINTH, THIRTEENTH],
  [FIFTH, TENTH, FOURTEENTH],
  [FIFTH, ELEVENTH, FIFTEENTH],
  [SIXTH, SIXTH, ELEVENTH],
  [SIXTH, SEVENTH, TWELFTH],
  [SIXTH, OCTAVE, THIRTEENTH],
  [SIXTH, NINTH, FOURTEENTH],
  [SIXTH, TENTH, FIFTEENTH],
  [SEVENTH, SEVENTH, THIRTEENTH],
  [SEVENTH, OCTAVE, FOURTEENTH],
  [SEVENTH, NINTH, FIFTEENTH],
  [OCTAVE, OCTAVE, FIFTEENTH],
])("two ascendent - two desc", (a, b, c) => {
  it(`${a} + ${b} = ${c}`, () => {
    const actual = add(a, b);

    expect(actual).toBe(c);
  } );

  it(`${b} + ${a} = ${c}`, () => {
    const actual = add(b, a);

    expect(actual).toBe(c);
  } );

  it(`-${a} + -${b} = -${c}`, () => {
    const actual = add(neg(a), neg(b));

    expect(actual).toBe(neg(c));
  } );

  it(`-${b} + -${a} = -${c}`, () => {
    const actual = add(neg(b), neg(a));

    expect(actual).toBe(neg(c));
  } );
} );

describe.each([
  [UNISON, SECOND, neg(SECOND)],
  [UNISON, THIRD, neg(THIRD)],
  [UNISON, FOURTH, neg(FOURTH)],
  [UNISON, FIFTH, neg(FIFTH)],
  [UNISON, SIXTH, neg(SIXTH)],
  [UNISON, SEVENTH, neg(SEVENTH)],
  [UNISON, OCTAVE, neg(OCTAVE)],
  [UNISON, NINTH, neg(NINTH)],
  [UNISON, TENTH, neg(TENTH)],
  [UNISON, ELEVENTH, neg(ELEVENTH)],
  [UNISON, TWELFTH, neg(TWELFTH)],
  [UNISON, THIRTEENTH, neg(THIRTEENTH)],
  [UNISON, FOURTEENTH, neg(FOURTEENTH)],
  [UNISON, FIFTEENTH, neg(FIFTEENTH)],
  [SECOND, SECOND, UNISON],
  [SECOND, THIRD, neg(SECOND)],
  [SECOND, FOURTH, neg(THIRD)],
  [SECOND, FIFTH, neg(FOURTH)],
  [SECOND, SIXTH, neg(FIFTH)],
  [SECOND, SEVENTH, neg(SIXTH)],
  [SECOND, OCTAVE, neg(SEVENTH)],
  [SECOND, NINTH, neg(OCTAVE)],
  [SECOND, TENTH, neg(NINTH)],
  [SECOND, ELEVENTH, neg(TENTH)],
  [SECOND, TWELFTH, neg(ELEVENTH)],
  [SECOND, THIRTEENTH, neg(TWELFTH)],
  [SECOND, FOURTEENTH, neg(THIRTEENTH)],
  [SECOND, FIFTEENTH, neg(FOURTEENTH)],
  [THIRD, THIRD, UNISON],
  [THIRD, FOURTH, neg(SECOND)],
  [THIRD, FIFTH, neg(THIRD)],
  [THIRD, SIXTH, neg(FOURTH)],
  [THIRD, SEVENTH, neg(FIFTH)],
  [THIRD, OCTAVE, neg(SIXTH)],
  [THIRD, NINTH, neg(SEVENTH)],
  [THIRD, TENTH, neg(OCTAVE)],
  [THIRD, ELEVENTH, neg(NINTH)],
  [THIRD, TWELFTH, neg(TENTH)],
  [THIRD, THIRTEENTH, neg(ELEVENTH)],
  [THIRD, FOURTEENTH, neg(TWELFTH)],
  [THIRD, FIFTEENTH, neg(THIRTEENTH)],
  [FOURTH, FOURTH, UNISON],
  [FOURTH, FIFTH, neg(SECOND)],
  [FOURTH, SIXTH, neg(THIRD)],
  [FOURTH, SEVENTH, neg(FOURTH)],
  [FOURTH, OCTAVE, neg(FIFTH)],
  [FOURTH, NINTH, neg(SIXTH)],
  [FOURTH, TENTH, neg(SEVENTH)],
  [FOURTH, ELEVENTH, neg(OCTAVE)],
  [FOURTH, TWELFTH, neg(NINTH)],
  [FOURTH, THIRTEENTH, neg(TENTH)],
  [FOURTH, FOURTEENTH, neg(ELEVENTH)],
  [FOURTH, FIFTEENTH, neg(TWELFTH)],
  [FIFTH, FIFTH, UNISON],
  [FIFTH, SIXTH, neg(SECOND)],
  [FIFTH, SEVENTH, neg(THIRD)],
  [FIFTH, OCTAVE, neg(FOURTH)],
  [FIFTH, NINTH, neg(FIFTH)],
  [FIFTH, TENTH, neg(SIXTH)],
  [FIFTH, ELEVENTH, neg(SEVENTH)],
  [FIFTH, TWELFTH, neg(OCTAVE)],
  [FIFTH, THIRTEENTH, neg(NINTH)],
  [FIFTH, FOURTEENTH, neg(TENTH)],
  [FIFTH, FIFTEENTH, neg(ELEVENTH)],
  [SIXTH, SIXTH, UNISON],
  [SIXTH, SEVENTH, neg(SECOND)],
  [SIXTH, OCTAVE, neg(THIRD)],
  [SIXTH, NINTH, neg(FOURTH)],
  [SIXTH, TENTH, neg(FIFTH)],
  [SIXTH, ELEVENTH, neg(SIXTH)],
  [SIXTH, TWELFTH, neg(SEVENTH)],
  [SIXTH, THIRTEENTH, neg(OCTAVE)],
  [SIXTH, FOURTEENTH, neg(NINTH)],
  [SIXTH, FIFTEENTH, neg(TENTH)],
  [SEVENTH, SEVENTH, UNISON],
  [SEVENTH, OCTAVE, neg(SECOND)],
  [SEVENTH, NINTH, neg(THIRD)],
  [SEVENTH, TENTH, neg(FOURTH)],
  [SEVENTH, ELEVENTH, neg(FIFTH)],
  [SEVENTH, TWELFTH, neg(SIXTH)],
  [SEVENTH, THIRTEENTH, neg(SEVENTH)],
  [SEVENTH, FOURTEENTH, neg(OCTAVE)],
  [SEVENTH, FIFTEENTH, neg(NINTH)],
  [OCTAVE, OCTAVE, UNISON],
  [OCTAVE, NINTH, neg(SECOND)],
  [OCTAVE, TENTH, neg(THIRD)],
  [OCTAVE, ELEVENTH, neg(FOURTH)],
  [OCTAVE, TWELFTH, neg(FIFTH)],
  [OCTAVE, THIRTEENTH, neg(SIXTH)],
  [OCTAVE, FOURTEENTH, neg(SEVENTH)],
  [OCTAVE, FIFTEENTH, neg(OCTAVE)],
  [NINTH, NINTH, UNISON],
  [NINTH, TENTH, neg(SECOND)],
  [NINTH, ELEVENTH, neg(THIRD)],
  [NINTH, TWELFTH, neg(FOURTH)],
  [NINTH, THIRTEENTH, neg(FIFTH)],
  [NINTH, FOURTEENTH, neg(SIXTH)],
  [NINTH, FIFTEENTH, neg(SEVENTH)],
  [TENTH, TENTH, UNISON],
  [TENTH, ELEVENTH, neg(SECOND)],
  [TENTH, TWELFTH, neg(THIRD)],
  [TENTH, THIRTEENTH, neg(FOURTH)],
  [TENTH, FOURTEENTH, neg(FIFTH)],
  [TENTH, FIFTEENTH, neg(SIXTH)],
  [ELEVENTH, ELEVENTH, UNISON],
  [ELEVENTH, TWELFTH, neg(SECOND)],
  [ELEVENTH, THIRTEENTH, neg(THIRD)],
  [ELEVENTH, FOURTEENTH, neg(FOURTH)],
  [ELEVENTH, FIFTEENTH, neg(FIFTH)],
  [TWELFTH, TWELFTH, UNISON],
  [TWELFTH, THIRTEENTH, neg(SECOND)],
  [TWELFTH, FOURTEENTH, neg(THIRD)],
  [TWELFTH, FIFTEENTH, neg(FOURTH)],
  [THIRTEENTH, THIRTEENTH, UNISON],
  [THIRTEENTH, FOURTEENTH, neg(SECOND)],
  [THIRTEENTH, FIFTEENTH, neg(THIRD)],
  [FOURTEENTH, FOURTEENTH, UNISON],
  [FOURTEENTH, FIFTEENTH, neg(SECOND)],
  [FIFTEENTH, FIFTEENTH, UNISON],
])("asc - desc", (a, b, c) => {
  it(`${a} + -${b} = ${c}`, () => {
    const actual = add(a, neg(b));

    expect(actual).toBe(c);
  } );

  it(`-${b} + ${a} = ${c}`, () => {
    const actual = add(neg(b), a);

    expect(actual).toBe(c);
  } );
} );

describe("uNISON", () => {
  it(`${UNISON} + ${UNISON} = ${UNISON}`, () => {
    const actual = add(UNISON, UNISON);

    expect(actual).toBe(UNISON);
  } );

  it(`${UNISON} + -${UNISON} = ${UNISON}`, () => {
    const actual = add(UNISON, neg(UNISON));

    expect(actual).toBe(UNISON);
  } );

  it(`-${UNISON} + ${UNISON} = ${UNISON}`, () => {
    const actual = add(neg(UNISON), UNISON);

    expect(actual).toBe(UNISON);
  } );

  it(`-${UNISON} + -${UNISON} = ${UNISON}`, () => {
    const actual = add(neg(UNISON), neg(UNISON));

    expect(actual).toBe(UNISON);
  } );
} );
