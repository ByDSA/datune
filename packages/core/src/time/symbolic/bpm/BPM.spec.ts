import { initialize as initializeMD, MusicalDuration, QUARTER, WHOLE } from "../musical-duration";
import { from } from "./building";
import { initialize, QUARTER_120 } from "./constants";

beforeAll(() => {
  initializeMD();
  initialize();
} );

it("from - 120 QUARTER", () => {
  const n = 120;
  const beat: MusicalDuration = QUARTER;
  const bpm = from(n, beat);

  expect(bpm.bpm).toEqual(n);
  expect(bpm.beat).toEqual(beat);
} );

it("from - 120", () => {
  const n = 120;
  const bpm = from(n);
  const expectedBeat: MusicalDuration = QUARTER;

  expect(bpm.bpm).toEqual(n);
  expect(bpm.beat).toEqual(expectedBeat);
} );

it("precalc - QUARTER_120", () => {
  const bpm = QUARTER_120;
  const expectedBeat: MusicalDuration = QUARTER;
  const expectedNum: number = 120;

  expect(bpm.bpm).toEqual(expectedNum);
  expect(bpm.beat).toEqual(expectedBeat);
} );

it("getMillis - QUARTER_120 - WHOLE = 2s", () => {
  const bpm = QUARTER_120;
  const actualDuration = bpm.getMillis(WHOLE);
  const expectedDuration: number = 2000;

  expect(actualDuration).toEqual(expectedDuration);
} );

it("getMillis - QUARTER_120 - QUARTER = 0.5s", () => {
  const bpm = QUARTER_120;
  const actualDuration = bpm.getMillis(QUARTER);
  const expectedDuration: number = 500;

  expect(actualDuration).toEqual(expectedDuration);
} );
