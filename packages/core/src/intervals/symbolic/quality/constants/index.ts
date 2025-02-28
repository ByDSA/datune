import { lock } from "@datune/utils/immutables";
import { Quality } from "../Quality";

export const PERFECT: Quality = lock(new (Quality as any)("P"));

export const MAJOR: Quality = lock(new (Quality as any)("M"));

export const MINOR: Quality = lock(new (Quality as any)("m"));

export const AUGMENTED: Quality = lock(new (Quality as any)("a"));

export const DIMINISHED: Quality = lock(new (Quality as any)("d"));

export const DOUBLY_AUGMENTED: Quality = lock(new (Quality as any)("da"));

export const DOUBLY_DIMINISHED: Quality = lock(new (Quality as any)("dd"));
