import { NumberArray } from "@datune/utils";
import { ChromaticPattern } from "../ChromaticPattern";

export function chromaticPatternFromString(strValue: string): ChromaticPattern | null {
    strValue = normalizeInputString(strValue);

    let ret = _getFromArrayOfNumbers(strValue);
    if (ret)
        return ret;
    ret = _getCheckingAllPatterns(strValue);

    return ret;
}

function _getFromArrayOfNumbers(strValue: string): ChromaticPattern | null {
    let pattern = null;
    if (strValue.includes("-")) {
        let array: number[] = strValue.split("-").map(str => +str);
        if (array.length === 0)
            return null;
        pattern = ChromaticPattern.fromRootIntervals(...<NumberArray>array);
    }

    return pattern;
}

function _getCheckingAllPatterns(strValue: string): ChromaticPattern | null {
    for (let pattern of ChromaticPattern.sets.all) {
        let normalizedString = normalizeInputString(pattern.toString());
        let normalizedShortName = normalizeInputString(pattern.shortName);
        let loweredStrValue = strValue.toLowerCase();

        if (loweredStrValue == normalizedString || strValue == normalizedShortName)
            return pattern;
    }

    return null;
}

export function normalizeInputString(strValue: string): string {
    strValue = strValue.replace(/ |\(|\)/g, '')
        .replace(/♯/g, '#')
        .replace(/♭/g, 'b');

    if (!_includesCaseSentitiveContent(strValue))
        strValue = strValue.toLowerCase();
    return strValue;
}

function _includesCaseSentitiveContent(strValue: string): boolean {
    return strValue.includes("m2") ||
        strValue.includes("M2") ||
        strValue.includes("m3") ||
        strValue.includes("M3");
}