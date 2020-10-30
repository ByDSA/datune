import { Chromatic, getVarStringFrom } from '../../degrees/Chromatic';
import { chromatics } from '../../initializer';
import { SPN } from './SPN';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';

export default () => {
    if (SPN.A4)
        return;

    chromatics.default();

    for (let octave of [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) // El negativo es por compatibilidad con MidiPitch
        for (const chromatic of Chromatic.all()) {
            let chromaticStr = getVarStringFrom(chromatic);
            let octaveStr;
            if (octave >= 0)
                octaveStr = octave;
            else
                octaveStr = "_S" + (-octave);
            let varName = chromaticStr + octaveStr;
            SPN[varName] = SPN.from(DiatonicAlt.fromChromatic(chromatic), octave);
            Object.freeze(SPN[varName]);
        }
}