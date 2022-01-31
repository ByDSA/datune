import { Time } from "@datune/utils";
import MidiPitch from "pitch/MidiPitch";

type Dto = {
  pitch: MidiPitch;
  duration: Time;
  velocity: number;
};

type RDto = Readonly<Dto>;

export default RDto;
