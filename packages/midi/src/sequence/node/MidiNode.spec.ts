import { HALF, QUARTER, WHOLE, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { TestInit } from "tests";
import { C5 } from "../../pitch/constants";
import { from as noteFrom, MidiNote } from "../note";
import { from } from "./building";

TestInit.initAll();

describe("from - ZERO (C5 QUARTER 90)", () => {
  const note: MidiNote = noteFrom( {
    pitch: C5,
    duration: QUARTER,
    velocity: 90,
  } );
  const node = from( {
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
  const note: MidiNote = noteFrom( {
    pitch: C5,
    duration: QUARTER,
    velocity: 90,
  } );
  const node = from( {
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
  const note = noteFrom( {
    velocity: 50,
  } );
  const node = from( {
    note,
  } );

  expect(() => {
    (node as any).to = WHOLE;
  } ).toThrow(TypeError);
} );
