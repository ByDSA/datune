import { DiatonicPattern } from '../patterns/DiatonicPattern';
import { intervalDiatonics } from '../initializer';

export default () => {
    intervalDiatonics.default();
    
    DiatonicPattern.FIFTH = DiatonicPattern.fromRootIntervalInts(0, 4);
    DiatonicPattern.TRIAD = DiatonicPattern.fromRootIntervalInts(0, 2, 4);
    DiatonicPattern.QUARTAL = DiatonicPattern.fromRootIntervalInts(0, 3, 6);
    DiatonicPattern.SIXTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5);
    DiatonicPattern.SIXTH_ADD9 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 8);
    DiatonicPattern.SEVENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6);
    DiatonicPattern.SEVENTH_ADD11 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 10);
    DiatonicPattern.SEVENTH_ADD13 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 12);
    DiatonicPattern.NINTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8);
    DiatonicPattern.NINTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8);
    DiatonicPattern.NINTH_ADD6 = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 5, 6, 8);
    DiatonicPattern.ELEVENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10);
    DiatonicPattern.THIRTEENTH = DiatonicPattern.fromRootIntervalInts(0, 2, 4, 6, 8, 10, 12);
    DiatonicPattern.THIRTEENTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6, 8, 10, 12);
    DiatonicPattern.SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4);
    DiatonicPattern.SEVENTH_SUS4 = DiatonicPattern.fromRootIntervalInts(0, 3, 4, 6);
}