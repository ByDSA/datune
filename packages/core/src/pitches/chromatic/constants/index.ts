/* eslint-disable @typescript-eslint/naming-convention */
import { deepFreeze, freeze } from "datils/datatypes/objects";
import { Pitch } from "../Pitch";

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
freeze(Cb);
export const Db = CC;
freeze(Db);
export const Eb = DD;
freeze(Eb);
export const Fb = E;
freeze(Fb);
export const Gb = FF;
freeze(Gb);
export const Ab = GG;
freeze(Ab);
export const Bb = AA;
freeze(Bb);

export const EE = F;
freeze(EE);
export const BB = C;
freeze(BB);

export const ALL = [C, CC, D, DD, E, F, FF, G, GG, A, AA, B];
deepFreeze(ALL);

export {
  NUMBER,
} from "./Number";
