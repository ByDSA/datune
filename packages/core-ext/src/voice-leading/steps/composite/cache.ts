import { StringHashCache } from "@datune/utils";
import { Array as SingleStepArray } from "../single";
import { CompositeStep } from "./CompositeStep";

export type Dto = SingleStepArray;

export const cache = new StringHashCache<CompositeStep, Dto>( {
  hash(dto: Dto): string {
    return `${dto.map((sm) => (sm ? sm.toString() : "null" + ","))}`;
  },
  toDto(obj: CompositeStep): Dto {
    return obj.singleSteps;
  },
  create: (dto: Dto): CompositeStep => new (CompositeStep as any)(dto),
} );
