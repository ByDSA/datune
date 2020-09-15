import { DiatonicAltDegree } from './DiatonicAltDegree';
import { DiatonicDegree } from './DiatonicDegree';
import { diatonicDegrees, diatonics } from '../../initializer';

export default () => {
    diatonicDegrees.default();
    diatonics.default();

    DiatonicAltDegree.I = DiatonicAltDegree.from(DiatonicDegree.I, 0);
    DiatonicAltDegree.bII = DiatonicAltDegree.from(DiatonicDegree.II, -1);
    DiatonicAltDegree.II = DiatonicAltDegree.from(DiatonicDegree.II, 0);
    DiatonicAltDegree.bIII = DiatonicAltDegree.from(DiatonicDegree.III, -1);
    DiatonicAltDegree.III = DiatonicAltDegree.from(DiatonicDegree.III, 0);
    DiatonicAltDegree.IV = DiatonicAltDegree.from(DiatonicDegree.IV, 0);
    DiatonicAltDegree.bV = DiatonicAltDegree.from(DiatonicDegree.V, -1);
    DiatonicAltDegree.V = DiatonicAltDegree.from(DiatonicDegree.V, 0);
    DiatonicAltDegree.bVI = DiatonicAltDegree.from(DiatonicDegree.VI, -1);
    DiatonicAltDegree.VI = DiatonicAltDegree.from(DiatonicDegree.VI, 0);
    DiatonicAltDegree.bVII = DiatonicAltDegree.from(DiatonicDegree.VII, -1);
    DiatonicAltDegree.VII = DiatonicAltDegree.from(DiatonicDegree.VII, 0);
}