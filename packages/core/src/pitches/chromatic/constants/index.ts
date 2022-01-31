/* eslint-disable import/no-mutable-exports */
import { lock, lockr } from "@datune/utils/immutables";
import Pitch from "../Pitch";

export const NUMBER = 12;

export const C: Pitch = new (Pitch as any)(0);

export const CC: Pitch = new (Pitch as any)(1);

export const D: Pitch = new (Pitch as any)(2);

export const DD: Pitch = new (Pitch as any)(3);

export const E: Pitch = new (Pitch as any)(4);

export const F: Pitch = new (Pitch as any)(5);

export const FF: Pitch = new (Pitch as any)(6);

export const G: Pitch = new (Pitch as any)(7);

export const GG: Pitch = new (Pitch as any)(8);

export const A: Pitch = new (Pitch as any)(9);

export const AA: Pitch = new (Pitch as any)(10);

export const B: Pitch = new (Pitch as any)(11);

export const Cb = B;
lock(Cb);
export const Db = CC;
lock(Db);
export const Eb = DD;
lock(Eb);
export const Fb = E;
lock(Fb);
export const Gb = FF;
lock(Gb);
export const Ab = GG;
lock(Ab);
export const Bb = AA;
lock(Bb);

export const EE = F;
lock(EE);
export const BB = C;
lock(BB);

export const ALL = [C, CC, D, DD, E, F, FF, G, GG, A, AA, B];
lockr(ALL);
