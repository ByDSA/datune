import type { MusicalDuration } from "../MusicalDuration";
import type { BPM } from "../../bpm/BPM";
import { BPMs } from "rhythm/tempo/bpm";
import { MusicalDurations as MD } from "..";
import { fromMillisAndBPM } from "./fromMillisAndBPM";

const { HALF } = MD;
const { QUARTER_120 } = BPMs;

it("fromMillisAndBPM - 1000ms in QUARTER_120 = HALF", () => {
  const bpm: BPM = QUARTER_120;
  const actual: MusicalDuration = fromMillisAndBPM(1000, bpm);
  const expected = HALF;

  expect(actual).toEqual(expected);
} );
