/* eslint-disable prefer-destructuring */
import * as fs from "node:fs";
import { MusicalDurations as MD } from "@datune/core";
import { Track, DEFAULT } from "files/track/Track";
import { MidiPitches as M } from "pitch";
import { MidiTimelineNode, MidiTimelines as MT } from "timeline";
import { save } from "./save";
import { MidiFile } from "./MidiFile";
import { load } from "./load";

const { SIXTEENTH, ZERO } = MD;

it("save ok", async () => {
  const path = "tests/tmp.mid";

  await save(sample1(), path);
  const exists = fs.existsSync(path);

  expect(exists).toBeTruthy();
} );

it("save + load ok", async () => {
  const path = "tests/tmp.mid";

  await save(sample1(), path);
  const midiFile = await load(path);

  expect(midiFile).toBeInstanceOf(MidiFile);
} );

it("save + load info", async () => {
  const path = "tests/tmp.mid";

  await save(sample1(), path);
  const midiFile = await load(path);
  const { nodes } = midiFile.tracks[0];
  const expectedNode0 = MT.nodeFrom( {
    at: ZERO,
    note: MT.noteFrom( {
      pitch: M.C5,
      duration: SIXTEENTH,
      velocity: 80,
    } ),
  } );
  const expectedNode1 = MT.nodeFrom( {
    at: SIXTEENTH,
    note: MT.noteFrom( {
      pitch: M.D5,
      duration: SIXTEENTH * 2,
      velocity: 85,
    } ),
  } );
  const expectedNode2 = MT.nodeFrom( {
    at: SIXTEENTH * 3,
    note: MT.noteFrom( {
      pitch: M.DD5,
      duration: SIXTEENTH * 3,
      velocity: 90,
    } ),
  } );
  const expectedNode3 = MT.nodeFrom( {
    at: SIXTEENTH * 6,
    note: MT.noteFrom( {
      pitch: M.F5,
      duration: SIXTEENTH * 4,
      velocity: 95,
    } ),
  } );

  expect(nodes[0]).toStrictEqual(expectedNode0);
  expect(nodes[1]).toStrictEqual(expectedNode1);
  expect(nodes[2]).toStrictEqual(expectedNode2);
  expect(nodes[3]).toStrictEqual(expectedNode3);

  const expectedNode4 = MT.nodeFrom( {
    at: SIXTEENTH * 10,
    note: MT.noteFrom( {
      pitch: M.G5,
      duration: SIXTEENTH * 5,
      velocity: 100,
    } ),
  } );

  expect(nodes[4]).toStrictEqual(expectedNode4);

  const expectedNode5 = MT.nodeFrom( {
    at: SIXTEENTH * 15,
    note: MT.noteFrom( {
      pitch: M.GG5,
      duration: SIXTEENTH * 6,
      velocity: 105,
    } ),
  } );

  expect(nodes[5]).toStrictEqual(expectedNode5);

  const expectedNode6 = MT.nodeFrom( {
    at: SIXTEENTH * 21,
    note: MT.noteFrom( {
      pitch: M.AA5,
      duration: SIXTEENTH * 7,
      velocity: 110,
    } ),
  } );

  expect(nodes[6]).toStrictEqual(expectedNode6);

  const expectedNode7 = MT.nodeFrom( {
    at: SIXTEENTH * 28,
    note: MT.noteFrom( {
      pitch: M.C6,
      duration: SIXTEENTH * 8,
      velocity: 115,
    } ),
  } );

  expect(nodes[7]).toStrictEqual(expectedNode7);
} );

function sample1() {
  const midiFile = new MidiFile();
  const nodes: MidiTimelineNode[] = [
    M.C5,
    M.D5,
    M.DD5,
    M.F5,
    M.G5,
    M.GG5,
    M.AA5,
    M.C6,
  ].map((p, i) => MT.nodeFrom( {
    at: SIXTEENTH * ((i * (i + 1)) / 2),
    note: MT.noteFrom( {
      pitch: p,
      duration: SIXTEENTH * (i + 1),
      velocity: 80 + (5 * i),
    } ),
  } ));
  const track: Track = {
    ...DEFAULT,
    nodes,
  };

  midiFile.addTrack(track);

  return midiFile;
}

afterAll(() => {
  fs.unlinkSync("tests/tmp.mid");
} );
