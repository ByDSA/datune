import { SourceScaleUtils } from './SourceScaleUtils';
import { Scale } from './scale';

export default () => {
    if ((<any>SourceScaleUtils)._sourceScales)
        return;

    (<any>SourceScaleUtils)._sourceScales = [
        Scale.MAJOR,
        Scale.HARMONIC_MINOR,
        Scale.MELODIC_MINOR,
        Scale.HARMONIC_MAJOR,
        Scale.DOUBLE_HARMONIC,
        Scale.PENTATONIC
    ];

    for (const sourceScale of (<any>SourceScaleUtils)._sourceScales)
        (<any>SourceScaleUtils).sourceScaleMapAddModesOf(sourceScale);
}