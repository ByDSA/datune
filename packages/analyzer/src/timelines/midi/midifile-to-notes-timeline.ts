import { MidiFile, MidiTimeline } from "@datune/midi";
import { Time } from "@datune/utils";
import { NotesTimeline } from "timelines/NotesTimeline";

// TODO: mover a datune/midi
type Settings = {
  offset: Time;
};
type Result = {
  pitched: MidiTimeline | null;
  drums: MidiTimeline | null;
};
export function midiFileToTimelines(midiFile: MidiFile, settings?: Settings): Result {
  let pitchedTl = null;
  let drumsTl = null;

  for (const track of midiFile.tracks) {
    let timeline;
    const isDrums = track.channel === 9;

    if (isDrums) {
      if (!drumsTl)
        drumsTl = new MidiTimeline();

      timeline = drumsTl;
    } else {
      if (!pitchedTl)
        pitchedTl = new MidiTimeline();

      timeline = pitchedTl;
    }

    for (const midiNode of track.nodes) {
      const interval = {
        ...midiNode.interval,
      };

      if (settings?.offset) {
        interval.from += settings.offset;
        interval.to += settings.offset;
      }

      timeline.add( {
        event: midiNode.event,
        interval,
      } );
    }
  }

  return {
    drums: drumsTl,
    pitched: pitchedTl,
  };
}

export function midiTimelineToNotesTimeline(midiTl: MidiTimeline) {
  const nTl = new NotesTimeline();

  for (const n of midiTl.nodes) {
    nTl.add( {
      event: n.event.pitch.spn,
      interval: n.interval,
    } );
  }

  return nTl;
}
