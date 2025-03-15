import { KeyMappedFlyweightCache } from "@datune/utils";
import { SPN } from "@datune/core/spns/chromatic";
import { MidiPitch } from "../MidiPitch";

export type Key = {
  spn: SPN;
  detuned: number;
};

export const cache = new KeyMappedFlyweightCache<MidiPitch, Key, string>( {
  getId(key: Key): string {
    return `${+key.spn}-${key.detuned}`;
  },
  getKey(midiNote: MidiPitch): Key {
    return {
      spn: midiNote.spn,
      detuned: midiNote.detuned,
    };
  },
  create: key => new (MidiPitch as any)(key),
} );
