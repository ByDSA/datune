import { dotted, EIGHTH, QUARTER, SIXTEENTH, WHOLE, ZERO } from "@datune/core/time";
import * as fs from "fs";
import { A5, B5, C5, C6, D5, E5, F5, G5 } from "pitch";
import { nodeFrom, noteFrom } from "sequence";
import { TestInit } from "tests";
import { Instrument } from "../instrument";
import load from "./load";
import MidiFile from "./MidiFile";

TestInit.initAll();

const LOAD_SAMPLE = "./tests/sample.mid";

it("load exists", () => {
  const exists = fs.existsSync(LOAD_SAMPLE);

  expect(exists).toBeTruthy();
} );

describe("load sample.mid", () => {
  let midiFile: MidiFile;

  beforeAll(() => {
    midiFile = load(LOAD_SAMPLE) as MidiFile;
  } );
  it("load ok", () => {
    expect(midiFile).toBeDefined();
  } );

  it("load tacks ok", () => {
    const { tracks } = midiFile;

    expect(tracks).toBeDefined();
    expect(tracks.length).toBe(1);
  } );

  it("load tacks info", () => {
    const track = midiFile.tracks[0];

    expect(track.name).toBe("MIDITrack");
    expect(track.instrument).toBe(Instrument.ACOUSTIC_PIANO);
    expect(track.channel).toBe(0);
  } );

  it("load notes ok", () => {
    const { nodes } = midiFile.tracks[0];

    expect(nodes).toBeDefined();
    expect(nodes.length).toBe(8);
  } );

  it("load notes info", () => {
    const { nodes } = midiFile.tracks[0];
    const node0 = nodeFrom( {
      at: ZERO,
      note: noteFrom( {
        pitch: C5,
        duration: dotted(QUARTER),
        velocity: 100,
      } ),
    } );

    expect(nodes[0]).toStrictEqual(node0);
    const node1 = nodeFrom( {
      at: QUARTER * 1.5,
      note: noteFrom( {
        pitch: D5,
        duration: EIGHTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[1]).toStrictEqual(node1);
    const node2 = nodeFrom( {
      at: QUARTER * 2,
      note: noteFrom( {
        pitch: E5,
        duration: QUARTER - SIXTEENTH,
        velocity: 127,
      } ),
    } );

    expect(nodes[2]).toStrictEqual(node2);
    const node3 = nodeFrom( {
      at: SIXTEENTH * 11,
      note: noteFrom( {
        pitch: F5,
        duration: QUARTER,
        velocity: 100,
      } ),
    } );

    expect(nodes[3]).toStrictEqual(node3);
    const node4 = nodeFrom( {
      at: WHOLE - SIXTEENTH,
      note: noteFrom( {
        pitch: G5,
        duration: QUARTER + SIXTEENTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[4]).toStrictEqual(node4);
    const node5 = nodeFrom( {
      at: QUARTER * 5,
      note: noteFrom( {
        pitch: A5,
        duration: SIXTEENTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[5]).toStrictEqual(node5);
    const node6 = nodeFrom( {
      at: QUARTER * 5 + SIXTEENTH,
      note: noteFrom( {
        pitch: B5,
        duration: QUARTER,
        velocity: 100,
      } ),
    } );

    expect(nodes[6]).toStrictEqual(node6);
    const node7 = nodeFrom( {
      at: QUARTER * 6 + SIXTEENTH,
      note: noteFrom( {
        pitch: C6,
        duration: SIXTEENTH * 7,
        velocity: 127,
      } ),
    } );

    expect(nodes[7]).toStrictEqual(node7);
  } );
} );
