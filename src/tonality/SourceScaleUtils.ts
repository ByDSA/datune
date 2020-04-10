import { Scale } from './Scale';
import { Utils } from '../Utils';

export interface SourceScaleInfo {
    scale: Scale,
    mode: number
}

export class SourceScaleUtils {
    private constructor() {
    }

    private static _sourceScales: Scale[];

    static get sourceScales() {
        return Array.from(this._sourceScales);
    }

    private static sourceScaleMap = new Map<Scale, SourceScaleInfo>();
    private static sourceScaleMapInitialize() {
        for (const sourceScale of SourceScaleUtils._sourceScales)
            SourceScaleUtils.sourceScaleMapAddModesOf(sourceScale);
    }

    private static sourceScaleMapAddModesOf(sourceScale: Scale): void {
        sourceScale.modes.forEach((value, index) => {
            SourceScaleUtils.sourceScaleMap.set(value, { scale: sourceScale, mode: index + 1 })
        });
    }

    public static getSourceScaleFrom(scale: Scale): SourceScaleInfo {
        let ret: SourceScaleInfo = SourceScaleUtils.sourceScaleMap.get(scale);
        if (!ret) {
            let allScales: Scale[] = Scale.all();

            let i = 1;
            for (const element of scale.modes) {
                if (Utils.arrayHas(allScales, element)) {
                    let modeNum = (scale.length - i + 1) % scale.length;
                    ret = { scale: element, mode: modeNum };
                }
                i++;
            }
            scale.modes.forEach((element, index) => {

            });
            if (!ret)
                ret = { scale: scale, mode: 1 };

            SourceScaleUtils.sourceScaleMapAddModesOf(ret.scale);
        }

        return ret;
    }
}