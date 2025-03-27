import { MidiFile } from "@datune/midi";
import { Time } from "@datune/utils";
import { NotesTimeline } from "timelines/NotesTimeline";

type Settings = {
  offset: Time;
};
export function midiFileToNoteTimeline(midiFile: MidiFile, settings?: Settings): NotesTimeline {
  const nSeq = new NotesTimeline();

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
