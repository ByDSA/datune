import type { MusicalDuration } from "../MusicalDuration";
import { TestInit } from "tests";
import { QUARTER_120 } from "../../bpm/constants";
import { BPM } from "../../bpm/BPM";
import { HALF } from "../constants";
import { fromMillisAndBPM } from "./fromMillisAndBPM";

TestInit.bpm();

it("fromMillisAndBPM - 1000ms in QUARTER_120 = HALF", () => {
  const bpm: BPM = QUARTER_120;
  const actual: MusicalDuration = fromMillisAndBPM(1000, bpm);
  const expected = HALF;

  expect(actual).toEqual(expected);
} );
