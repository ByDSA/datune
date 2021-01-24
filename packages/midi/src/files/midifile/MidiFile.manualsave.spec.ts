import { Func, Key, MusicalDuration, Note, Scale, SPN } from '@datune/core';
import { ChromaticInterval } from '@datune/core/intervals';
import { mod } from '@datune/utils';
import { MidiPitch } from '../../pitch/MidiPitch';
import { MidiNote } from '../../sequence/node/MidiNote';
import { Track } from '../track/Track';
import { MidiFile } from "./MidiFile";

it(`save manual`, () => {
  sample3().save("./out.mid");
});

function sample3() {
  const midiFile = MidiFile.create();
  const track1 = new Track();
  midiFile.addTrack(track1);

  const key = Key.Am;
  const chords = [
    Func.i.getChord(key),
    Func.bVI.getChord(key).withInv(),
    Func.bIII.getChord(key).withInv(2),
    Func.bVII.getChord(key),
  ];

  const durations = [
    MusicalDuration.QUARTER,
    MusicalDuration.HALF,
    MusicalDuration.EIGHTH,
    MusicalDuration.SIXTEENTH,
  ];

  for (let j = 0; j < 3; j++) {
    let time = MusicalDuration.ZERO;
    let duration: MusicalDuration;
    let lastSPN: SPN | undefined;
    for (let i = 0; i < 2000; i++, time = time.withAdd(duration)) {
      let chordNumber = Math.floor(time.value % chords.length);
      const notes = chords[chordNumber].notes;
      let spn: SPN;
      if (!lastSPN) {
        spn = <SPN>SPN.from(notes[0], 4);
      } else
        do {
          const c = notes[random(notes.length)];
          const o = random(9);
          spn = <SPN>SPN.from(c, o);
        } while (Math.abs(ChromaticInterval.betweenSPN(lastSPN, spn)) > 4);

      lastSPN = spn;

      do {
        duration = durations[random(durations.length)];
      } while (time.value - Math.floor(time.value) + duration.value > 1);
      const pitch = MidiPitch.from(spn);
      const note = MidiNote.builder()
        .duration(duration)
        .pitch(pitch)
        .time(time)
        .create();

      track1.addNotes([note]);
    }
  }

/*
  for (let i = 0; i < 200; i++) {
    const chord = chords[i % chords.length];
    let o = 2;
    const notes = chord.notes.map((c, i) => {
      if (i > 0 && c.valueOf() < chord.notes[i - 1].valueOf())
        o++;
      return <SPN>SPN.from(c, o);
    }).map(s => {
      const pitch = MidiPitch.from(s);

      return MidiNote.builder()
        .duration(MusicalDuration.WHOLE)
        .pitch(pitch)
        .time(MusicalDuration.WHOLE.withMult(i))
        .create();
    });

    track1.addNotes(notes);
  }*/

  return midiFile;
}

function sample2() {
  const midiFile = MidiFile.create();
  const track1 = new Track();
  midiFile.addTrack(track1);
  const tonality = Key.Cm;

  const durations = [
    MusicalDuration.QUARTER,
    MusicalDuration.HALF,
    MusicalDuration.EIGHTH,
  ];

  let selector = 0;
  let time = MusicalDuration.ZERO;
  let duration: MusicalDuration;
  for (let i = 0; i < 2000; i++, time = time.withAdd(duration)) {
    duration = durations[random(durations.length)];
    const c = tonality.notes[mod(selector, tonality.notes.length)];
    const o = 4 + Math.floor(selector / tonality.notes.length);
    const spn = SPN.from(c, o);
    if (!spn)
      continue;
    const pitch = MidiPitch.from(spn);
    const note = MidiNote.builder()
      .duration(duration)
      .pitch(pitch)
      .time(time)
      .create();

    selector += random(3) - 1;
    selector = Math.min(10, selector);
    selector = Math.max(-10, selector);

    track1.addNotes([note]);
  }

  selector = 0;
  time = MusicalDuration.ZERO;
  for (let i = 0; i < 2000; i++, time = time.withAdd(duration)) {
    duration = durations[random(durations.length)];
    const c = tonality.notes[mod(selector, tonality.notes.length)];
    const o = 3 + Math.floor(selector / tonality.notes.length);
    const spn = SPN.from(c, o);
    if (!spn)
      continue;
    const pitch = MidiPitch.from(spn);
    const note = MidiNote.builder()
      .duration(duration)
      .pitch(pitch)
      .time(time)
      .create();

    selector += random(3) - 1;
    selector = Math.min(3, selector);
    selector = Math.max(-4, selector);

    track1.addNotes([note]);
  }

  selector = 0;
  time = MusicalDuration.ZERO;
  for (let i = 0; i < 2000; i++, time = time.withAdd(duration)) {
    duration = durations[random(durations.length)];
    const c = tonality.notes[mod(selector, tonality.notes.length)];
    const o = 6 + Math.floor(selector / tonality.notes.length);
    const spn = SPN.from(c, o);
    if (!spn)
      continue;
    const pitch = MidiPitch.from(spn);
    const note = MidiNote.builder()
      .duration(duration)
      .pitch(pitch)
      .time(time)
      .create();

    selector += random(3) - 1;
    selector = Math.min(7, selector);
    selector = Math.max(-7, selector);

    track1.addNotes([note]);
  }

  return midiFile;
}

function random(n: number): number {
  return Math.floor(n * Math.random());
}

function sample1() {
  const midiFile = MidiFile.create();
  const track1 = new Track();
  midiFile.addTrack(track1);
  const spns: SPN[] = [];
  const keys = [
    Key.C,
    Key.Am,
    Key.from(Note.A, Scale.BLUES_MINOR),
    Key.from(Note.D, Scale.DORIAN),
    Key.from(Note.E, Scale.PHRYGIAN),
  ]

  for (const k of keys) {
    const newSPNS = k.notes
      .map((n, i) => {
        const s = <SPN>SPN.from(n, 4)

        return s;
      });

    spns.push(...newSPNS);
    spns.push(<SPN>newSPNS[0].withShift(12));
    spns.push(...newSPNS.reverse());
  }

  const notes = spns.map((s, i) => {
    const p = MidiPitch.from(s);
    const m = MidiNote.builder()
      .pitch(p)
      .time(MusicalDuration.EIGHTH.withMult(i))
      .create();

    return m;
  });

  track1.addNotes(notes);

  return midiFile;
}