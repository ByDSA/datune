import { C as T_C } from "@datune/core/keys/chromatic";
import { add, C as P_C, D as P_D, E as P_E, F as P_F, G as P_G } from "@datune/core/pitches/chromatic";
import { fromPitchOctave as spnFrom, SPN } from "@datune/core/spns/chromatic";
import { QUARTER, WHOLE, ZERO } from "@datune/core/time";
import { intervalOf } from "@datune/utils/math";
import { TestInit } from "tests";
import NotesSequence from "./NotesSequence";

TestInit.initAll();
function generateCMajorTest() {
  const s = new NotesSequence();

  for (const n of T_C.pitches) {
    const spn = spnFrom(n, 4) as SPN;

    s.add( {
      event: spn,
      from: s.duration,
      to: s.duration + QUARTER,
    } );
  }

  return s;
}

it("every note time marks", () => {
  const s = generateCMajorTest();

  for (let n = 0; n < 7; n++) {
    const node = s.nodes[n];
    const expectedFrom = ZERO + (QUARTER * n);
    const expectedTo = QUARTER * (n + 1);

    expect(node.interval.from).toBe(expectedFrom);
    expect(node.interval.to).toBe(expectedTo);
  }
} );

it("musical length", () => {
  const s = generateCMajorTest();

  expect(s.duration).toEqual(QUARTER * (7));
} );

it("number of notes", () => {
  const s = generateCMajorTest();

  expect(s.nodes.length).toBe(7);
} );

it("remove", () => {
  const s = generateCMajorTest();
  const n2 = s.nodes[2];

  expect(s.nodes.includes(n2)).toBeTruthy();

  let [ok] = s.remove(n2);

  expect(ok).toBeTruthy();
  expect(s.nodes.includes(n2)).toBeFalsy();
  expect(s.nodes.length).toBe(6);

  [ok] = s.remove(n2);
  expect(ok).toBeFalsy();
  expect(s.nodes.length).toBe(6);
} );

it("pick by node position", () => {
  const s = generateCMajorTest();

  expect(s.nodes[4].event.pitch).toBe(P_G);
} );

it("a", () => {
  const expected = P_D;
  const actual = add(P_C, 2);

  expect(actual).toBe(expected);
} );

it("pick by interval", () => {
  const s = generateCMajorTest();
  const interval = intervalOf(QUARTER, WHOLE);
  const nodes = s.get( {
    interval,
  } );
  const notes = nodes.map((node) => node.event.pitch);

  expect(notes).toEqual([
    P_D,
    P_E,
    P_F,
  ]);
} );
