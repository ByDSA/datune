import { Chords as C } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { TimeSignatures as TS } from "@datune/core/rhythm";
import { calculateChords, newTonalApproach } from "../approaches/tonal/TonalApproach";
import { notesTimeSequenceSample1 } from "./tests/notes-sequence-samples";

it.skip("chord Analyser 4/4", () => {
  const notesTimeSequence = notesTimeSequenceSample1();
  const harmonicSequence = newTonalApproach( {
    initial: {
      timeSignature: TS.S4_4,
    },
  } );

  harmonicSequence.notesSequence.add( {
    layer: notesTimeSequence,
  } );
  calculateChords(harmonicSequence);

  const { nodes } = harmonicSequence.chordSequence;
  const chords = nodes.map((n) => n.event);

  expect(chords[0]).toBe(C.CMaj7);
  expect(chords[1]).toBe(C.Dm7);
} );

it.skip("chord Analyser 3/4", () => {
  const notesTimeSequence = notesTimeSequenceSample1();
  const harmonicSequence = newTonalApproach( {
    initial: {
      timeSignature: TS.S3_4,
    },
  } );

  harmonicSequence.notesSequence.add( {
    layer: notesTimeSequence,
  } );
  calculateChords(harmonicSequence);

  const { nodes } = harmonicSequence.chordSequence;
  const chords = nodes.map((n) => n.event);

  expect(chords[0]).toBe(C.C);
  expect(chords[1]).toBe(C.B0);
  expect(chords[2]).toBe(C.fromPitches(P.A, P.C));
} );
