import { freeze } from "datils/datatypes/objects";
import { Quality } from "../Quality";

export const P: Quality = freeze(new (Quality as any)("P"));

export const M: Quality = freeze(new (Quality as any)("M"));

export const m: Quality = freeze(new (Quality as any)("m"));

export const a: Quality = freeze(new (Quality as any)("a"));

export const d: Quality = freeze(new (Quality as any)("d"));

export const da: Quality = freeze(new (Quality as any)("da"));

export const dd: Quality = freeze(new (Quality as any)("dd"));
