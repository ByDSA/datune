import type { Step } from "../steps/Step";

type Return<M = undefined> = M extends undefined
? {
  steps: Step[];
}
: {
  steps: Step[];
  meta: M;
};

export type StepsGenerator<P extends object, M = undefined> = (props: P)=> Return<M>;
