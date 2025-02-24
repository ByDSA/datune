import { StringHashCache } from "@datune/utils";
import Pitch from "../MidiPitch";
import Dto from "./Dto";

const cache = new StringHashCache<Pitch, Dto>( {
  hash(dto: Dto): string {
    return `${+dto.spn}-${dto.detuned}`;
  },
  toDto(midiNote: Pitch): Dto {
    return {
      spn: midiNote.spn,
      detuned: midiNote.detuned,
    };
  },
  create: (dto: Dto) => new (Pitch as any)(dto),
} );

export default cache;
