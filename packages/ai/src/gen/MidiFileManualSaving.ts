/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable camelcase */
import { ChordSequence, TonalApproach } from "@datune/analyzer";
import { init as initCore, type Key, type MusicalDuration } from "@datune/core";
import { fromRootVoicing } from "@datune/core/chords/absolute/chromatic/building";
import { A as T_A, AA as T_AA, AAm as T_AAm, Am as T_Am, B as T_B, Bm as T_Bm, C as T_C, CC as T_CC, CCm as T_CCm, Cm as T_Cm, D as T_D, DD as T_DD, DDm as T_DDm, Dm as T_Dm, E as T_E, Em as T_Em, F as T_F, FF as T_FF, FFm as T_FFm, Fm as T_Fm, G as T_G, GG as T_GG, GGm as T_GGm, Gm as T_Gm } from "@datune/core/keys/chromatic/constants";
import { Pitch } from "@datune/core/pitches/chromatic";
import { A2, B3, C4, C7, G4 } from "@datune/core/spns/symbolic/chromatic/constants";
import { SpnArray, Spn } from "@datune/core/spns/chromatic";
import { add, sub } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { fromPitchOctave as spnFrom } from "@datune/core/spns/symbolic/chromatic/building/pitch-octave";
import { EIGHTH, HALF, LONGA, QUARTER, SIXTEENTH } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { from as BPMFrom } from "@datune/core/rhythm/tempo/bpm/building";
import { initialize as initMidi, Instrument, MidiFile, MidiNode, MidiNote, nodeFrom, noteFrom } from "@datune/midi";
import { from as midiPitchFrom } from "@datune/midi/pitch/building";
import { randomN } from "datils/math";
import { IntervalArray } from "@datune/core/intervals/chromatic";
import { betweenSpn } from "@datune/core/intervals/symbolic/chromatic/building";
import { fromRootIntervals } from "@datune/core/voicings/relative/chromatic/building/rootIntervals";
import { Track } from "@datune/midi/files/track/Track";
import { Channel } from "@datune/midi/files/track/Channel";
import { Chord as SpnChord } from "@datune/core/chords/absolute/chromatic/Chord";
import { NonEmptyArray } from "datils";
import { ActionGen } from "./actions/ActionGen";
import { ActionGenState } from "./actions/ActionGenState";
import { ActionManager } from "./actions/ActionManager";
import { ConstraintSpn } from "./constraints/pitch/ConstraintSpn";
import { PitchDistanceConstraint } from "./constraints/pitch/DistanceConstraint";
import { PitchMaxConstraint } from "./constraints/pitch/PitchMaxConstraint";
import { PitchMinConstraint } from "./constraints/pitch/PitchMinConstraint";
import { LowerVoiceConstraint } from "./constraints/voice/LowerVoiceConstraint";
import { GenChordSeq } from "./GenChordSeq";
import { GenFuncSeq } from "./GenFuncSeq";
import { GenKeySeq } from "./GenKeySeq";
import { GenMainFuncSeq } from "./GenMainFuncSeq";
import { Voice } from "./voice/Voice";

const voicesNumber = 3;
let voices: Voice[];

function initializeVoices() {
  voices = [];

  for (let i = 0; i < voicesNumber; i++) {
    voices.push(new Voice());

    if (i === 0) {
      voices[i].addPitchConstraint(new PitchMaxConstraint(G4));
      voices[i].addPitchConstraint(new PitchMinConstraint(C4));
    } else {
      voices[i].addPitchConstraint(new PitchMaxConstraint(C7));
      voices[i].addPitchConstraint(new PitchMinConstraint(C4));

      voices[i].addVoiceConstraint(new LowerVoiceConstraint(voices[i - 1]));
    }
  }
}

function filterPitchesByLastSpnConstraint(spns: Spn[], lastSpn: Spn | null, voice: Voice): Spn[] {
  if (lastSpn) {
    return spns.filter((spn) => {
      const i = voices.indexOf(voice);

      if (i === 0)
        return new PitchDistanceConstraint(2).check(lastSpn, spn);

      return new PitchDistanceConstraint(4).check(lastSpn, spn);
    } );
  }

  return spns;
}

