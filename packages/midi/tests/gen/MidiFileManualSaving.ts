import { BPM, Key, MusicalDuration, Note, Scale, SPN, TimeSignature } from "@datune/core";
import { SPNArray, SPNChord } from "@datune/core/chords";
import { ChromaticInterval } from "@datune/core/intervals";
import { Func } from "@datune/core/tonalities";
import { mod, NonEmptyArray, random, TemporalNode } from "@datune/utils";
import { ConstraintSPN } from "constraints/pitch/ConstraintSPN";
import { ChordSequence, NotesSequence, TonalApproach } from "../../../analyzer/dist";
import { Instrument } from "../../src/files/Instrument";
import { MidiFile, MidiNote, MidiPitch, Track } from "../../src/index";
import { PitchMaxConstraint } from "./constraints/pitch/PitchMaxConstraint";
import { PitchMinConstraint } from "./constraints/pitch/PitchMinConstraint";
import { GenChordSeq } from "./GenChordSeq";
import { GenFuncSeq } from "./GenFuncSeq";
import { GenKeySeq } from "./GenKeySeq";
import { GenMainFuncSeq } from "./GenMainFuncSeq";

class Voice {
    minPitchConstraint: PitchMinConstraint | undefined;
    maxPitchConstraint: PitchMaxConstraint | undefined;
    lowerVoice: Voice | undefined;
    upperVoice: Voice | undefined;

    constructor() {
    }
}

let voices: Voice[] = [
    new Voice(),
    new Voice(),
    new Voice(),
    new Voice(),
];
voices[0].maxPitchConstraint = new PitchMaxConstraint(SPN.A6);
voices[0].minPitchConstraint = new PitchMinConstraint(SPN.AA5);
voices[1].maxPitchConstraint = new PitchMaxConstraint(SPN.A5);
voices[1].minPitchConstraint = new PitchMinConstraint(SPN.AA4);
voices[2].maxPitchConstraint = new PitchMaxConstraint(SPN.G4);
voices[2].minPitchConstraint = new PitchMinConstraint(SPN.C3);

function getPitch(time: MusicalDuration, notesSequence: NotesSequence, chordSequence: ChordSequence, key: Key, lastSPN: SPN | null, j: number): SPN | null {
    let availablePitches: SPN[] = [];
    let currentChordNode = chordSequence.getNodeAt(time);
    if (!currentChordNode) {
        return null;
    }
    let measure = MusicalDuration.WHOLE.withMult(4);
    let forteTime: boolean = time.value % measure.value < MusicalDuration.QUARTER.value;

    let currentChordNotes: NonEmptyArray<Note>;
    const isNewChord = chordSequence.getNodeAt(time)?.from == time;
    if (forteTime || isNewChord)
        currentChordNotes = currentChordNode.event.notes;
    else
        currentChordNotes = key.notes;
    let currentChordPitches: SPN[] = [];
    for (const n of currentChordNotes)
        for (let o = -1; o < 9; o++) {
            const spn = SPN.from(n, o);
            if (spn)
                currentChordPitches.push(spn);
        }

    currentChordPitches = currentChordPitches.filter(spn => {
        const maxConstraint = voices[j].maxPitchConstraint;
        const minConstraint = voices[j].minPitchConstraint;
        return (!maxConstraint || maxConstraint.check(spn)) &&
            (!minConstraint || minConstraint.check(spn));
    });

    if (lastSPN)
        currentChordPitches = currentChordPitches.filter(spn => {
            let dist = ChromaticInterval.betweenSPN(<SPN>lastSPN, spn);
            dist = Math.abs(dist);

            return dist <= 4;
        })

    availablePitches.push(...currentChordPitches);

    const alreadyDegrees = notesSequence.getNodesAt(time).map(spn => spn.event.degree);
    const lastCurrentChordPitches = currentChordPitches;
    currentChordPitches = currentChordPitches.filter(spn => {
        return !alreadyDegrees.includes(spn.degree);
    });
    if (lastCurrentChordPitches.length > 0 && currentChordPitches.length == 0)
        currentChordPitches = lastCurrentChordPitches;

    if (availablePitches.length == 0)
        return null;
    else if (availablePitches.length == 1)
        return availablePitches[0];

    return availablePitches[random(availablePitches.length)];
}

