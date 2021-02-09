import { ChromaticInterval } from "../../../intervals";
import { SPN } from "../../../pitches";
import { Chromatic } from "../../../pitches";


export function minDistanceBetweenArraysOfNotes(a1: Chromatic[], a2: Chromatic[]) {
    const minDistances = [];
    for (const n1 of a1) {
        let min = 9999;
        for (const n2 of a2) {
            let d1 = ChromaticInterval.between(n1, n2);
            let d2 = ChromaticInterval.between(n2, n1);
            let dMin = Math.min(d1, d2);
            if (dMin < min)
                min = dMin;
        }
        minDistances.push(min);
    }

    return minDistances.reduce((prev, current) => prev + current);
}

export function minDistanceBetweenArraysOfSPN(a1: SPN[], a2: SPN[]) {
    const minDistances = [];
    for (const n1 of a1) {
        let min = 9999;
        for (const n2 of a2) {
            let d1 = ChromaticInterval.betweenSPN(n1, n2);
            let d2 = ChromaticInterval.betweenSPN(n2, n1);
            let dMin = Math.min(d1, d2);
            if (dMin < min)
                min = dMin;
        }
        minDistances.push(min);
    }

    return minDistances.reduce((prev, current) => prev + current);
}