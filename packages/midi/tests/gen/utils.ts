import { DegreeAlt, MusicalDuration } from "@datune/core";
import { DegreeFunction } from "@datune/core/tonalities";

export const commonDegreesWith = (degreeFunction: DegreeFunction, withDegrees: DegreeAlt[]): boolean => {
    let common = 0;
    for (const d of degreeFunction.degrees)
        if (withDegrees.includes(d))
            common++;

    if (common >= 2)
        return true;
    return false;
}

export const isTonic = (degreeFunction: DegreeFunction): boolean => {
    return commonDegreesWith(degreeFunction, [
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.III,
        DegreeAlt.V,
    ]);
}

export const isSubDominant = (degreeFunction: DegreeFunction): boolean => {
    return commonDegreesWith(degreeFunction, [
        DegreeAlt.IV,
        DegreeAlt.bVI,
        DegreeAlt.VI,
        DegreeAlt.I,
    ]);
}

export const isDominant = (degreeFunction: DegreeFunction): boolean => {
    return commonDegreesWith(degreeFunction, [
        DegreeAlt.V,
        DegreeAlt.VII,
        DegreeAlt.bVII,
        DegreeAlt.II,
    ]);
}

export function limitTime(m: MusicalDuration, limit: MusicalDuration): MusicalDuration {
    return MusicalDuration.from(Math.min(m.value, limit.value));
}