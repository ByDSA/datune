import { Arrays } from "@datune/utils";
import pitchToDto from "pitches/chromatic/caching/toDto";
import Chord from "../Chord";
import Dto from "./Dto";

export default (self: Chord): Dto => {
  const dto = self.pitches.map(pitchToDto);

  return dto as Arrays.Number;
};
