import { MidiSequence } from "@datune/midi";
import { NotesSequence } from "sequences/NotesSequence";

export function midiToNoteSequence(midiSequence: MidiSequence): NotesSequence {
  const nSeq = new NotesSequence();

  for (const midiNode of midiSequence.nodes) {
    nSeq.add( {
      event: midiNode.event.pitch.spn,
      interval: midiNode.interval,
    } );
  }

  return nSeq;
}
