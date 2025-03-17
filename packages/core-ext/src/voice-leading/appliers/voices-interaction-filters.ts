import type { SPN } from "@datune/core";
import { Target } from "voice-leading/steps/Target";
import { CombinationApplierFilter } from "./filters";

// En un momento dado, cuando una línea grave supera a una aguda o al revés
export const voiceCrossingFilter: CombinationApplierFilter = ( { target } ) => {
  const lastPrevIndex = {
    i: -1,
  };

  for (let i = 1; i < target.length; i++) {
    const current = target[i];

    if (!current)
      continue;

    const prev = getPrev(target, i, lastPrevIndex);

    if (!prev)
      continue;

    if (current.valueOf() <= prev.valueOf())
      return false;
  }

  return true;
};

function getPrev(notes: Target, currentIndex: number, lastPrevIndex: { i: number } = {
  i: -1,
} ): SPN | null {
  for (let i = currentIndex - 1; i > lastPrevIndex.i; i--) {
    if (notes[i]) {
      lastPrevIndex.i = i;

      return notes[i];
    }
  }

  return null;
}

export const voiceOverlappingFilter: CombinationApplierFilter = (props): boolean => {
  if (props.base.length !== props.nonNullTarget.length)
    throw new Error();

  const lastPrevIndex = {
    i: -1,
  };

  for (let i = 1; i < props.target.length; i++) {
    const prev = getPrev(props.target, i, lastPrevIndex);

    if (!prev)
      continue;

    if (prev.valueOf() > props.base[i].valueOf())
      return false;
  }

  return true;
};
