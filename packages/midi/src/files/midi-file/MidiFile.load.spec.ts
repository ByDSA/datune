/* eslint-disable prefer-destructuring */
import * as fs from "node:fs";
import { MusicalDurations as MD } from "@datune/core";
import { MidiPitches as M } from "pitch";
import { MidiTimelines as MT } from "timeline";
import { Instrument } from "../instrument";
import { load } from "./load";
import { MidiFile } from "./MidiFile";

const { EIGHTH, QUARTER, SIXTEENTH, WHOLE, ZERO } = MD;
const LOAD_SAMPLE = "./tests/sample.mid";

it("load exists", () => {
  const exists = fs.existsSync(LOAD_SAMPLE);

  expect(exists).toBeTruthy();
} );

describe("load sample.mid", () => {
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
    expect(tracks).toHaveLength(1);
  } );

  it("load tacks info", () => {
    const [track] = midiFile.tracks;

    expect(track.name).toBe("MIDITrack");
    expect(track.instrument).toBe(Instrument.ACOUSTIC_PIANO);
    expect(track.channel).toBe(0);
  } );

  it("load notes ok", () => {
    const { nodes } = midiFile.tracks[0];

    expect(nodes).toBeDefined();
    expect(nodes).toHaveLength(8);
  } );

  it("load notes info", () => {
    const { nodes } = midiFile.tracks[0];
    const node0 = MT.nodeFrom( {
      at: ZERO,
      note: MT.noteFrom( {
        pitch: M.C5,
        duration: MD.dotted(QUARTER),
        velocity: 100,
      } ),
    } );

    expect(nodes[0]).toStrictEqual(node0);

    const node1 = MT.nodeFrom( {
      at: QUARTER * 1.5,
      note: MT.noteFrom( {
        pitch: M.D5,
        duration: EIGHTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[1]).toStrictEqual(node1);

    const node2 = MT.nodeFrom( {
      at: QUARTER * 2,
      note: MT.noteFrom( {
        pitch: M.E5,
        duration: QUARTER - SIXTEENTH,
        velocity: 127,
      } ),
    } );

    expect(nodes[2]).toStrictEqual(node2);

    const node3 = MT.nodeFrom( {
      at: SIXTEENTH * 11,
      note: MT.noteFrom( {
        pitch: M.F5,
        duration: QUARTER,
        velocity: 100,
      } ),
    } );

    expect(nodes[3]).toStrictEqual(node3);

    const node4 = MT.nodeFrom( {
      at: WHOLE - SIXTEENTH,
      note: MT.noteFrom( {
        pitch: M.G5,
        duration: QUARTER + SIXTEENTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[4]).toStrictEqual(node4);

    const node5 = MT.nodeFrom( {
      at: QUARTER * 5,
      note: MT.noteFrom( {
        pitch: M.A5,
        duration: SIXTEENTH,
        velocity: 100,
      } ),
    } );

    expect(nodes[5]).toStrictEqual(node5);

    const node6 = MT.nodeFrom( {
      at: (QUARTER * 5) + SIXTEENTH,
      note: MT.noteFrom( {
        pitch: M.B5,
        duration: QUARTER,
        velocity: 100,
      } ),
    } );

    expect(nodes[6]).toStrictEqual(node6);

    const node7 = MT.nodeFrom( {
      at: (QUARTER * 6) + SIXTEENTH,
      note: MT.noteFrom( {
        pitch: M.C6,
        duration: SIXTEENTH * 7,
        velocity: 127,
      } ),
    } );

    expect(nodes[7]).toStrictEqual(node7);
  } );
} );
