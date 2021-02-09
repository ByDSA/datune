import { MusicalDuration, SPN } from "@datune/core";
import { MidiNote, MidiPitch } from "@datune/midi";
import { Interval, TemporalNode } from "@datune/utils";
import { Voice } from "../../voice/Voice";
import { VoiceConstraint } from "./VoiceConstraint";

type Node = TemporalNode<MidiNote, MusicalDuration>;
export class LowerVoiceConstraint extends VoiceConstraint {
    constructor(voiceLower: Voice, public probability: number = 100) {
        super(voiceLower, probability);
    }

    check(voice: Voice, from: MusicalDuration, to: MusicalDuration): boolean {
        if (this.isMustConstrain()) {
            const interval = Interval.fromInclusiveToExclusive(from, to);
            const voiceNodes = voice.notesSequence.getNodesAtInterval(interval);

            for (const node of voiceNodes) {
                const interval = Interval.fromInclusiveToExclusive(node.from, node.to);
                const otherNodes = this.otherVoice.notesSequence.getNodesAtInterval(interval);
                for (const otherNode of otherNodes) {
                    if (!this.innerCheck(node, otherNode))
                        return false;
                }
            }

        }
        return true;
    }

    checkPitch(midiPitch: MidiPitch, from: MusicalDuration, to: MusicalDuration): boolean {
        const interval = Interval.fromInclusiveToExclusive(from, to);
        const otherNodes = this.otherVoice.notesSequence.getNodesAtInterval(interval);

        for (const otherNode of otherNodes) {
            if (otherNode.event.pitch >= midiPitch)
                return false;
        }

        return true;
    }


    protected innerCheck(node: Node, otherNode: Node): boolean {
        return node.event.pitch > otherNode.event.pitch;
    }
}