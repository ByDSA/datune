import { Immutables } from '@datune/utils/Immutables';
import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { Diatonic } from './Diatonic';
import { DiatonicAlt } from './DiatonicAlt';
import { diatonics } from '../initializer';

export default () => {
    if (DiatonicAlt.C)
        return;

    diatonics.default();

    DiatonicAlt.C = DiatonicAlt.from(Diatonic.C, 0);
    DiatonicAlt.CC = DiatonicAlt.from(Diatonic.C, 1);
    DiatonicAlt.CCC = DiatonicAlt.from(Diatonic.C, 2);
    DiatonicAlt.Cb = DiatonicAlt.from(Diatonic.C, -1);
    DiatonicAlt.Cbb = DiatonicAlt.from(Diatonic.C, -2);

    DiatonicAlt.D = DiatonicAlt.from(Diatonic.D, 0);
    DiatonicAlt.DD = DiatonicAlt.from(Diatonic.D, 1);
    DiatonicAlt.DDD = DiatonicAlt.from(Diatonic.D, 2);
    DiatonicAlt.Db = DiatonicAlt.from(Diatonic.D, -1);
    DiatonicAlt.Dbb = DiatonicAlt.from(Diatonic.D, -2);

    DiatonicAlt.E = DiatonicAlt.from(Diatonic.E, 0);
    DiatonicAlt.EE = DiatonicAlt.from(Diatonic.E, 1);
    DiatonicAlt.EEE = DiatonicAlt.from(Diatonic.E, 2);
    DiatonicAlt.Eb = DiatonicAlt.from(Diatonic.E, -1);
    DiatonicAlt.Ebb = DiatonicAlt.from(Diatonic.E, -2);

    DiatonicAlt.F = DiatonicAlt.from(Diatonic.F, 0);
    DiatonicAlt.FF = DiatonicAlt.from(Diatonic.F, 1);
    DiatonicAlt.FFF = DiatonicAlt.from(Diatonic.F, 2);
    DiatonicAlt.Fb = DiatonicAlt.from(Diatonic.F, -1);
    DiatonicAlt.Fbb = DiatonicAlt.from(Diatonic.F, -2);

    DiatonicAlt.G = DiatonicAlt.from(Diatonic.G, 0);
    DiatonicAlt.GG = DiatonicAlt.from(Diatonic.G, 1);
    DiatonicAlt.GGG = DiatonicAlt.from(Diatonic.G, 2);
    DiatonicAlt.Gb = DiatonicAlt.from(Diatonic.G, -1);
    DiatonicAlt.Gbb = DiatonicAlt.from(Diatonic.G, -2);

    DiatonicAlt.A = DiatonicAlt.from(Diatonic.A, 0);
    DiatonicAlt.AA = DiatonicAlt.from(Diatonic.A, 1);
    DiatonicAlt.AAA = DiatonicAlt.from(Diatonic.A, 2);
    DiatonicAlt.Ab = DiatonicAlt.from(Diatonic.A, -1);
    DiatonicAlt.Abb = DiatonicAlt.from(Diatonic.A, -2);

    DiatonicAlt.B = DiatonicAlt.from(Diatonic.B, 0);
    DiatonicAlt.BB = DiatonicAlt.from(Diatonic.B, 1);
    DiatonicAlt.BBB = DiatonicAlt.from(Diatonic.B, 2);
    DiatonicAlt.Bb = DiatonicAlt.from(Diatonic.B, -1);
    DiatonicAlt.Bbb = DiatonicAlt.from(Diatonic.B, -2);

    Immutables.lockrIf(DiatonicAlt, (obj) => !(obj instanceof PrecalcCache));
}