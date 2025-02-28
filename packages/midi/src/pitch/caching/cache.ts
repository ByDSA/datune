import { StringHashCache } from "@datune/utils";
import { MidiPitch } from "../MidiPitch";
import { Dto } from "./Dto";

export const cache = new StringHashCache<MidiPitch, Dto>( {
  hash(dto: Dto): string {
    return `${+dto.spn}-${dto.detuned}`;
  },
  toDto(midiNote: MidiPitch): Dto {
    return {
      spn: midiNote.spn,
      detuned: midiNote.detuned,
    };
  },
  create: (dto: Dto) => new (MidiPitch as any)(dto),
} );
