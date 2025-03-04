/* eslint-disable prefer-destructuring */
import * as fs from "node:fs";
import { SIXTEENTH, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { Track, DEFAULT } from "files/track/Track";
import { AA5, C5, C6, D5, DD5, F5, G5, GG5 } from "pitch";
import { MidiNode, nodeFrom, noteFrom } from "sequence";
import { TestInit } from "tests";
import { save } from "./save";
import { MidiFile } from "./MidiFile";
import { load } from "./load";

TestInit.initAll();

it("save ok", () => {
  const path = "tests/tmp.mid";

  save(sample1(), path);
  const exists = fs.existsSync(path);

  expect(exists).toBeTruthy();
} );

it("save + load ok", () => {
  const path = "tests/tmp.mid";

  save(sample1(), path);
  const midiFile = load(path);

  expect(midiFile).not.toBeNull();
} );

it("save + load info", () => {
  const path = "tests/tmp.mid";

  save(sample1(), path);
  const midiFile = load(path) as MidiFile;
  const { nodes } = midiFile.tracks[0];
  const expectedNode0 = nodeFrom( {
    at: ZERO,
    note: noteFrom( {
      pitch: C5,
      duration: SIXTEENTH,
      velocity: 80,
    } ),
  } );
  const expectedNode1 = nodeFrom( {
    at: SIXTEENTH,
    note: noteFrom( {
      pitch: D5,
      duration: SIXTEENTH * 2,
      velocity: 85,
    } ),
  } );
  const expectedNode2 = nodeFrom( {
    at: SIXTEENTH * 3,
    note: noteFrom( {
      pitch: DD5,
      duration: SIXTEENTH * 3,
      velocity: 90,
    } ),
  } );
  const expectedNode3 = nodeFrom( {
    at: SIXTEENTH * 6,
    note: noteFrom( {
      pitch: F5,
      duration: SIXTEENTH * 4,
      velocity: 95,
    } ),
  } );

  expect(nodes[0]).toStrictEqual(expectedNode0);
  expect(nodes[1]).toStrictEqual(expectedNode1);
  expect(nodes[2]).toStrictEqual(expectedNode2);
  expect(nodes[3]).toStrictEqual(expectedNode3);

  const expectedNode4 = nodeFrom( {
    at: SIXTEENTH * 10,
    note: noteFrom( {
      pitch: G5,
      duration: SIXTEENTH * 5,
      velocity: 100,
    } ),
  } );

  expect(nodes[4]).toStrictEqual(expectedNode4);

  const expectedNode5 = nodeFrom( {
    at: SIXTEENTH * 15,
    note: noteFrom( {
      pitch: GG5,
      duration: SIXTEENTH * 6,
      velocity: 105,
    } ),
  } );

  expect(nodes[5]).toStrictEqual(expectedNode5);

  const expectedNode6 = nodeFrom( {
    at: SIXTEENTH * 21,
    note: noteFrom( {
      pitch: AA5,
      duration: SIXTEENTH * 7,
      velocity: 110,
    } ),
  } );

  expect(nodes[6]).toStrictEqual(expectedNode6);

  const expectedNode7 = nodeFrom( {
    at: SIXTEENTH * 28,
    note: noteFrom( {
      pitch: C6,
      duration: SIXTEENTH * 8,
      velocity: 115,
    } ),
  } );

  expect(nodes[7]).toStrictEqual(expectedNode7);
} );

function sample1() {
  const midiFile = MidiFile.create();
  const nodes: MidiNode[] = [
    C5,
    D5,
    DD5,
    F5,
    G5,
    GG5,
    AA5,
    C6,
  ].map((p, i) => nodeFrom( {
    at: SIXTEENTH * ((i * (i + 1)) / 2),
    note: noteFrom( {
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
