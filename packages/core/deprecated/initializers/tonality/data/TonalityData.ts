import { NumberArray } from "@datune/utils";

export type KeyData = KeySingleData[];

export type KeySingleData = { h: string; s: NumberArray; n: NumberArray; r3: NumberArray | null; r4: NumberArray | null };
