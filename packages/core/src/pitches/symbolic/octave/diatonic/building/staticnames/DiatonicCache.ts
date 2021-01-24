import { Diatonic } from "../../Diatonic";

export class DiatonicCache {
    static singleton = new DiatonicCache();

    private constructor() {
        Object.freeze(DiatonicCache.singleton);
    }

    C: Readonly<Diatonic | undefined>;
    D: Readonly<Diatonic | undefined>;
    E: Readonly<Diatonic | undefined>;
    F: Readonly<Diatonic | undefined>;
    G: Readonly<Diatonic | undefined>;
    A: Readonly<Diatonic | undefined>;
    B: Readonly<Diatonic | undefined>;
    all: readonly Diatonic[] | undefined;

    newC() {
        return create(0);
    }

    newD() {
        return create(1);
    }

    newE() {
        return create(2);
    }

    newF() {
        return create(3);
    }

    newG() {
        return create(4);
    }

    newA() {
        return create(5);
    }

    newB() {
        return create(6);
    }

    precalcC() {
        this.C = this.newC();
        return Object.freeze(this.C);
    }

    precalcD() {
        this.D = this.newD();
        return Object.freeze(this.D);
    }

    precalcE() {
        this.E = this.newE();
        return Object.freeze(this.E);
    }

    precalcF() {
        this.F = this.newF();
        return Object.freeze(this.F);
    }

    precalcG() {
        this.G = this.newG();
        return Object.freeze(this.G);
    }

    precalcA() {
        this.A = this.newA();
        return Object.freeze(this.A);
    }

    precalcB() {
        this.B = this.newB();
        return Object.freeze(this.B);
    }

    precalcAll(): readonly Readonly<Diatonic>[] {
        return [
            Diatonic.C,
            Diatonic.D,
            Diatonic.E,
            Diatonic.F,
            Diatonic.G,
            Diatonic.A,
            Diatonic.B,
        ]
    }
}

function create(n: number): Diatonic {
    return (<any>Diatonic)._create(n);
}