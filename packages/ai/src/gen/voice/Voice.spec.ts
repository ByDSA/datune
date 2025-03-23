import { MidiPitches as M, MidiSequences as MS } from "@datune/midi";
import { MusicalDurations as MD } from "@datune/core";
import { LowerVoiceConstraint } from "../constraints/voice/LowerVoiceConstraint";
import { Voice } from "./Voice";

const { HALF, QUARTER, ZERO } = MD;

function initializeVoice() {
  const voice = new Voice();
  const note1 = MS.noteFrom( {
    pitch: M.E5,
    duration: QUARTER,
  } );
  const note2 = {
    ...note1,
    pitch: M.D5,
  };
  const node1 = MS.nodeFrom( {
    note: note1,
    at: ZERO,
  } );
  const node2 = MS.nodeFrom( {
    note: note2,
    at: QUARTER,
  } );

  voice.notesSequence.add(node1);
  voice.notesSequence.add(node2);

  return voice;
}

function initializeLowerVoice() {
  const lowerVoice = new Voice();
  const note1 = MS.noteFrom( {
    pitch: M.C5,
    duration: QUARTER,
  } );
  const note2 = {
    ...note1,
    pitch: M.D5,
  };
  const node1 = MS.nodeFrom( {
    note: note1,
    at: ZERO,
  } );
  const node2 = MS.nodeFrom( {
    note: note2,
    at: QUARTER,
  } );

  lowerVoice.notesSequence.add(node1);
  lowerVoice.notesSequence.add(node2);

  return lowerVoice;
}

it("lower voice", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraints(ZERO, QUARTER);
  const expected = true;

  expect(actual).toBe(expected);
} );

it("lower voice 2", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraints(QUARTER, HALF);
  const expected = false;

  expect(actual).toBe(expected);
} );

it("lower voice Spn", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraintsPitch(M.C5.spn, QUARTER, HALF);
  const expected = false;

  expect(actual).toBe(expected);
} );

it("lower voice Spn 2", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraintsPitch(M.E5.spn, QUARTER, HALF);
  const expected = true;

  expect(actual).toBe(expected);
} );
