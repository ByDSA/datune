import { Spns as N, MusicalDurations as MD, Keys as K } from "@datune/core";
import { intervalFromAtDuration } from "datils/math/intervals";
import { NotesTimeline } from "../NotesTimeline";

export const notesTimelineSample1 = () => {
  const notesTimeline = new NotesTimeline();
  const eventDuration = MD.QUARTER;
  const pitches = [N.C4, N.E4, N.G4, N.B4, N.D5, N.F5, N.A5, N.C6];

  for (const pitch of pitches) {
    notesTimeline.add( {
      event: pitch,
      interval: intervalFromAtDuration(
        notesTimeline.duration,
        eventDuration,
      ),
    } );
  }

  return notesTimeline;
};

export function generateNotesTimelineSampleCMajor() {
  const s = new NotesTimeline();

  for (const n of K.C.pitches) {
    const spn = N.fromPitchOctave(n, 4)!;

    s.add( {
      event: spn,
      interval: intervalFromAtDuration(
        s.duration,
        MD.QUARTER,
      ),
    } );
  }

  return s;
}
