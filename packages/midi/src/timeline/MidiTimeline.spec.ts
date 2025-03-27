import { MusicalDuration, MusicalDurations } from "@datune/core";
import { MidiPitches as M } from "pitch";
import { MidiTimeline } from "./MidiTimeline";
import { nodeFrom } from "./node/building";
import { MidiTimelineNode } from "./node/MidiNode";
import { noteFrom } from "./note/building/from";
import { MidiNote } from "./note/MidiNote";

const { dotted, EIGHTH, HALF, QUARTER, WHOLE, ZERO } = MusicalDurations;

it("from - cellSize=EIGHTH", () => {
  const cellSize: MusicalDuration = EIGHTH;
  const midiTimeline: MidiTimeline = new MidiTimeline( {
    cellSize,
  } );
  const actual = midiTimeline.cellSize;

  expect(actual).toBe(cellSize);
} );

it("add - ZERO [C5 QUARTER]", () => {
  const note = noteFrom( {
    pitch: M.C5,
    duration: QUARTER,
  } );
  const node: MidiTimelineNode = nodeFrom( {
    note,
  } );
  const midiTimeline: MidiTimeline = new MidiTimeline();

  midiTimeline.add(node);
  const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(ZERO);

  expect(durableEvents).toHaveLength(1);
  expect(durableEvents[0]).toEqual(node);
} );

describe("removeNodesAt", () => {
  let midiTimeline: MidiTimeline;

  describe("sample", () => {
    beforeEach(() => {
      midiTimeline = generateSample();
    } );

    it("eIGHT = nothing at ZERO", () => {
      midiTimeline.removeAt(EIGHTH);
      const nodes = midiTimeline.getAt(ZERO);

      expect(nodes).toHaveLength(0);
    } );
  } );

  describe("sampleArp", () => {
    beforeEach(() => {
      midiTimeline = generateSampleArp();
    } );

    it("remove EIGHT, length = 2", () => {
      midiTimeline.removeAt(EIGHTH);

      expect(midiTimeline.nodes).toHaveLength(2);
    } );

    it("remove QUARTER , 1 at ZERO", () => {
      midiTimeline.removeAt(QUARTER);
      const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(ZERO);

      expect(durableEvents).toHaveLength(1);
    } );

    it("remove QUARTER, nothing at QUARTER", () => {
      midiTimeline.removeAt(QUARTER);
      const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(QUARTER);

      expect(durableEvents).toHaveLength(0);
    } );

    it("remove QUARTER, 1 element at HALF", () => {
      midiTimeline.removeAt(QUARTER);
      const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(HALF);

      expect(durableEvents).toHaveLength(1);
    } );

    it("remove EIGHT -> 0 element at HALF.dotted", () => {
      midiTimeline.removeAt(EIGHTH);
      const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(dotted(HALF));

      expect(durableEvents).toHaveLength(0);
    } );
  } );
} );

it("getNodesAt - sampleArp - WHOLE = nothing", () => {
  const midiTimeline: MidiTimeline = generateSampleArp();
  const durableEvents: MidiTimelineNode[] = midiTimeline.getAt(WHOLE);

  expect(durableEvents).toHaveLength(0);
} );

it("events - sampleArp - length = 3", () => {
  const midiTimeline: MidiTimeline = generateSampleArp();
  const { length } = midiTimeline.nodes;

  expect(length).toBe(3);
} );

it("events - sample - length = 3", () => {
  const midiTimeline: MidiTimeline = generateSample();
  const { length } = midiTimeline.nodes;

  expect(length).toBe(3);
} );

it("duration - sample - duration = QUARTER", () => {
  const midiTimeline: MidiTimeline = generateSample();
  const { duration } = midiTimeline;

  expect(duration).toEqual(QUARTER);
} );

it("duration - sampleArp - duration = HALF.dotted", () => {
  const midiTimeline: MidiTimeline = generateSampleArp();
  const { duration } = midiTimeline;

  expect(duration).toEqual(dotted(HALF));
} );

it("addTimeline - add sampleArp", () => {
  const midiTimeline: MidiTimeline = new MidiTimeline();
  const sampleArpTimeline = generateSampleArp();

  midiTimeline.addTimeline(sampleArpTimeline, ZERO);
  const { duration } = midiTimeline;

  expect(duration).toEqual(sampleArpTimeline.duration);
} );

// SAMPLES
function generateSample(): MidiTimeline {
  const midiTimeline: MidiTimeline = new MidiTimeline();
  const duration: MusicalDuration = QUARTER;
  const midiNote: MidiNote = noteFrom( {
    pitch: M.C5,
    duration,
  } );
  const midiEvent: MidiTimelineNode = nodeFrom( {
    note: midiNote,
  } );
  const midiNote2: MidiNote = noteFrom( {
    pitch: M.E5,
    duration,
  } );
  const midiEvent2: MidiTimelineNode = nodeFrom( {
    note: midiNote2,
  } );
  const midiNote3: MidiNote = noteFrom( {
    pitch: M.G5,
    duration,
  } );
  const midiEvent3: MidiTimelineNode = nodeFrom( {
    note: midiNote3,
  } );

  midiTimeline.add(midiEvent);
  midiTimeline.add(midiEvent2);
  midiTimeline.add(midiEvent3);

  return midiTimeline;
}

function generateSampleArp(): MidiTimeline {
  const midiTimeline: MidiTimeline = new MidiTimeline();
  const duration: MusicalDuration = QUARTER;
  const note1 = noteFrom( {
    pitch: M.C5,
    duration,
  } );
  const node1 = nodeFrom( {
    at: ZERO,
    note: note1,
  } );
  const note2: MidiNote = noteFrom( {
    pitch: M.E5,
    duration,
  } );
  const node2: MidiTimelineNode = nodeFrom( {
    note: note2,
    at: QUARTER,
  } );
  const note3: MidiNote = noteFrom( {
    pitch: M.G5,
    duration,
  } );
  const node3: MidiTimelineNode = nodeFrom( {
    note: note3,
    at: HALF,
  } );

  midiTimeline.add(node1);
  midiTimeline.add(node2);
  midiTimeline.add(node3);

  return midiTimeline;
}
