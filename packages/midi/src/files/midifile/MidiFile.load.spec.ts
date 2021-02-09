import { MusicalDuration } from '@datune/core';
import * as fs from "fs";
import { MidiPitch } from '../../pitch/MidiPitch';
import { MidiNote } from '../../sequence/note/MidiNote';
import { Instrument } from '../instrument/Instrument';
import { MidiFile } from "./MidiFile";
const LOAD_SAMPLE = "./tests/sample.mid";


it(`load exists`, () => {
  const exists = fs.existsSync(LOAD_SAMPLE);
  expect(exists).toBeTruthy();
});

it(`load ok`, () => {
  const midiFile = MidiFile.load(LOAD_SAMPLE);
  expect(midiFile).not.toBeNull();
});

it(`load tacks ok`, () => {
  const midiFile = <MidiFile>MidiFile.load(LOAD_SAMPLE);
  const tracks = midiFile.tracks;
  expect(tracks).toBeDefined();
  expect(tracks.length).toBe(1);
});

it(`load tacks info`, () => {
  const midiFile = <MidiFile>MidiFile.load(LOAD_SAMPLE);
  const track = midiFile.tracks[0];
  expect(track.name).toBe("MIDITrack");
  expect(track.instrument).toBe(Instrument.ACOUSTIC_PIANO);
  expect(track.channel).toBe(0);
});

it(`load notes ok`, () => {
  const midiFile = <MidiFile>MidiFile.load(LOAD_SAMPLE);
  const notes = midiFile.tracks[0].notes;
  expect(notes).toBeDefined();
  expect(notes.length).toBe(8);
});

it(`load notes info`, () => {
  const midiFile = <MidiFile>MidiFile.load(LOAD_SAMPLE);
  const notes = midiFile.tracks[0].notes;
  expect(notes[0]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.C5)
    .velocity(100)
    .duration(MusicalDuration.QUARTER.dotted)
    .from(MusicalDuration.ZERO)
    .create()
  );
  expect(notes[1]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.D5)
    .velocity(100)
    .duration(MusicalDuration.EIGHTH)
    .from(MusicalDuration.QUARTER.dotted)
    .create()
  );
  expect(notes[2]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.E5)
    .velocity(127)
    .duration(MusicalDuration.QUARTER.withSub(MusicalDuration.SIXTEENTH))
    .from(MusicalDuration.QUARTER.withMult(2))
    .create()
  );
  expect(notes[3]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.F5)
    .velocity(100)
    .duration(MusicalDuration.QUARTER)
    .from(MusicalDuration.SIXTEENTH.withMult(11))
    .create()
  );
  expect(notes[4]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.G5)
    .velocity(100)
    .duration(MusicalDuration.QUARTER.withAdd(MusicalDuration.SIXTEENTH))
    .from(MusicalDuration.WHOLE.withSub(MusicalDuration.SIXTEENTH))
    .create()
  );
  expect(notes[5]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.A5)
    .velocity(100)
    .duration(MusicalDuration.SIXTEENTH)
    .from(MusicalDuration.QUARTER.withMult(5))
    .create()
  );
  expect(notes[6]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.B5)
    .velocity(100)
    .duration(MusicalDuration.QUARTER)
    .from(MusicalDuration.QUARTER.withMult(5).withAdd(MusicalDuration.SIXTEENTH))
    .create()
  );
  expect(notes[7]).toStrictEqual(MidiNote.builder()
    .pitch(MidiPitch.C6)
    .velocity(127)
    .duration(MusicalDuration.SIXTEENTH.withMult(7))
    .from(MusicalDuration.QUARTER.withMult(6).withAdd(MusicalDuration.SIXTEENTH))
    .create()
  );
});