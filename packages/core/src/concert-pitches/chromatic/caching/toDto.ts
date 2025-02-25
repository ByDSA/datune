import ConcertPitch from "../ConcertPitch";
import Dto from "./Dto";

export default function toDto(obj: ConcertPitch): Dto {
  return {
    frequency: obj.frequency,
    spn: obj.spn,
  };
}