export function sample4(): MidiFile {
    const midiFile = MidiFile.create();
    midiFile.addBPM(BPM.from(100, MusicalDuration.QUARTER));

    const keys = [
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

    let tonalApproach = TonalApproach.create(TimeSignature._4_4);
    tonalApproach.maxDuration = MusicalDuration.LONGA.withMult(64);
    new GenKeySeq(tonalApproach, keys).generate();
    new GenMainFuncSeq(tonalApproach).generate();
    new GenFuncSeq(tonalApproach).generate();
    new GenChordSeq(tonalApproach).generate();

    let duration: MusicalDuration;
    let lastSPN: SPN | null;
    for (let j = 0; j < 2; j++) {
        const track = new Track();
        track.name = `Track ${j}`;
        midiFile.addTrack(track);

        lastSPN = null;
        for (let time = MusicalDuration.ZERO; time < tonalApproach.chordSequence.duration; time = time.withAdd(duration)) {
            duration = getDuration(j, time, tonalApproach);
            const keyChordNode = <TemporalNode<Key, MusicalDuration>>tonalApproach.keyChordSequence.getNodeAt(time);
            const keyChord = keyChordNode.event;
            const spn = getPitch(time, tonalApproach.notesSequence, tonalApproach.chordSequence, keyChord, lastSPN, j);
            lastSPN = spn;
            if (!spn)
                continue;

            const pitch = MidiPitch.from(spn);
            const note = MidiNote.builder()
                .duration(duration)
                .pitch(pitch)
                .time(time)
                .create();

            track.addNotes([note]);
            tonalApproach.notesSequence.addEvent(spn, time, time.withAdd(duration));
        }
    }

    const accompTrack = new Track();
    accompTrack.name = `Track Chords`;
    accompTrack.channel = 1;
    accompTrack.instrument = Instrument.STRING_ENSEMBLE_1;
    midiFile.addTrack(accompTrack);
    let prevNotes: SPNArray | undefined;
    tonalApproach.chordSequence.nodes.forEach(node => {
        const chord = node.event;
        const time = node.from;
        const timeTo = node.to;

        const root = <SPN>SPN.from(chord.root, 3);
        const spnChord = <SPNChord>SPNChord.fromRootPattern(root, chord.pattern);
        let notes = spnChord.notes;
        const constraints: ConstraintSPN[] = <ConstraintSPN[]>[voices[2].maxPitchConstraint, voices[2].minPitchConstraint];
        if (prevNotes)
            notes = minimizeDistance(notes, prevNotes, constraints);
        prevNotes = notes;
        const midiNotes = notes.map((spn: SPN | null) => {
            if (!spn)
                return null;
            const pitch = MidiPitch.from(spn);
            return MidiNote.builder()
                .duration(timeTo.withSub(time))
                .pitch(pitch)
                .time(time)
                .create();
        }).filter((midiNote: MidiNote) => midiNote);

        accompTrack.addNotes(midiNotes);
    })


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
        const originalDistance_i = distanceToNotes(result[i], to);
        let minDist = 9999;

        result[i] = spnCheckConstraints(result[i], constraints);
        if (result[i])
            minDist = originalDistance_i;

        let lower_i = from[i];
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

        let upper_i = from[i];
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

function getDuration(j: number, time: MusicalDuration, tonalApproach: TonalApproach): MusicalDuration {
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
    else if (durations.length > 1)
        duration = durations[random(durations.length)];
    else
        duration = MusicalDuration.from(1 - (time.value - Math.floor(time.value)));

    return duration;
}