import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { DiatonicAltDegree } from '../../scales/degrees/DiatonicAltDegree';
import { DegreeFunction } from './DegreeFunction';

export default () => {
    if (DegreeFunction.I)
        return;
        
    DegreeFunction.I5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.bII5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.II5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.bIII5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.III5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.IV5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.bV5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.V5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.bVI5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.VI5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.bVII5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.POWER_CHORD);
    DegreeFunction.VII5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.POWER_CHORD);

    DegreeFunction.I = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.bII = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.N6 = DegreeFunction.bII;
    DegreeFunction.II = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.bIII = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.III = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.IV = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.bV = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.V = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.bVI = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.VI = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.bVII = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_MAJOR);
    DegreeFunction.VII = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_MAJOR);

    DegreeFunction.ISUS4 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.bIISUS4 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.IISUS4 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.bIIISUS4 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.IIISUS4 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.IVSUS4 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.bVSUS4 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.VSUS4 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.bVISUS4 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.VISUS4 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.bVIISUS4 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_SUS4);
    DegreeFunction.VIISUS4 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_SUS4);

    DegreeFunction.i = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.bii = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.ii = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.biii = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.iii = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.iv = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.bv = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.v = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.bvi = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.vi = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.bvii = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_MINOR);
    DegreeFunction.vii = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_MINOR);

    DegreeFunction.I0 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.bII0 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.II0 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.bIII0 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.III0 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.IV0 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.bV0 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.V0 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.bVI0 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.VI0 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.bVII0 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_DIMINISHED);
    DegreeFunction.VII0 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_DIMINISHED);


    DegreeFunction.Iaug = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.bIIaug = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.IIaug = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.bIIIaug = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.IIIaug = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.IVaug = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.bVaug = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.Vaug = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.bVIaug = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.VIaug = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.bVIIaug = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.TRIAD_AUGMENTED);
    DegreeFunction.VIIaug = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.TRIAD_AUGMENTED);

    /* Seventh */

    DegreeFunction.I7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH);
    DegreeFunction.bII7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH);
    DegreeFunction.II7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH);
    DegreeFunction.bIII7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH);
    DegreeFunction.III7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH);
    DegreeFunction.IV7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH);
    DegreeFunction.bV7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH);
    DegreeFunction.V7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH);
    DegreeFunction.bVI7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH);
    DegreeFunction.VI7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH);
    DegreeFunction.bVII7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH);
    DegreeFunction.VII7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH);

    DegreeFunction.I7SUS4 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.bII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.II7SUS4 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.bIII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.III7SUS4 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.IV7SUS4 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.bV7SUS4 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.V7SUS4 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.bVI7SUS4 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.VI7SUS4 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.bVII7SUS4 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_SUS4);
    DegreeFunction.VII7SUS4 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_SUS4);

    DegreeFunction.I7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.bII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.II7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.bIII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.III7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.IV7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.bV7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.V7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.bVI7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.VI7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.bVII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_SUS4_b9);
    DegreeFunction.VII7SUS4b9 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_SUS4_b9);

    DegreeFunction.I6 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SIXTH);
    DegreeFunction.bII6 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SIXTH);
    DegreeFunction.II6 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SIXTH);
    DegreeFunction.bIII6 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SIXTH);
    DegreeFunction.III6 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SIXTH);
    DegreeFunction.IV6 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SIXTH);
    DegreeFunction.bV6 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SIXTH);
    DegreeFunction.V6 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SIXTH);
    DegreeFunction.bVI6 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SIXTH);
    DegreeFunction.VI6 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SIXTH);
    DegreeFunction.bVII6 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SIXTH);
    DegreeFunction.VII6 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SIXTH);

    DegreeFunction.Im6 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.bIIm6 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.IIm6 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.bIIIm6 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.IIIm6 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.IVm6 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.bVm6 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.Vm6 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.bVIm6 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.VIm6 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.bVIIm6 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SIXTH_MINOR);
    DegreeFunction.VIIm6 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SIXTH_MINOR);

    DegreeFunction.IMaj7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.bIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.IIMaj7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.bIIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.IIIMaj7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.IVMaj7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.bVMaj7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.VMaj7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.bVIMaj7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.VIMaj7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.bVIIMaj7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MAJ7);
    DegreeFunction.VIIMaj7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MAJ7);

    DegreeFunction.IMaj7b5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.bIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.IIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.bIIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.IIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.IVMaj7b5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.bVMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.VMaj7b5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.bVIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.VIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.bVIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MAJ7_b5);
    DegreeFunction.VIIMaj7b5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MAJ7_b5);

    DegreeFunction.Im7 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.bIIm7 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.IIm7 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.bIIIm7 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.IIIm7 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.IVm7 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.bVm7 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.Vm7 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.bVIm7 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.VIm7 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.bVIIm7 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MINOR);
    DegreeFunction.VIIm7 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MINOR);

    DegreeFunction.Im7b5 = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.bIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.IIm7b5 = DegreeFunction.from(DiatonicAltDegree.II, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.bIIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bIII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.IIIm7b5 = DegreeFunction.from(DiatonicAltDegree.III, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.IVm7b5 = DegreeFunction.from(DiatonicAltDegree.IV, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.bVm7b5 = DegreeFunction.from(DiatonicAltDegree.bV, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.Vm7b5 = DegreeFunction.from(DiatonicAltDegree.V, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.bVIm7b5 = DegreeFunction.from(DiatonicAltDegree.bVI, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.VIm7b5 = DegreeFunction.from(DiatonicAltDegree.VI, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.bVIIm7b5 = DegreeFunction.from(DiatonicAltDegree.bVII, DiatonicAltPattern.SEVENTH_MINOR_b5);
    DegreeFunction.VIIm7b5 = DegreeFunction.from(DiatonicAltDegree.VII, DiatonicAltPattern.SEVENTH_MINOR_b5);

    //Immutables.lockrIf(DegreeFunction, (obj) => !(obj instanceof ImmutablesCache));
}