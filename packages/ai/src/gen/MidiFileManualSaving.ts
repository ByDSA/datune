import { ChordSequence, TonalApproach } from "@datune/analyzer";
import { BPM, Key, MusicalDuration, Note, SPN, TimeSignature } from "@datune/core";
import { SPNArray, SPNChord } from "@datune/core/chords";
import { ChromaticInterval } from "@datune/core/intervals";
import { Instrument, MidiFile, MidiNode, MidiNote, MidiPitch, Track } from "@datune/midi";
import { NonEmptyArray, random } from "@datune/utils";
import { ActionGen, ActionGenState } from "./actions/ActionGen";
import { ActionManager } from "./actions/ActionManager";
import { ConstraintSPN } from "./constraints/pitch/ConstraintSPN";
import { PitchDistanceConstraint } from "./constraints/pitch/DistanceConstraint";
import { PitchMaxConstraint } from "./constraints/pitch/PitchMaxConstraint";
import { PitchMinConstraint } from "./constraints/pitch/PitchMinConstraint";
import { LowerVoiceConstraint } from "./constraints/voice/LowerVoiceConstraint";
import { GenChordSeq } from "./GenChordSeq";
import { GenFuncSeq } from "./GenFuncSeq";
import { GenKeySeq } from "./GenKeySeq";
import { GenMainFuncSeq } from "./GenMainFuncSeq";
import { Voice } from "./voice/Voice";

const voicesNumber = 3;
let voices: Voice[];

function initializeVoices() {
    voices = [];
    for (let i = 0; i < voicesNumber; i++) {
        voices.push(new Voice())
        if (i == 0) {
            voices[i].addPitchConstraint(new PitchMaxConstraint(SPN.G4));
            voices[i].addPitchConstraint(new PitchMinConstraint(SPN.C4));
        } else {
            voices[i].addPitchConstraint(new PitchMaxConstraint(SPN.C7));
            voices[i].addPitchConstraint(new PitchMinConstraint(SPN.C4));

            voices[i].addVoiceConstraint(new LowerVoiceConstraint(voices[i - 1]));
        }
    }
}

function filterPitchesByLastSPNConstraint(spns: SPN[], lastSPN: SPN | null, voice: Voice): SPN[] {
    if (lastSPN)
        return spns.filter(spn => {
            const i = voices.indexOf(voice);
            if (i == 0)
                return new PitchDistanceConstraint(2).check(lastSPN, spn);
            else
                return new PitchDistanceConstraint(4).check(lastSPN, spn);
        });

    return spns;
}

function filterPitchesByPitchConstraint(spns: SPN[], voice: Voice, from: MusicalDuration, to: MusicalDuration): SPN[] {
    return spns.filter(spn => {
        return voice.checkPitchConstraints(spn, from, to);
    });
}

function filterPitchesByVoiceConstraint(midiPitches: MidiPitch[], voice: Voice, from: MusicalDuration, to: MusicalDuration): SPN[] {
    return spns.filter(spn => {
        return voice.checkVoiceConstraintsPitch(spn, from, to);
    });
}

function getAvailableNotess(time: MusicalDuration, chordSequence: ChordSequence, key: Key): Note[] {
    let currentChordNode = chordSequence.getNodeAt(time);
    if (!currentChordNode) {
        return [];
    }

    let currentChordNotes: NonEmptyArray<Note>;
    const isNewChord = chordSequence.getNodeAt(time)?.from == time;
    if (isNewChord)
        currentChordNotes = currentChordNode.event.notes;
    else
        currentChordNotes = key.notes;

    return currentChordNotes;
}

function getAvailableNotes(time: MusicalDuration, chordSequence: ChordSequence, key: Key, lastNote: MidiNote | null, voice: Voice, from: MusicalDuration): MidiNote[] {
    let currentChordNotes = getAvailableNotess(time, chordSequence, key);
    let availablePitches: SPN[] = [];
    for (const n of currentChordNotes)
        for (let o = -1; o < 9; o++) {
            const spn = SPN.from(n, o);
            if (spn) {
                availablePitches.push(spn);
            }
        }
    availablePitches = filterPitchesByVoiceConstraint(availablePitches, voice, from, to);
    availablePitches = filterPitchesByPitchConstraint(availablePitches, voice, from, to);
    availablePitches = filterPitchesByLastSPNConstraint(availablePitches, lastNote?.pitch.spn, voice);

    return availablePitches;
}

const possibleKeysInitial = [
    Key.C,
    Key.CC,
    Key.D,
    Key.DD,
    Key.E,
    Key.F,
    Key.FF,
    Key.G,
    Key.GG,
    Key.A,
    Key.AA,
    Key.B,
    Key.Cm,
    Key.CCm,
    Key.Dm,
    Key.DDm,
    Key.Em,
    Key.Fm,
    Key.FFm,
    Key.Gm,
    Key.GGm,
    Key.Am,
    Key.AAm,
    Key.Bm,
];

