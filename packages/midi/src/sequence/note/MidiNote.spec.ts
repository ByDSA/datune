import { MusicalDuration, MusicalDurations as MD } from "@datune/core";
import { MidiPitches as M } from "pitch";
import { MidiPitch } from "../../pitch/MidiPitch";
import { noteFrom } from "./building/from";
import { MidiNote } from "./MidiNote";

const { QUARTER } = MD;

it("from - C5 QUARTER 90", () => {
  const pitch: MidiPitch = M.C5;
  const duration: MusicalDuration = QUARTER;
  const velocity = 90;
  const midiNote: Partial<MidiNote> = noteFrom( {
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
  const midiNote = noteFrom( {
    velocity,
  } );

  expect(midiNote.velocity).toBe(127);
} );

it("from - vel -12 (vel to 0)", () => {
  const velocity = -12;
  const midiNote = noteFrom( {
    velocity,
  } );

  expect(midiNote.velocity).toBe(0);
} );

it("immutability", () => {
  const note = noteFrom( {
    velocity: 50,
  } );

  expect(() => {
    (note as any).velocity = 100;
  } ).toThrow(Error);
} );
