import { Immutables } from '@datune/utils/Immutables';
import { DiatonicDegree } from './DiatonicDegree';

export default () => {
    if (DiatonicDegree.I)
        return;

    DiatonicDegree.I = (<any>DiatonicDegree).initializerConstructor(0);
    DiatonicDegree.II = (<any>DiatonicDegree).initializerConstructor(1);
    DiatonicDegree.III = (<any>DiatonicDegree).initializerConstructor(2);
    DiatonicDegree.IV = (<any>DiatonicDegree).initializerConstructor(3);
    DiatonicDegree.V = (<any>DiatonicDegree).initializerConstructor(4);
    DiatonicDegree.VI = (<any>DiatonicDegree).initializerConstructor(5);
    DiatonicDegree.VII = (<any>DiatonicDegree).initializerConstructor(6);

    Immutables.lockr(DiatonicDegree);
}