function filterPitchesByPitchConstraint(
  spns: Spn[],
  voice: Voice,
  from: MusicalDuration,
  to: MusicalDuration,
): Spn[] {
  return spns.filter((spn) => voice.checkPitchConstraints(spn, from, to));
}

function filterPitchesByVoiceConstraint(
  spns: Spn[],
  voice: Voice,
  from: MusicalDuration,
  to: MusicalDuration,
): Spn[] {
  return spns.filter((spn) => voice.checkVoiceConstraintsPitch(spn, from, to));
}

function getAvailablePitches(
  time: MusicalDuration,
  chordSequence: ChordSequence,
  key: Key,
): Pitch[] {
  const [currentChordNode] = chordSequence.get( {
    at: time,
  } );

  if (!currentChordNode)
    return [];

  let currentChordPitches: NonEmptyArray<Pitch>;
  const isNewChord = chordSequence.get( {
    at: time,
  } )[0]?.interval.from === time;

  if (isNewChord)
    currentChordPitches = currentChordNode.event.pitches;
  else
    currentChordPitches = key.pitches;

  return currentChordPitches;
}

function getAvailableNotes(
  time: MusicalDuration,
  chordSequence: ChordSequence,
  key: Key,
  lastNote: MidiNote | null,
  voice: Voice,
  from: MusicalDuration,
  to: MusicalDuration,
): MidiNote[] {
  const currentChordNotes = getAvailablePitches(time, chordSequence, key);
  let availableSpns: Spn[] = [];

  for (const n of currentChordNotes) {
    for (let o = -1; o < 9; o++) {
      const spn = spnFrom(n, o);

      if (spn)
        availableSpns.push(spn);
    }
  }

  availableSpns = filterPitchesByVoiceConstraint(availableSpns, voice, from, to);
  availableSpns = filterPitchesByPitchConstraint(availableSpns, voice, from, to);
  availableSpns = filterPitchesByLastSpnConstraint(
    availableSpns,
    lastNote?.pitch.spn ?? null,
    voice,
  );

  const notes = availableSpns.map((spn) => noteFrom( {
    pitch: midiPitchFrom(spn),
    duration: QUARTER,
  } ));

  return notes;
}

export function sample4(): MidiFile {
  initCore();
  initMidi();
  initializeVoices();

  const possibleKeysInitial = [
    T_C,
    T_CC,
    T_D,
    T_DD,
    T_E,
    T_F,
    T_FF,
    T_G,
    T_GG,
    T_A,
    T_AA,
    T_B,
    T_Cm,
    T_CCm,
    T_Dm,
    T_DDm,
    T_Em,
    T_Fm,
    T_FFm,
    T_Gm,
    T_GGm,
    T_Am,
    T_AAm,
    T_Bm,
  ];
  const midiFile = MidiFile.create();

  midiFile.addBPM(BPMFrom(100, QUARTER));

  const tonalApproach = new TonalApproach();

  tonalApproach.maxDuration = LONGA * (1);
  new GenKeySeq(tonalApproach, possibleKeysInitial).generate();
  new GenMainFuncSeq(tonalApproach).generate();
  new GenFuncSeq(tonalApproach).generate();
  new GenChordSeq(tonalApproach).generate();
  const tracks: Track[] = [];

  for (let j = 0; j < voicesNumber; j++) {
    const track: Track = {
      name: `Track ${j}`,
      channel: j as Channel,
      instrument: Instrument.ACOUSTIC_PIANO,
      nodes: [],
    };

    midiFile.addTrack(track);
    tracks.push(track);
  }

  const actionManager = new ActionManager<ActionGen, MidiNote>();
  const state = new ActionGenState(voices);
  const cond = () => state.times[0] < tonalApproach.keySequence.duration
            && state.times[1] < tonalApproach.keySequence.duration
            && state.times[2] < tonalApproach.keySequence.duration;

  while (cond() && !actionManager.end) {
    const time = state.times[state.i];
    const availableNotes: MidiNote[] = [];
    const [keyChordNode] = tonalApproach.keyChordSequence.get( {
      at: time,
    } );

    if (!keyChordNode)
      throw new Error(`${time} ${tonalApproach.keyChordSequence.duration}`);

    const keyChord = keyChordNode.event;

    for (const d of [EIGHTH, QUARTER, SIXTEENTH]) {
      const notes = getAvailableNotes(
        time,
        tonalApproach.chordSequence,
        keyChord,
        state.lasts[state.i],
        voices[state.i],
        time,
        time + d, // ???
      );

      availableNotes.push(...notes);
    }

    const action = new ActionGen(availableNotes, state);

    actionManager.addAndDo(action);
  }

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];

    for (const node of state.voices[i].notesSequence.nodes)
      track.nodes.push(node);
  }

  const accompTrack: Track = {
    name: "Track Chords",
    channel: 1,
    instrument: Instrument.STRING_ENSEMBLE_1,
    nodes: [],
  };

  midiFile.addTrack(accompTrack);
  let prevNotes: SpnArray | undefined;
  const chordConstraints = [
    new PitchMaxConstraint(B3),
    new PitchMinConstraint(A2),
  ];

  tonalApproach.chordSequence.nodes.forEach((node) => {
    const chord = node.event;
    const time = node.interval.from;
    const timeTo = node.interval.to;
    const root = <Spn>spnFrom(chord.root, 3);
    const rootIntervalsVoicing = chord.pitches.map(
      (spn, i, array) => +spn - +array[i],
    ) as IntervalArray;
    const voicing = fromRootIntervals(...rootIntervalsVoicing);
    const spnChord = <SpnChord>fromRootVoicing(root, voicing);
    let { pitches } = spnChord;
    const constraints: ConstraintSpn[] = chordConstraints;

    if (prevNotes)
      pitches = minimizeDistance(pitches, prevNotes, constraints);

    prevNotes = pitches;
    const midiNodes = pitches.map((spn: Spn) => {
      const pitch = midiPitchFrom(spn);
      const note = noteFrom( {
        pitch,
        duration: (timeTo - (time)),
      } );
      const node2 = nodeFrom( {
        note,
        at: time,
      } );

      return node2;
    } ).filter((midiNote: MidiNode) => midiNote) as MidiNode[];

    accompTrack.nodes.push(...midiNodes);
  } );

  return midiFile;
}

