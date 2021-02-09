import { MusicalDuration, SPN } from "@datune/core";
import { MidiPitch } from "@datune/midi";
import { Voice } from "../../voice/Voice";
import { Constraint } from "../Constraint";

export abstract class VoiceConstraint extends Constraint {
    constructor(protected otherVoice: Voice, public probability: number = 100) {
        super(probability);
    }

    abstract check(voice: Voice, from: MusicalDuration, to: MusicalDuration): boolean;
    abstract checkPitch(midiPitch: MidiPitch, from: MusicalDuration, to: MusicalDuration): boolean;
}