export function sample4(): MidiFile {
    initializeVoices();

    const midiFile = MidiFile.create();
    midiFile.addBPM(BPM.from(100, MusicalDuration.QUARTER));

    let tonalApproach = TonalApproach.create(TimeSignature._4_4);
    tonalApproach.maxDuration = MusicalDuration.LONGA.withMult(10);
    new GenKeySeq(tonalApproach, possibleKeysInitial).generate();
    new GenMainFuncSeq(tonalApproach).generate();
    new GenFuncSeq(tonalApproach).generate();
    new GenChordSeq(tonalApproach).generate();
    const tracks: Track[] = [];
    for (let j = 0; j < voicesNumber; j++) {
        const track = new Track();
        track.name = `Track ${j}`;
        midiFile.addTrack(track);
        tracks.push(track);
    }

    let actionManager = new ActionManager<ActionGen, MidiNote>();
    let state = new ActionGenState(voices);

    let cond = () => {
        return state.times[0] < tonalApproach.keySequence.duration
            && state.times[1] < tonalApproach.keySequence.duration
            && state.times[2] < tonalApproach.keySequence.duration
    }

    while (cond() && !actionManager.end) {
        const time = state.times[state.i];
        let availablenotes: MidiNote[] = [];

        const keyChordNode = tonalApproach.keyChordSequence.getNodeAt(time);
        if (!keyChordNode)
            throw new Error(time + " " + tonalApproach.keyChordSequence.duration);
        const keyChord = keyChordNode.event;
        availablenotes = getAvailableNotes(time, tonalApproach.chordSequence, keyChord, state.lasts[state.i], voices[state.i], time);

        const action = new ActionGen(availablenotes, state);

        actionManager.addAndDo(action);
    }

    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        for (let node of state.voices[i].notesSequence.nodes) {
            const note = node.event;
            track.addNotes([note]);
        }
    }

    const accompTrack = new Track();
    accompTrack.name = `Track Chords`;
    accompTrack.channel = 1;
    accompTrack.instrument = Instrument.STRING_ENSEMBLE_1;
    midiFile.addTrack(accompTrack);
    let prevNotes: SPNArray | undefined;
    const chordConstraints = [
        new PitchMaxConstraint(SPN.B3),
        new PitchMinConstraint(SPN.A2),
    ];
    tonalApproach.chordSequence.nodes.forEach(node => {
        const chord = node.event;
        const time = node.from;
        const timeTo = node.to;

        const root = <SPN>SPN.from(chord.root, 3);
        const spnChord = <SPNChord>SPNChord.fromRootPattern(root, chord.pattern);
        let notes = spnChord.notes;
        const constraints: ConstraintSPN[] = chordConstraints;
        if (prevNotes)
            notes = minimizeDistance(notes, prevNotes, constraints);
        prevNotes = notes;
        const midiNotes = notes.map((spn: SPN) => {
            const pitch = MidiPitch.from(spn);
            return MidiNote.builder()
                .duration(timeTo.withSub(time))
                .pitch(pitch)
                .from(time)
                .create();
        }).filter((midiNote: MidiNote) => midiNote);

        accompTrack.addNotes(midiNotes);
    });

    return midiFile;
}

function spnCheckConstraints(spn: SPN, constraints: ConstraintSPN[] = []): SPN | null {
    for (let c of constraints) {
        if (!c.check(spn)) {
            return null;
        }
    }

    return spn;
}

function minimizeDistance(from: SPNArray, to: SPNArray, constraints: ConstraintSPN[] = []): SPNArray {
    const result: SPNArray = [...from];
    for (let i = 0; i < from.length; i++) {
        const originalDistance_i = distanceToNotes(from[i], to);
        let minDist = 9999;

        let original_i = spnCheckConstraints(from[i], constraints);
        if (original_i) {
            minDist = originalDistance_i;
            result[i] = original_i;
        }
        let lower_i: SPN | null = from[i];
        do {
            lower_i = lower_i.withShift(-12);
            if (!lower_i) {
                break;
            }
            let lower_i2 = spnCheckConstraints(lower_i, constraints);
            if (!lower_i2)
                continue;
            lower_i = lower_i2;

            let d = distanceToNotes(lower_i, to);
            if (d < minDist) {
                minDist = d;
                result[i] = lower_i;
            } else {
                break;
            }
        } while (true);

        let upper_i: SPN | null = from[i];
        do {
            upper_i = upper_i.withShift(12);
            if (!upper_i) {
                break;
            }

            let upper_i2 = spnCheckConstraints(upper_i, constraints);
            if (!upper_i2)
                continue;
            upper_i = upper_i2;

            let d = distanceToNotes(upper_i, to);
            if (d < minDist) {
                minDist = d;
                result[i] = upper_i;
            } else {
                break;
            }
        } while (true);
    }

    return result;
}

function distanceToNotes(from: SPN, toNotes: SPNArray): number {
    let dist = 0;
    toNotes.forEach((spn: SPN) => {
        dist += Math.abs(ChromaticInterval.betweenSPN(from, spn));
    });

    return dist;
}

function getDuration(time: MusicalDuration, tonalApproach: TonalApproach): MusicalDuration {
    let duration;
    let durations: MusicalDuration[];
    durations = [
        MusicalDuration.HALF,
        MusicalDuration.QUARTER,
        MusicalDuration.EIGHTH,
    ];

    durations = durations.filter(m => {
        return time.value - Math.floor(time.value) + m.value <= 1;
    });

    if (durations.length == 1)
        return durations[0];
    else if (durations.length > 1) {
        duration = durations[random(durations.length)];
    } else
        duration = MusicalDuration.from(1 - (time.value - Math.floor(time.value)));

    return duration;
}