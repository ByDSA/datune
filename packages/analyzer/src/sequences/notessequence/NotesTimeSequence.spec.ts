import { Keys as K } from "@datune/core/keys/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { Spns as N, Spn } from "@datune/core/spns/chromatic";
import { of as intervalOf } from "datils/math/intervals";
import { MusicalDurations as MD } from "@datune/core";
import { TestInit } from "tests";
import { NotesSequence } from "./NotesSequence";

TestInit.initAll();
const { QUARTER, WHOLE, ZERO } = MD;
const { add, C: P_C, D: P_D, E: P_E, F: P_F, G: P_G } = P;

function generateCMajorTest() {
  const s = new NotesSequence();

  for (const n of K.C.pitches) {
    const spn = N.fromPitchOctave(n, 4) as Spn;

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

  expect(s.nodes).toHaveLength(7);
} );

it("remove", () => {
  const s = generateCMajorTest();
  // eslint-disable-next-line prefer-destructuring
  const n2 = s.nodes[2];

  expect(s.nodes.includes(n2)).toBeTruthy();

  let [ok] = s.remove(n2);

  expect(ok).toBeTruthy();
  expect(s.nodes.includes(n2)).toBeFalsy();
  expect(s.nodes).toHaveLength(6);

  [ok] = s.remove(n2);

  expect(ok).toBeFalsy();
  expect(s.nodes).toHaveLength(6);
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
