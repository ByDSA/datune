import { Spns as N, MusicalDurations as MD, Keys as K } from "@datune/core";
import { NotesSequence } from "../NotesSequence";

export const notesTimeSequenceSample1 = () => {
  const notesTimeSequence = new NotesSequence();
  const eventDuration = MD.QUARTER;
  const pitches = [N.C4, N.E4, N.G4, N.B4, N.D5, N.F5, N.A5, N.C6];

  for (const pitch of pitches) {
    notesTimeSequence.add( {
      event: pitch,
      from: notesTimeSequence.duration,
      to: notesTimeSequence.duration + eventDuration,
    } );
  }

  return notesTimeSequence;
};

export function generateNotesTimeSequenceSampleCMajor() {
  const s = new NotesSequence();

  for (const n of K.C.pitches) {
    const spn = N.fromPitchOctave(n, 4)!;

    s.add( {
      event: spn,
      from: s.duration,
      to: s.duration + MD.QUARTER,
    } );
  }

  return s;
}
