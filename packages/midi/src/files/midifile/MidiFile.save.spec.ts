import { MusicalDuration } from '@datune/core';
import * as fs from "fs";
import { MidiPitch } from '../../pitch/MidiPitch';
import { MidiNote } from '../../sequence/node/MidiNote';
import { Track } from '../track/Track';
import { MidiFile } from "./MidiFile";

it(`save ok`, () => {
  const path = "tmp.mid";
  sample1().save(path);
  const exists = fs.existsSync(path);

  expect(exists).toBeTruthy();
});

it(`save + load ok`, () => {
  const path = "tmp.mid";
  sample1().save(path);
  const midiFile = MidiFile.load(path);

  expect(midiFile).not.toBeNull();
});

it(`save + load info`, () => {
  const path = "tmp.mid";
  sample1().save(path);
  const midiFile = <MidiFile>MidiFile.load(path);
  const notes = midiFile.tracks[0].notes;

  expect(notes[0]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH)
    .pitch(MidiPitch.C5)
    .time(MusicalDuration.ZERO)
    .velocity(80)
    .create());
  expect(notes[1]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(2))
    .pitch(MidiPitch.D5)
    .time(MusicalDuration.SIXTEENTH)
    .velocity(85)
    .create());
  expect(notes[2]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(3))
    .pitch(MidiPitch.DD5)
    .time(MusicalDuration.SIXTEENTH.withMult(3))
    .velocity(90)
    .create());
  expect(notes[3]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(4))
    .pitch(MidiPitch.F5)
    .time(MusicalDuration.SIXTEENTH.withMult(6))
    .velocity(95)
    .create());
  expect(notes[4]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(5))
    .pitch(MidiPitch.G5)
    .time(MusicalDuration.SIXTEENTH.withMult(10))
    .velocity(100)
    .create());
  expect(notes[5]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(6))
    .pitch(MidiPitch.GG5)
    .time(MusicalDuration.SIXTEENTH.withMult(15))
    .velocity(105)
    .create());
  expect(notes[6]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(7))
    .pitch(MidiPitch.AA5)
    .time(MusicalDuration.SIXTEENTH.withMult(21))
    .velocity(110)
    .create());
  expect(notes[7]).toStrictEqual(MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(8))
    .pitch(MidiPitch.C6)
    .time(MusicalDuration.SIXTEENTH.withMult(28))
    .velocity(115)
    .create());
});

function sample1() {
  const midiFile = MidiFile.create();
  const notes = [
    MidiPitch.C5,
    MidiPitch.D5,
    MidiPitch.DD5,
    MidiPitch.F5,
    MidiPitch.G5,
    MidiPitch.GG5,
    MidiPitch.AA5,
    MidiPitch.C6,
  ].map((p, i) => MidiNote.builder()
    .duration(MusicalDuration.SIXTEENTH.withMult(i + 1))
    .pitch(p)
    .time(MusicalDuration.SIXTEENTH.withMult(i * (i + 1) / 2))
    .velocity(80 + 5 * i)
    .create()
  );

  midiFile.addTrack(new Track().addNotes(notes));

  return midiFile;
}