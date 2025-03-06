import { MusicalDuration, MusicalDurations } from "../musical-duration";
import { BPMs } from ".";

const { QUARTER_120 } = BPMs;

it("precalc - QUARTER_120", () => {
  const bpm = QUARTER_120;
  const expectedBeat: MusicalDuration = MusicalDurations.QUARTER;
  const expectedNum: number = 120;

  expect(bpm.bpm).toEqual(expectedNum);
  expect(expectedBeat).toBeDefined();
  expect(bpm.beat).toEqual(expectedBeat);
} );
