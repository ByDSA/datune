import { MusicalDuration } from "@datune/core";
import { Midi, Track as InnerTrack } from "@tonejs/midi";
import { Note as InnerNote } from "@tonejs/midi/dist/Note";
import { MidiCode, MidiPitch } from "../../../pitch/MidiPitch";
import { MidiNote } from "../../../sequence/node/MidiNote";
import { Track } from "../../track/Track";
import { MidiFile } from "../MidiFile";

export class MidiAdapter {
    constructor(private innerMidi: Midi) {
    }

    adapt(): MidiFile {
        const midi = this.innerMidi;
        const midiFile = MidiFile.create();

        midi.tracks.forEach(innerTrack => {
            if (isPointlessTrack(innerTrack))
                return;
            const track = _track(innerTrack, midi);
            track.name = innerTrack.name;
            midiFile.addTrack(track);
        });

        return midiFile;
    }
}

function isPointlessTrack(innerTrack: InnerTrack): boolean {
    return innerTrack.notes.length === 0 && !innerTrack.name;
}

function _track(innerTrack: InnerTrack, midi: Midi): Track {
    const track = new Track();
    const notes = innerTrack.notes.map((innerNote, index) => {
        const note = _note(innerNote, midi);
        return note;
    })

    track.addNotes(notes);

    return track;
}

function _note(innerNote: InnerNote, midi: Midi): MidiNote {
    const duration = _time(innerNote.durationTicks, midi.header.ppq);
    const pitch = MidiPitch.fromCode(<MidiCode>innerNote.midi);
    const time = _time(innerNote.ticks, midi.header.ppq);
    const velocity = innerNote.velocity * 127;
    return MidiNote.builder()
        .duration(duration)
        .pitch(pitch)
        .time(time)
        .velocity(velocity)
        .create();
}

function _time(ticks: number, ppq: number): MusicalDuration {
    const pulsesPerWhole = ppq * 4;
    const value = ticks / pulsesPerWhole;
    return MusicalDuration.from(value);
}