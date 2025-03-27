import { MidiTimeline } from "@datune/midi";
import { NotesTimeline } from "timelines/NotesTimeline";

export function midiToNoteTimeline(midiTimeline: MidiTimeline): NotesTimeline {
  const nSeq = new NotesTimeline();

  for (const midiNode of midiTimeline.nodes) {
    nSeq.add( {
      event: midiNode.event.pitch.spn,
      interval: midiNode.interval,
    } );
  }

  return nSeq;
}
