import { MusicalDuration } from "@datune/core/time";
import { Midi, Track as InnerTrack } from "@tonejs/midi";
import { Instrument as InnerInstrument } from "@tonejs/midi/dist/Instrument";
import { Note as InnerNote } from "@tonejs/midi/dist/Note";
import { MidiNode } from "../../../sequence/node/MidiNode";
import { Track } from "../../track/Track";
import { MidiFile } from "../MidiFile";
import { Instrument } from "files/instrument";
import { Channel } from "files/track/Channel";
import { fromCode } from "pitch/building";
import { MidiCode } from "pitch/MidiCode";
import { nodeFrom, noteFrom } from "sequence";

export class MidiAdapter {
  private innerMidi: Midi;

  constructor(innerMidi: Midi) {
    this.innerMidi = innerMidi;
  }

  adapt(): MidiFile {
    const midi = this.innerMidi;
    const midiFile = MidiFile.create();

    midi.tracks.forEach((innerTrack) => {
      if (isPointlessTrack(innerTrack))
        return;

      const track = trackFunc(innerTrack, midi);

      midiFile.addTrack(track);
    } );

    return midiFile;
  }
}

function isPointlessTrack(innerTrack: InnerTrack): boolean {
  return innerTrack.notes.length === 0 && !innerTrack.name;
}

function trackFunc(innerTrack: InnerTrack, midi: Midi): Track {
  const nodes = innerTrack.notes.map((innerNote) => {
    const note = nodeFunc(innerNote, midi);

    return note;
  } );
  const channel: Channel = checkNumberChannel(innerTrack.channel) || 0;
  const instrument: Instrument = checkNumberInstrument(innerTrack.instrument)
    || Instrument.ACOUSTIC_PIANO;

  return {
    name: innerTrack.name,
    nodes,
    channel,
    instrument,
  };
}

function checkNumberChannel(channel: number): Channel | null {
  switch (channel) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return channel;
    default:
      return null;
  }
}

function checkNumberInstrument(instrument: InnerInstrument): Instrument | null {
  const instrumentNumber = instrument.number;

  return instrumentNumber >= 0 && instrumentNumber <= 127 && instrumentNumber % 1 === 0
    ? instrumentNumber
    : null;
}

function nodeFunc(innerNote: InnerNote, midi: Midi): MidiNode {
  const duration = timeFunc(innerNote.durationTicks, midi.header.ppq);
  const pitch = fromCode(<MidiCode>innerNote.midi);
  const time = timeFunc(innerNote.ticks, midi.header.ppq);
  const velocity = innerNote.velocity * 127;

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
