import { Immutables } from '../common/Immutables';
import { Diatonic } from './Diatonic';

export default () => {
    if (Diatonic.C)
        return;

    Diatonic.C = (<any>Diatonic).initializerConstructor(0);
    Diatonic.D = (<any>Diatonic).initializerConstructor(1);
    Diatonic.E = (<any>Diatonic).initializerConstructor(2);
    Diatonic.F = (<any>Diatonic).initializerConstructor(3);
    Diatonic.G = (<any>Diatonic).initializerConstructor(4);
    Diatonic.A = (<any>Diatonic).initializerConstructor(5);
    Diatonic.B = (<any>Diatonic).initializerConstructor(6);

    Immutables.lock(Diatonic);
}