import { Time } from "@datune/utils";
import { MidiPitch } from "pitch/MidiPitch";

export type MidiNote = {
  pitch: MidiPitch;
  duration: Time;
  velocity: number;
};
