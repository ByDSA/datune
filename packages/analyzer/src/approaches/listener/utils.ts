import { BPM } from "@datune/core";
import { MidiTimeline } from "@datune/midi";

export function symbolicTimelineToReal(
  midiTimelineSymbolic: MidiTimeline,
  bpm: BPM,
): MidiTimeline {
  const notesTimelineReal = new MidiTimeline( {
    startTime: bpm.getMillis(midiTimelineSymbolic.startTime),
    cellSize: bpm.getMillis(midiTimelineSymbolic.cellSize),
  } );

  for (const n of midiTimelineSymbolic.nodes) {
    notesTimelineReal.add( {
      event: n.event,
      interval: {
        ...n.interval,
        from: bpm.getMillis(n.interval.from),
        to: bpm.getMillis(n.interval.to),
      },
    } );
  }

  return notesTimelineReal;
}
