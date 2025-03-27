import { MidiFile } from "@datune/midi";
import { Time } from "@datune/utils";
import { NotesSequence } from "sequences/NotesSequence";

type Settings = {
  offset: Time;
};
export function midiFileToNoteSequence(midiFile: MidiFile, settings?: Settings): NotesSequence {
  const nSeq = new NotesSequence();

  for (const track of midiFile.tracks) {
    if (track.channel === 9) // drums
      continue;

    for (const midiNode of track.nodes) {
      const interval = {
        ...midiNode.interval,
      };

      if (settings?.offset) {
        interval.from += settings.offset;
        interval.to += settings.offset;
      }

      nSeq.add( {
        event: midiNode.event.pitch.spn,
        interval,
      } );
    }
  }

  return nSeq;
}
