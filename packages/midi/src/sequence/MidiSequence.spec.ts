import { dotted, EIGHTH, HALF, MusicalDuration, QUARTER, WHOLE, ZERO } from "@datune/core/time";
import { C5, E5, G5 } from "pitch/constants";
import { TestInit } from "tests";
import MidiSequence from "./MidiSequence";
import { from as nodeFrom } from "./node";
import MidiNode from "./node/MidiNode";
import { from as noteFrom } from "./note";
import MidiNote from "./note/MidiNote";

TestInit.initAll();

it("from - cellSize=EIGHTH", () => {
  const cellSize: MusicalDuration = EIGHTH;
  const midiSequence: MidiSequence = new MidiSequence( {
    cellSize,
  } );
  // eslint-disable-next-line no-underscore-dangle
  const actual = (<any>midiSequence)._cellSize;

  expect(actual).toBe(cellSize);
} );

it("add - ZERO [C5 QUARTER]", () => {
  const note = noteFrom( {
    pitch: C5,
    duration: QUARTER,
  } );
  const node: MidiNode = nodeFrom( {
    note,
  } );
  const midiSequence: MidiSequence = new MidiSequence();

  midiSequence.add(node);
  const durableEvents: MidiNode[] = midiSequence.get( {
    at: ZERO,
  } );

  expect(durableEvents).toHaveLength(1);
  expect(durableEvents[0]).toEqual(node);
} );

describe("removeNodesAt", () => {
  let midiSequence: MidiSequence;

  describe("sample", () => {
    beforeEach(() => {
      midiSequence = generateSample();
    } );

    it("eIGHT = nothing at ZERO", () => {
      midiSequence.remove( {
        at: EIGHTH,
      } );
      const nodes = midiSequence.get( {
        at: ZERO,
      } );

      expect(nodes).toHaveLength(0);
    } );
  } );

  describe("sampleArp", () => {
    beforeEach(() => {
      midiSequence = generateSampleArp();
    } );

    it("remove EIGHT, length = 2", () => {
      midiSequence.remove( {
        at: EIGHTH,
      } );

      expect(midiSequence.nodes).toHaveLength(2);
    } );

    it("remove QUARTER , 1 at ZERO", () => {
      midiSequence.remove( {
        at: QUARTER,
      } );
      const durableEvents: MidiNode[] = <MidiNode[]>midiSequence.get( {
        at: ZERO,
      } );

      expect(durableEvents).toHaveLength(1);
    } );

    it("remove QUARTER, nothing at QUARTER", () => {
      midiSequence.remove( {
        at: QUARTER,
      } );
      const durableEvents: MidiNode[] = <MidiNode[]>midiSequence.get( {
        at: QUARTER,
      } );

      expect(durableEvents).toHaveLength(0);
    } );

    it("remove QUARTER, 1 element at HALF", () => {
      midiSequence.remove( {
        at: QUARTER,
      } );
      const durableEvents: MidiNode[] = <MidiNode[]>midiSequence.get( {
        at: HALF,
      } );

      expect(durableEvents).toHaveLength(1);
    } );

    it("remove EIGHT -> 0 element at HALF.dotted", () => {
      midiSequence.remove( {
        at: EIGHTH,
      } );
      const durableEvents: MidiNode[] = <MidiNode[]>midiSequence.get( {
        at: dotted(HALF),
      } );

      expect(durableEvents).toHaveLength(0);
    } );
  } );
} );

it("getNodesAt - sampleArp - WHOLE = nothing", () => {
  const midiSequence: MidiSequence = generateSampleArp();
  const durableEvents: MidiNode[] = <MidiNode[]>midiSequence.get( {
    at: WHOLE,
  } );

  expect(durableEvents).toHaveLength(0);
} );

it("events - sampleArp - length = 3", () => {
  const midiSequence: MidiSequence = generateSampleArp();
  const { length } = midiSequence.nodes;

  expect(length).toBe(3);
} );

it("events - sample - length = 3", () => {
  const midiSequence: MidiSequence = generateSample();
  const { length } = midiSequence.nodes;

  expect(length).toBe(3);
} );

it("duration - sample - duration = QUARTER", () => {
  const midiSequence: MidiSequence = generateSample();
  const { duration } = midiSequence;

  expect(duration).toEqual(QUARTER);
} );

it("duration - sampleArp - duration = HALF.dotted", () => {
  const midiSequence: MidiSequence = generateSampleArp();
  const { duration } = midiSequence;

  expect(duration).toEqual(dotted(HALF));
} );

it("addSequence - add sampleArp", () => {
  const midiSequence: MidiSequence = new MidiSequence();
  const sampleArtSequence = generateSampleArp();

  midiSequence.add( {
    layer: sampleArtSequence,
    at: ZERO,
  } );
  const { duration } = midiSequence;

  expect(duration).toEqual(sampleArtSequence.duration);
} );

// SAMPLES
function generateSample(): MidiSequence {
  const midiSequence: MidiSequence = new MidiSequence();
  const duration: MusicalDuration = QUARTER;
  const midiNote: MidiNote = noteFrom( {
    pitch: C5,
    duration,
  } );
  const midiEvent: MidiNode = nodeFrom( {
    note: midiNote,
  } );
  const midiNote2: MidiNote = noteFrom( {
    pitch: E5,
    duration,
  } );
  const midiEvent2: MidiNode = nodeFrom( {
    note: midiNote2,
  } );
  const midiNote3: MidiNote = noteFrom( {
    pitch: G5,
    duration,
  } );
  const midiEvent3: MidiNode = nodeFrom( {
    note: midiNote3,
  } );

  midiSequence.add(midiEvent);
  midiSequence.add(midiEvent2);
  midiSequence.add(midiEvent3);

  return midiSequence;
}

function generateSampleArp(): MidiSequence {
  const midiSequence: MidiSequence = new MidiSequence();
  const duration: MusicalDuration = QUARTER;
  const note1 = noteFrom( {
    pitch: C5,
    duration,
  } );
  const node1 = nodeFrom( {
    at: ZERO,
    note: note1,
  } );
  const note2: MidiNote = noteFrom( {
    pitch: E5,
    duration,
  } );
  const node2: MidiNode = nodeFrom( {
    note: note2,
    at: QUARTER,
  } );
  const note3: MidiNote = noteFrom( {
    pitch: G5,
    duration,
  } );
  const node3: MidiNode = nodeFrom( {
    note: note3,
    at: HALF,
  } );

  midiSequence.add(node1);
  midiSequence.add(node2);
  midiSequence.add(node3);

  return midiSequence;
}
