import type { NonEmptyArray } from "datils/datatypes/arrays";
import type { IDegreeFunc } from "./IDegreeFunc";

export interface ICompoundFunc<D, DF extends IDegreeFunc<any, D, any>> {
  degreeFunc: DF;

  degreeChain: Readonly<NonEmptyArray<D>>;
}
