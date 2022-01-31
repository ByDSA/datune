import { TestInit } from "tests";
import { fromMillisAndBPM } from ".";
import { QUARTER_120 } from "../bpm";
import BPM from "../bpm/BPM";
import { HALF } from "./constants";
import MusicalDuration from "./MusicalDuration";

beforeAll(() => {
  TestInit.bpm();
  TestInit.musicalDuration();
} );
it("fromMillisAndBPM - 1000ms in QUARTER_120 = HALF", () => {
  const bpm: BPM = QUARTER_120;
  const actual: MusicalDuration = fromMillisAndBPM(1000, bpm);
  const expected = HALF;

  expect(actual).toEqual(expected);
} );
