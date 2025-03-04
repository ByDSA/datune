import { HALF, QUARTER, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { C5, D5, E5, nodeFrom, noteFrom } from "@datune/midi";
import { TestInit } from "tests";
import { LowerVoiceConstraint } from "../constraints/voice/LowerVoiceConstraint";
import { Voice } from "./Voice";

TestInit.initAll();

function initializeVoice() {
  const voice = new Voice();
  const note1 = noteFrom( {
    pitch: E5,
    duration: QUARTER,
  } );
  const note2 = {
    ...note1,
    pitch: D5,
  };
  const node1 = nodeFrom( {
    note: note1,
    at: ZERO,
  } );
  const node2 = nodeFrom( {
    note: note2,
    at: QUARTER,
  } );

  voice.notesSequence.add(node1);
  voice.notesSequence.add(node2);

  return voice;
}

function initializeLowerVoice() {
  const lowerVoice = new Voice();
  const note1 = noteFrom( {
    pitch: C5,
    duration: QUARTER,
  } );
  const note2 = {
    ...note1,
    pitch: D5,
  };
  const node1 = nodeFrom( {
    note: note1,
    at: ZERO,
  } );
  const node2 = nodeFrom( {
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

it("lower voice SPN", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraintsPitch(C5.spn, QUARTER, HALF);
  const expected = false;

  expect(actual).toBe(expected);
} );

it("lower voice SPN 2", () => {
  const voice = initializeVoice();
  const lowerVoice = initializeLowerVoice();

  voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

  const actual = voice.checkVoiceConstraintsPitch(E5.spn, QUARTER, HALF);
  const expected = true;

  expect(actual).toBe(expected);
} );
