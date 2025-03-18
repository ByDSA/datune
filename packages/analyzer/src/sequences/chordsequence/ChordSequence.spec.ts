import { Chords as C } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { Spns as N } from "@datune/core/spns/chromatic";
import { MusicalDurations as MD } from "@datune/core/rhythm";
import { TimeSignatures as TS } from "@datune/core/rhythm";
import { TestInit } from "tests";
import { TonalApproach } from "../../approaches/tonal/TonalApproach";
import { NotesSequence } from "../notessequence/NotesSequence";

TestInit.initAll();
const { A5, B4, C4, C6, D5, E4, F5, G4 } = N;
const { A: P_A, C: P_C } = P;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { B0, CMaj7, Dm7, fromPitches } = C;
const testNoteTimeSequence = () => {
  const notesTimeSequence = new NotesSequence();
  const eventDuration = MD.QUARTER;
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

it("chord Analyser 4/4", () => {
  const notesTimeSequence = testNoteTimeSequence();
  const harmonicSequence = new TonalApproach( {
    initial: {
      timeSignature: TS.S4_4,
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

it("chord Analyser 3/4", () => {
  const notesTimeSequence = testNoteTimeSequence();
  const harmonicSequence = new TonalApproach( {
    initial: {
      timeSignature: TS.S3_4,
    },
  } );

  harmonicSequence.notesSequence.add( {
    layer: notesTimeSequence,
  } );
  harmonicSequence.calculateChords();

  const { nodes } = harmonicSequence.chordSequence;
  const chords = nodes.map((n) => n.event);

  expect(chords[0]).toBe(C.C);
  expect(chords[1]).toBe(B0);
  expect(chords[2]).toBe(fromPitches(P_A, P_C));
} );
