import { ScaleAlt } from '../scalealt/ScaleAlt';

export type SourceScaleInfo = {
    scale: ScaleAlt,
    mode: number
}

let _sourceScales: ScaleAlt[];
let _sourceScaleMap = new Map<ScaleAlt, SourceScaleInfo>();

export namespace SourceScale {
    export function all() {
        _initializeIfNot();
        return [..._sourceScales];
    }

    export function getFromScaleAlt(scale: ScaleAlt): SourceScaleInfo {
        _initializeIfNot();
        let ret: SourceScaleInfo | undefined = _sourceScaleMap.get(scale);
        if (!ret)
            ret = _calcSourceScale(scale);

        return ret;
    }
}

function _sourceScaleMapAddModesOf(sourceScale: ScaleAlt): void {
    _initializeIfNot();
    sourceScale.modes.forEach((value, index) => {
        _sourceScaleMap.set(<ScaleAlt>value, { scale: sourceScale, mode: index + 1 })
    });
}

function _calcSourceScale(scaleAlt: ScaleAlt): SourceScaleInfo {
    let ret = _findSourceScaleInModes(scaleAlt);

    if (!ret)
        ret = _createNewSourceScale(scaleAlt);

    _sourceScaleMapAddModesOf(ret.scale);

    return ret;
}

function _createNewSourceScale(scaleAlt: ScaleAlt): SourceScaleInfo {
    return { scale: scaleAlt, mode: 1 };
}

function _findSourceScaleInModes(scaleAlt: ScaleAlt): SourceScaleInfo | null {
    const COMMON_SCALES: Set<ScaleAlt> = ScaleAlt.sets.common();
    let ret = null;

    let i = 1;
    for (const mode of scaleAlt.modes) {
        if (COMMON_SCALES.has(mode)) {
            let modeNum = (scaleAlt.length - i + 1) % scaleAlt.length;
            ret = { scale: mode, mode: modeNum };
        }
        i++;
    }

    return ret;
}

function _initializeIfNot() {
    if (_sourceScales)
        return;
    _sourceScales = [
        ScaleAlt.MAJOR,
        ScaleAlt.HARMONIC_MINOR,
        ScaleAlt.MELODIC_MINOR,
        ScaleAlt.HARMONIC_MAJOR,
        ScaleAlt.DOUBLE_HARMONIC,
        ScaleAlt.PENTATONIC
    ];

    for (const sourceScale of _sourceScales)
        _sourceScaleMapAddModesOf(sourceScale);
}