import type { Track } from "../../track/Track";
import type { MidiTimelineNode } from "../../../timeline/node/MidiNode";
import type { Midi as ToneJsMidi, Track as ToneJsTrack } from "@tonejs/midi";
import { BPMs, MusicalDuration } from "@datune/core";
import { Note as ToneJsNote } from "@tonejs/midi/dist/Note";
import { Instrument } from "files/instrument";
import { type Channel, channelFromNumber } from "files/track/Channel";
import { fromCode } from "pitch/building";
import { assertIsMidiCode } from "pitch/MidiCode";
import { noteFrom } from "timeline/note/building/from";
import { nodeFrom } from "timeline/node/building";
import { instrumentFromNumber } from "files/instrument/Instrument";
import { MidiFile } from "../MidiFile";
import { getMidiTempo } from "./tonejs-utils";

export function fromToneJsMidi(toneJsMidi: ToneJsMidi): MidiFile {
  return new MidiAdapter(toneJsMidi).adapt();
}
class MidiAdapter {
  private toneJsMidi: ToneJsMidi;

  constructor(toneJsMidi: ToneJsMidi) {
    this.toneJsMidi = toneJsMidi;
  }

  adapt(): MidiFile {
    const { toneJsMidi } = this;
    const midiFile = new MidiFile();
    const tempo = getMidiTempo(toneJsMidi);

    if (tempo !== null)
      midiFile.addBPM(BPMs.from(tempo));

    toneJsMidi.tracks.forEach((toneJsTrack) => {
      if (isPointlessTrack(toneJsTrack))
        return;

      const track = trackFunc(toneJsTrack, toneJsMidi);

      midiFile.addTrack(track);
    } );

    return midiFile;
  }
}

function isPointlessTrack(toneJsTrack: ToneJsTrack): boolean {
  return toneJsTrack.notes.length === 0 && !toneJsTrack.name;
}

function trackFunc(toneJsTrack: ToneJsTrack, toneJsMidi: ToneJsMidi): Track {
  const nodes = toneJsTrack.notes.map((toneJsNote) => {
    const note = toneJsNoteToNode(toneJsNote, toneJsMidi);

    return note;
  } );
  const channel: Channel = channelFromNumber(toneJsTrack.channel) ?? 0;
  const instrument: Instrument = instrumentFromNumber(toneJsTrack.instrument.number)
    ?? Instrument.ACOUSTIC_PIANO;

  return {
    name: toneJsTrack.name,
    nodes,
    channel,
    instrument,
  };
}

function toneJsNoteToNode(toneJsNote: ToneJsNote, toneJsMidi: ToneJsMidi): MidiTimelineNode {
  const duration = timeFunc(toneJsNote.durationTicks, toneJsMidi.header.ppq);

  assertIsMidiCode(toneJsNote.midi);
  const pitch = fromCode(toneJsNote.midi);
  const time = timeFunc(toneJsNote.ticks, toneJsMidi.header.ppq);
  const velocity = toneJsNote.velocity * 127;

  return nodeFrom( {
    note: noteFrom( {
      pitch,
      duration,
      velocity,
    } ),
    at: time,
  } );
}

function timeFunc(ticks: number, ppq: number): MusicalDuration {
  const pulsesPerWhole = ppq * 4;
  const value = ticks / pulsesPerWhole;

  return value;
}
