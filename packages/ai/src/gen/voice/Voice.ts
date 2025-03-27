/* eslint-disable @typescript-eslint/no-unused-vars */
import type { VoiceConstraint } from "../constraints/voice/VoiceConstraint";
import { Spn } from "@datune/core/spns/chromatic";
import { MusicalDuration } from "@datune/core/rhythm";
import { MidiTimeline } from "@datune/midi";
import { ConstraintSpn } from "../constraints/pitch/ConstraintSpn";

export class Voice {
  voiceConstraints: VoiceConstraint[];

  pitchConstraints: ConstraintSpn[];

  notesTimeline: MidiTimeline;

  addPitchConstraint(c: ConstraintSpn) {
    this.pitchConstraints.push(c);
  }

  addVoiceConstraint(c: VoiceConstraint) {
    this.voiceConstraints.push(c);
  }

  checkConstraints(spn: Spn, from: MusicalDuration, to: MusicalDuration): boolean {
    return this.checkPitchConstraints(spn, from, to)
            && this.checkVoiceConstraints(from, to);
  }

  checkPitchConstraints(
    spn: Spn,
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
    spn: Spn,
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
    this.notesTimeline = new MidiTimeline();
  }
}
