import { MusicalDuration } from "@datune/core";
import { MidiNote } from "@datune/midi";
import { TemporalNode } from "@datune/utils";
import { intervalOf } from "datils/math";
import { Spn } from "@datune/core/spns/chromatic";
import { Voice } from "../../voice/Voice";
import { VoiceConstraint } from "./VoiceConstraint";

type Node = TemporalNode<MidiNote>;
export class LowerVoiceConstraint extends VoiceConstraint {
  constructor(voiceLower: Voice, public probability: number = 100) {
    super(voiceLower, probability);
  }

  check(voice: Voice, from: MusicalDuration, to: MusicalDuration): boolean {
    if (this.isMustConstrain()) {
      const interval1 = intervalOf(from, to);
      const voiceNodes = voice.notesSequence.get( {
        interval: interval1,
      } );

      for (const node of voiceNodes) {
        const { interval } = node;
        const otherNodes = this.otherVoice.notesSequence.get( {
          interval,
        } );

        for (const otherNode of otherNodes) {
          if (!innerCheck(node, otherNode))
            return false;
        }
      }
    }

    return true;
  }

  checkPitch(spn: Spn, from: MusicalDuration, to: MusicalDuration): boolean {
    const interval = intervalOf(from, to);
    const otherNodes = this.otherVoice.notesSequence.get( {
      interval,
    } );

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
