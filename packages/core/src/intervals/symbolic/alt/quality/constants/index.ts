import { lock } from "datils/datatypes";
import { Quality } from "../Quality";

export const P: Quality = lock(new (Quality as any)("P"));

export const M: Quality = lock(new (Quality as any)("M"));

export const m: Quality = lock(new (Quality as any)("m"));

export const a: Quality = lock(new (Quality as any)("a"));

export const d: Quality = lock(new (Quality as any)("d"));

export const da: Quality = lock(new (Quality as any)("da"));

export const dd: Quality = lock(new (Quality as any)("dd"));
