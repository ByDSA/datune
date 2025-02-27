import { MusicalDuration, MusicalDurations } from "../musical-duration";
import { from } from "./building";
import { QUARTER_120 } from "./constants";
import { TestInit } from "tests";

TestInit.bpm();

it("from - 120 QUARTER", () => {
  const n = 120;
  const beat: MusicalDuration = MusicalDurations.QUARTER;
  const bpm = from(n, beat);

  expect(bpm.bpm).toEqual(n);
  expect(beat).toBeDefined();
  expect(bpm.beat).toEqual(beat);
} );

it("from - 120", () => {
  const n = 120;
  const bpm = from(n);
  const expectedBeat: MusicalDuration = MusicalDurations.QUARTER;

  expect(bpm.bpm).toEqual(n);
  expect(expectedBeat).toBeDefined();
  expect(bpm.beat).toEqual(expectedBeat);
} );

it("getMillis - QUARTER_120 - WHOLE = 2s", () => {
  const bpm = QUARTER_120;
  const actualDuration = bpm.getMillis(MusicalDurations.WHOLE);
  const expectedDuration: number = 2000;

  expect(actualDuration).toEqual(expectedDuration);
} );

it("getMillis - QUARTER_120 - QUARTER = 0.5s", () => {
  const bpm = QUARTER_120;
  const actualDuration = bpm.getMillis(MusicalDurations.QUARTER);
  const expectedDuration: number = 500;

  expect(actualDuration).toEqual(expectedDuration);
} );
