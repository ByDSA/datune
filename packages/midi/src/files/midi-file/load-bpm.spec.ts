import * as fs from "node:fs";
import { BPMs } from "@datune/core";
import { load } from "./load";
import { MidiFile } from "./MidiFile";

const LOAD_SAMPLE = "./tests/samples/001.mid";

it("load exists", () => {
  const exists = fs.existsSync(LOAD_SAMPLE);

  expect(exists).toBeTruthy();
} );

describe("load 001", () => {
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await load(LOAD_SAMPLE);
  } );

  it("must have bpm", () => {
    expect(midiFile.bpmEvents).not.toHaveLength(0);
    expect(midiFile.bpmEvents).toHaveLength(1);
    expect(midiFile.bpmEvents[0].bpm).toEqual(BPMs.from(120));
  } );
} );
