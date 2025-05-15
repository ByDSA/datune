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
  const channel: Channel = channelFromNumber(toneJsTrack.channel) ?? 0;
  const nodes = toneJsTrack.notes.map((toneJsNote) => {
    const note = toneJsNoteToNode(toneJsNote, toneJsMidi, channel);

    return note;
  } );
  const instrument: Instrument = instrumentFromNumber(toneJsTrack.instrument.number)
    ?? Instrument.ACOUSTIC_PIANO;

  return {
    name: toneJsTrack.name,
    nodes,
    channel,
    instrument,
  };
}

// eslint-disable-next-line max-len
// TODO: cachear control changes y convertirlo a una estructura que permita búsqueda binaria para acelerar la búsqueda
function toneJsNoteToNode(
  toneJsNote: ToneJsNote,
  toneJsMidi: ToneJsMidi,
  channel: number,
): MidiTimelineNode {
  const duration = timeFunc(toneJsNote.durationTicks, toneJsMidi.header.ppq);

  assertIsMidiCode(toneJsNote.midi);
  const pitch = fromCode(toneJsNote.midi);
  const time = timeFunc(toneJsNote.ticks, toneJsMidi.header.ppq);
  const volumeNormalized = getVolumeForChannelAt(
    toneJsMidi,
    channel,
    toneJsNote.ticks,
  );
  const velocity = toneJsNote.velocity * 127 * volumeNormalized;
  const panNormalized = getPanForChannelAt(
    toneJsMidi,
    channel,
    toneJsNote.ticks,
  );
  const panning = Math.round((panNormalized + 1) / 2 * 127);

  return nodeFrom( {
    note: noteFrom( {
      pitch,
      duration,
      velocity,
      panning,
    } ),
    at: time,
  } );
}

function timeFunc(ticks: number, ppq: number): MusicalDuration {
  const pulsesPerWhole = ppq * 4;
  const value = ticks / pulsesPerWhole;

  return value;
}

enum ControlChange {
  VOLUME = 7,
  PANNING = 10
}

function getPanForChannelAt(
  midi: ToneJsMidi,
  channel: number,
  tick: number,
): number {
  // 1) obtenemos la lista de CC10 (pan) para esa pista/canal
  //    dependiendo de la versión de @tonejs/midi puede estar en:
  //    a) midi.tracks[channel].controlChanges[10]
  //    b) midi.controlChanges[10]  // global, pero con .channel en cada evento
  const ccList = getControlChanges( {
    channel,
    toneJsMidi: midi,
    controlChange: ControlChange.PANNING,
  } );
  // 2) filtramos sólo los eventos ocurridos en o antes de este tick
  const past = ccList.filter(evt => evt.ticks <= tick);

  if (past.length === 0) {
    // sin evento previo, panorama por defecto al centro
    return 0;
  }

  // 3) tomamos el último
  const last = past.reduce((a, b) => (a.ticks > b.ticks ? a : b));

  // evt.value va de 0…1  → transformamos a –1…+1
  return (last.value * 2) - 1;
}

type ToneJsControlChange = ToneJsMidi["tracks"][0]["controlChanges"][0][0];
type ControlChangesProps = {
  toneJsMidi: ToneJsMidi;
  controlChange: ControlChange;
  channel: number;
};
function getControlChanges( { controlChange,
  toneJsMidi: midi,
  channel }: ControlChangesProps): ToneJsControlChange[] {
  const ccList: ToneJsControlChange[] = midi.tracks[channel]?.controlChanges[controlChange]
    ?? midi.tracks
      .flatMap((t, i) => (t.controlChanges[controlChange] ?? []).map(cc => ( {
        ...cc,
        channel: i,
      } )))
      .filter(evt => evt.channel === channel)
    ?? [];

  return ccList;
}

function getVolumeForChannelAt(
  midi: ToneJsMidi,
  channel: number,
  tick: number,
): number {
  // 1) recogemos la lista de CC7 (volume) para ese canal
  const ccList = getControlChanges( {
    channel,
    toneJsMidi: midi,
    controlChange: ControlChange.VOLUME,
  } );
  // 2) filtramos solo los eventos ocurridos en o antes del tick dado
  const past = ccList.filter(evt => evt.ticks <= tick);

  if (past.length === 0) {
    // sin evento previo → volumen por defecto al máximo (1)
    return 1;
  }

  // 3) tomamos el último evento
  const last = past.reduce((a, b) => (a.ticks > b.ticks ? a : b));

  // evt.value va de 0…1 → devolvemos directamente ese rango
  return last.value;
}