function spnCheckConstraints(spn: Spn, constraints: ConstraintSpn[] = []): Spn | null {
  for (const c of constraints) {
    if (!c.check(spn))
      return null;
  }

  return spn;
}

function minimizeDistance(
  from: SpnArray,
  to: SpnArray,
  constraints: ConstraintSpn[] = [],
): SpnArray {
  const result: SpnArray = [...from];

  for (let i = 0; i < from.length; i++) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const originalDistance_i = distanceToNotes(from[i], to);
    let minDist = 9999;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const original_i = spnCheckConstraints(from[i], constraints);

    if (original_i) {
      minDist = originalDistance_i;
      result[i] = original_i;
    }

    let lower_i: Spn | null = from[i];

    do {
      lower_i = sub(lower_i, 12);

      if (!lower_i)
        break;

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const lower_i2 = spnCheckConstraints(lower_i, constraints);

      if (!lower_i2)
        continue;

      lower_i = lower_i2;

      const d = distanceToNotes(lower_i, to);

      if (d < minDist) {
        minDist = d;
        result[i] = lower_i;
      } else
        break;
    // eslint-disable-next-line no-constant-condition
    } while (true);

    let upper_i: Spn | null = from[i];

    do {
      upper_i = add(upper_i, 12);

      if (!upper_i)
        break;

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const upper_i2 = spnCheckConstraints(upper_i, constraints);

      if (!upper_i2)
        continue;

      upper_i = upper_i2;

      const d = distanceToNotes(upper_i, to);

      if (d < minDist) {
        minDist = d;
        result[i] = upper_i;
      } else
        break;
    // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  return result;
}

function distanceToNotes(from: Spn, toNotes: SpnArray): number {
  let dist = 0;

  toNotes.forEach((spn: Spn) => {
    dist += Math.abs(betweenSpn(from, spn));
  } );

  return dist;
}

function getDuration(time: MusicalDuration, tonalApproach: TonalApproach): MusicalDuration {
  let duration;
  let durations: MusicalDuration[];

  durations = [
    HALF,
    QUARTER,
    EIGHTH,
  ];

  durations = durations.filter((m) => time - Math.floor(time) + m <= 1);

  if (durations.length === 1)
    return durations[0];

  if (durations.length > 1)
    duration = durations[randomN(durations.length)];
  else
    duration = (1 - (time - Math.floor(time)));

  return duration;
}
