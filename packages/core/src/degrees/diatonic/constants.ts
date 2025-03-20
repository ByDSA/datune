import { deepFreeze } from "datils/datatypes/objects";
import { Degree } from "./Degree";

export const I = new (Degree as any)(0);

export const II = new (Degree as any)(1);

export const III = new (Degree as any)(2);

export const IV = new (Degree as any)(3);

export const V = new (Degree as any)(4);

export const VI = new (Degree as any)(5);

export const VII = new (Degree as any)(6);

export const ALL = deepFreeze([
  I,
  II,
  III,
  IV,
  V,
  VI,
  VII,
]);
