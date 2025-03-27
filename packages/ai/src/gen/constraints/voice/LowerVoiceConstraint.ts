import { MusicalDuration } from "@datune/core";
import { MidiNote } from "@datune/midi";
import { TimelineNode } from "@datune/utils";
import { intervalBetween } from "datils/math/intervals";
import { Spn } from "@datune/core/spns/chromatic";
import { Voice } from "../../voice/Voice";
import { VoiceConstraint } from "./VoiceConstraint";

type Node = TimelineNode<MidiNote>;
export class LowerVoiceConstraint extends VoiceConstraint {
  constructor(voiceLower: Voice, public probability: number = 100) {
    super(voiceLower, probability);
  }

  check(voice: Voice, from: MusicalDuration, to: MusicalDuration): boolean {
    if (this.isMustConstrain()) {
      const interval1 = intervalBetween(from, to);
      const voiceNodes = voice.notesTimeline.getAtInterval(interval1);

      for (const node of voiceNodes) {
        const { interval } = node;
        const otherNodes = this.otherVoice.notesTimeline.getAtInterval(interval);

        for (const otherNode of otherNodes) {
          if (!innerCheck(node, otherNode))
            return false;
        }
      }
    }

    return true;
  }

  checkPitch(spn: Spn, from: MusicalDuration, to: MusicalDuration): boolean {
    const interval = intervalBetween(from, to);
    const otherNodes = this.otherVoice.notesTimeline.getAtInterval(interval);

    for (const otherNode of otherNodes) {
      if (otherNode.event.pitch.spn >= spn)
        return false;
    }

    return true;
  }
}

function innerCheck(node: Node, otherNode: Node): boolean {
  return node.event.pitch > otherNode.event.pitch;
}
