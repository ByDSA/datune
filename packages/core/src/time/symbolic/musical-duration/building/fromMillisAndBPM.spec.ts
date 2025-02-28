import { QUARTER_120 } from "../../bpm/constants";
import { BPM } from "../../bpm/BPM";
import { HALF } from "../constants";
import type { MusicalDuration } from "../MusicalDuration";
import { fromMillisAndBPM } from "./fromMillisAndBPM";
import { TestInit } from "tests";

TestInit.bpm();

it("fromMillisAndBPM - 1000ms in QUARTER_120 = HALF", () => {
  const bpm: BPM = QUARTER_120;
  const actual: MusicalDuration = fromMillisAndBPM(1000, bpm);
  const expected = HALF;

  expect(actual).toEqual(expected);
} );
