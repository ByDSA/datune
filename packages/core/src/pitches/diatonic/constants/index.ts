import type { PitchArray } from "../Array";
import { lockr } from "datils/datatypes";
import { Pitch } from "../Pitch";

export const NUMBER = 7;

export const C: Pitch = new (Pitch as any)(0);

export const D: Pitch = new (Pitch as any)(1);

export const E: Pitch = new (Pitch as any)(2);

export const F: Pitch = new (Pitch as any)(3);

export const G: Pitch = new (Pitch as any)(4);

export const A: Pitch = new (Pitch as any)(5);

export const B: Pitch = new (Pitch as any)(6);

export const ALL: Readonly<PitchArray> = lockr([C, D, E, F, G, A, B]) as Readonly<PitchArray>;
