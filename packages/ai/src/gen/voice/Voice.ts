/* eslint-disable @typescript-eslint/no-unused-vars */
import { SPN } from "@datune/core/spns/chromatic";
import { MusicalDuration } from "@datune/core/time";
import { MidiSequence } from "@datune/midi";
import ConstraintSPN from "../constraints/pitch/ConstraintSPN";
import VoiceConstraint from "../constraints/voice/VoiceConstraint";

export default class Voice {
  voiceConstraints: VoiceConstraint[];

  pitchConstraints: ConstraintSPN[];

  notesSequence: MidiSequence;

  addPitchConstraint(c: ConstraintSPN) {
    this.pitchConstraints.push(c);
  }

  addVoiceConstraint(c: VoiceConstraint) {
    this.voiceConstraints.push(c);
  }

  checkConstraints(spn: SPN, from: MusicalDuration, to: MusicalDuration): boolean {
    return this.checkPitchConstraints(spn, from, to)
            && this.checkVoiceConstraints(from, to);
  }

  checkPitchConstraints(
    spn: SPN,
    from: MusicalDuration,
    to: MusicalDuration,
  ): boolean {
    for (const c of this.pitchConstraints) {
      if (!c.check(spn))
        return false;
    }

    return true;
  }

  checkVoiceConstraints(from: MusicalDuration, to: MusicalDuration): boolean {
    for (const c of this.voiceConstraints) {
      if (!c.check(this, from, to))
        return false;
    }

    return true;
  }

  checkVoiceConstraintsPitch(
    spn: SPN,
    from: MusicalDuration,
    to: MusicalDuration,
  ): boolean {
    for (const c of this.voiceConstraints) {
      if (!c.checkPitch(spn, from, to))
        return false;
    }

    return true;
  }

  constructor() {
    this.pitchConstraints = [];
    this.voiceConstraints = [];
    this.notesSequence = new MidiSequence();
  }
}
