import { MusicalDuration } from "@datune/core";
import { SPN } from "@datune/core/spns/chromatic";
import Voice from "../../voice/Voice";
import Constraint from "../Constraint";

export default abstract class VoiceConstraint extends Constraint {
  constructor(protected otherVoice: Voice, public probability: number = 100) {
    super(probability);
  }

    abstract check(voice: Voice, from: MusicalDuration, to: MusicalDuration): boolean;

    abstract checkPitch(spn: SPN, from: MusicalDuration, to: MusicalDuration): boolean;
}
