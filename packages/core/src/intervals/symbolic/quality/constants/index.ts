import { lock } from "@datune/utils/immutables";
import Quality from "../Quality";

export const PERFECT = lock(new (Quality as any)("P"));

export const MAJOR = lock(new (Quality as any)("M"));

export const MINOR = lock(new (Quality as any)("m"));

export const AUGMENTED = lock(new (Quality as any)("a"));

export const DIMINISHED = lock(new (Quality as any)("d"));

export const DOUBLY_AUGMENTED = lock(new (Quality as any)("da"));

export const DOUBLY_DIMINISHED = lock(new (Quality as any)("dd"));
