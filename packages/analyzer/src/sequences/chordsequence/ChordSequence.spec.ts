import { B0, C, CMaj7, Dm7, fromPitches } from "@datune/core/chords/chromatic";
import { A as P_A, C as P_C } from "@datune/core/pitches/chromatic";
import { A5, B4, C4, C6, D5, E4, F5, G4 } from "@datune/core/spns/chromatic";
import { QUARTER } from "@datune/core/time";
import { S3_4, S4_4 } from "@datune/core/time/symbolic/rhythm";
import { TestInit } from "tests";
import TonalApproach from "../../approaches/tonal/TonalApproach";
import NotesSequence from "../notessequence/NotesSequence";

TestInit.initAll();

const testNoteTimeSequence = () => {
  const notesTimeSequence = new NotesSequence();
  const eventDuration = QUARTER;
  const pitches = [C4, E4, G4, B4, D5, F5, A5, C6];

  for (const pitch of pitches) {
    notesTimeSequence.add( {
      event: pitch,
      from: notesTimeSequence.duration,
      to: notesTimeSequence.duration + eventDuration,
    } );
  }

  return notesTimeSequence;
};

it("Chord Analyser 4/4", () => {
  const notesTimeSequence = testNoteTimeSequence();
  const harmonicSequence = new TonalApproach( {
    initial: {
      timeSignature: S4_4,
    },
  } );

  harmonicSequence.notesSequence.add( {
    layer: notesTimeSequence,
  } );
  harmonicSequence.calculateChords();

  const { nodes } = harmonicSequence.chordSequence;
  const chords = nodes.map((n) => n.event);

  expect(chords[0]).toBe(CMaj7);
  expect(chords[1]).toBe(Dm7);
} );

it("Chord Analyser 3/4", () => {
  const notesTimeSequence = testNoteTimeSequence();
  const harmonicSequence = new TonalApproach( {
    initial: {
      timeSignature: S3_4,
    },
  } );

  harmonicSequence.notesSequence.add( {
    layer: notesTimeSequence,
  } );
  harmonicSequence.calculateChords();

  const { nodes } = harmonicSequence.chordSequence;
  const chords = nodes.map((n) => n.event);

  expect(chords[0]).toBe(C);
  expect(chords[1]).toBe(B0);
  expect(chords[2]).toBe(fromPitches(P_A, P_C));
} );
