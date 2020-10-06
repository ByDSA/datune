import { Chromatic } from '../../degrees/Chromatic';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';

export class NamingChromatic {
    private constructor() {
    }

    static toString(chromatic: Chromatic): string {
        let diatonicAlt = DiatonicAlt.fromChromatic(chromatic);

        return diatonicAlt.toString();
    }
}