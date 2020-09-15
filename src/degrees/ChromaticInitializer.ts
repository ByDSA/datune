import { Immutables } from '../common/Immutables';
import { diatonicAlts } from '../initializer';
import { Chromatic } from './Chromatic';

export default () => {
    if (Chromatic.C)
        return;

    diatonicAlts.default(); // For naming

    Chromatic.C = (<any>Chromatic).initializerConstructor(0);
    Chromatic.CC = (<any>Chromatic).initializerConstructor(1);
    Chromatic.D = (<any>Chromatic).initializerConstructor(2);
    Chromatic.DD = (<any>Chromatic).initializerConstructor(3);
    Chromatic.E = (<any>Chromatic).initializerConstructor(4);
    Chromatic.F = (<any>Chromatic).initializerConstructor(5);
    Chromatic.FF = (<any>Chromatic).initializerConstructor(6);
    Chromatic.G = (<any>Chromatic).initializerConstructor(7);
    Chromatic.GG = (<any>Chromatic).initializerConstructor(8);
    Chromatic.A = (<any>Chromatic).initializerConstructor(9);
    Chromatic.AA = (<any>Chromatic).initializerConstructor(10);
    Chromatic.B = (<any>Chromatic).initializerConstructor(11);

    (<any>Chromatic)._all = [
        Chromatic.C,
        Chromatic.CC,
        Chromatic.D,
        Chromatic.DD,
        Chromatic.E,
        Chromatic.F,
        Chromatic.FF,
        Chromatic.G,
        Chromatic.GG,
        Chromatic.A,
        Chromatic.AA,
        Chromatic.B,
    ];

    Immutables.lockr(Chromatic);
}