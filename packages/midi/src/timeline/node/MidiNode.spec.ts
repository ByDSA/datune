import { MusicalDurations as MD } from "@datune/core";
import { MidiPitches as M } from "../../pitch";
import { MidiTimelines as MT, type MidiNote } from "..";

const { HALF, QUARTER, WHOLE, ZERO } = MD;

describe("from - ZERO (C5 QUARTER 90)", () => {
  const note: MidiNote = MT.noteFrom( {
    pitch: M.C5,
    duration: QUARTER,
    velocity: 90,
  } );
  const node = MT.nodeFrom( {
    note,
  } );

  it("from", () => {
    expect(node.interval.from).toBe(ZERO);
  } );

  it("note", () => {
    expect(node.event).toBe(note);
  } );

  it("to", () => {
    expect(node.interval.to).toEqual(QUARTER);
  } );
} );

describe("from - QUARTER (C5 QUARTER 90)", () => {
  const note: MidiNote = MT.noteFrom( {
    pitch: M.C5,
    duration: QUARTER,
    velocity: 90,
  } );
  const node = MT.nodeFrom( {
    note,
    at: QUARTER,
  } );

  it("from", () => {
    expect(node.interval.from).toBe(QUARTER);
  } );

  it("note", () => {
    expect(node.event).toBe(note);
  } );

  it("to", () => {
    expect(node.interval.to).toEqual(HALF);
  } );
} );

it("immutability", () => {
  const note = MT.noteFrom( {
    velocity: 50,
  } );
  const node = MT.nodeFrom( {
    note,
  } );

  expect(() => {
    (node as any).to = WHOLE;
  } ).toThrow(Error);
} );
