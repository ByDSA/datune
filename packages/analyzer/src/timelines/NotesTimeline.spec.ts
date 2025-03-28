import { Pitches as P } from "@datune/core/pitches/chromatic";
import { intervalBetween } from "datils/math/intervals";
import { MusicalDurations as MD } from "@datune/core";
import { generateNotesTimelineSampleCMajor } from "./tests/notes-sequence-samples";

const { QUARTER, WHOLE, ZERO } = MD;
const { D: P_D, E: P_E, F: P_F, G: P_G } = P;

it("every note time marks", () => {
  const s = generateNotesTimelineSampleCMajor();

  for (let n = 0; n < 7; n++) {
    const node = s.nodes[n];
    const expectedFrom = ZERO + (QUARTER * n);
    const expectedTo = QUARTER * (n + 1);

    expect(node.interval.from).toBe(expectedFrom);
    expect(node.interval.to).toBe(expectedTo);
  }
} );

it("musical length", () => {
  const s = generateNotesTimelineSampleCMajor();

  expect(s.duration).toEqual(QUARTER * (7));
} );

it("number of notes", () => {
  const s = generateNotesTimelineSampleCMajor();

  expect(s.nodes).toHaveLength(7);
} );

it("remove", () => {
  const s = generateNotesTimelineSampleCMajor();
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
  const s = generateNotesTimelineSampleCMajor();

  expect(s.nodes[4].event.pitch).toBe(P_G);
} );

it("pick by interval", () => {
  const s = generateNotesTimelineSampleCMajor();
  const interval = intervalBetween(QUARTER, WHOLE);
  const nodes = s.getAtInterval(interval);
  const notes = nodes.map((node) => node.event.pitch);

  expect(notes).toEqual([
    P_D,
    P_E,
    P_F,
  ]);
} );
