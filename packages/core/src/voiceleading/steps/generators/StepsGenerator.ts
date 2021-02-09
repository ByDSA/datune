import { CompositeStep } from "../composite/CompositeStep";
import { SingleStep } from "../single/SingleStep";
import { Step } from "../Step";

export type FilterStepFunction = (step: Step | SingleStep[] | null) => boolean;

export interface StepsGeneratorInterface {
    generateSteps(): Step[];
}

export function maxDistanceFilterFunction(n: number): FilterStepFunction {
    return (step: Step | SingleStep[] | null): boolean => {
        if (step instanceof SingleStep) {
            if (Math.abs(step.interval || 0) > n)
                return false;
        } else if (step instanceof CompositeStep) {
            for (const ss of step.singleSteps)
                if (Math.abs(ss.interval || 0) > n)
                    return false;
        } else if (Array.isArray(step))
            for (const ss of step)
                if (Math.abs(ss.interval || 0) > n)
                    return false;

        return true;
    }
}