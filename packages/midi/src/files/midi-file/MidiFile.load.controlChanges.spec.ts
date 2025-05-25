import * as fs from "node:fs";
import { load } from "./load";
import { MidiFile } from "./MidiFile";

const LOAD_SAMPLE = "./tests/samples/004.mid";

it("load exists", () => {
  const exists = fs.existsSync(LOAD_SAMPLE);

  expect(exists).toBeTruthy();
} );

describe("load", () => {
  let midiFile: MidiFile;

  beforeAll(async () => {
    midiFile = await load(LOAD_SAMPLE);
  } );

  it("load ok", () => {
    expect(midiFile).toBeDefined();
  } );

  it("load tacks ok", () => {
    const { tracks } = midiFile;

    expect(tracks).toBeDefined();
    expect(tracks).toHaveLength(10);
  } );
} );
