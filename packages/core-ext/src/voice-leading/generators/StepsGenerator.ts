import type { StepOrNull } from "../steps/Step";
import { NonEmptyArray } from "datils";

export type StepGroup = NonEmptyArray<StepOrNull>;

type Return<M = undefined> = M extends undefined
? {
  groups: StepGroup[];
}
: {
  groups: StepGroup[];
  meta: M;
};

export type StepsGenerator<P extends object, M = undefined> = (props: P)=> Return<M>;
