import { Chord, Key } from "@datune/core";
import { TimelineNode, Time } from "@datune/utils";
import { deepFreeze } from "datils/datatypes/objects";

export type ListenerState = {
  bar: {
    last: Time | undefined;
    next: Time | undefined;
  };
  beat: {
    last: Time | undefined;
    next: Time | undefined;
    duration: Time | undefined;
  };
  tonal: {
    key: Key | undefined;
    rootChord: Chord | undefined;
  };
  currentChordNode?: TimelineNode<Chord>;
  currentKeyNode?: TimelineNode<Key>;
};

export const INITIAL_LISTENER: ListenerState = deepFreeze( {
  bar: {
    last: undefined,
    next: undefined,
  },
  beat: {
    possibleBeats: [],
    last: undefined,
    next: undefined,
    duration: undefined,
  },
  tonal: {
    key: undefined,
    rootChord: undefined,
  },
} );
