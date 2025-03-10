import { MusicalDuration, MusicalDurations as MD } from "@datune/core";
import { TestInit } from "tests";
import { C5 } from "pitch/constants";
import { MidiPitch } from "../../pitch/MidiPitch";
import { from } from "./building";
import { PartialMidiNote as Dto } from "./PartialMidiNote";

TestInit.initAll();
const { QUARTER } = MD;

it("from - C5 QUARTER 90", () => {
  const pitch: MidiPitch = C5;
  const duration: MusicalDuration = QUARTER;
  const velocity = 90;
  const midiNote: Dto = from( {
    pitch,
    duration,
    velocity,
  } );

  expect(midiNote.pitch).toBe(pitch);
  expect(midiNote.duration).toBe(duration);
  expect(midiNote.velocity).toBe(velocity);
} );

it("from - vel 200 (vel to 127)", () => {
  const velocity = 200;
  const midiNote = from( {
    velocity,
  } );

  expect(midiNote.velocity).toBe(127);
} );

it("from - vel -12 (vel to 0)", () => {
  const velocity = -12;
  const midiNote = from( {
    velocity,
  } );

  expect(midiNote.velocity).toBe(0);
} );

it("immutability", () => {
  const note = from( {
    velocity: 50,
  } );

  expect(() => {
    (note as any).velocity = 100;
  } ).toThrow(Error);
} );
