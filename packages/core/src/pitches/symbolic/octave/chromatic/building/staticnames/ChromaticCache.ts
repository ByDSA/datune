import { Chromatic } from "../../Chromatic";

export class ChromaticCache {
    static singleton = new ChromaticCache();

    private constructor() {
        Object.freeze(ChromaticCache.singleton);
    }

    C: Readonly<Chromatic | undefined>;
    CC: Readonly<Chromatic | undefined>;
    D: Readonly<Chromatic | undefined>;
    DD: Readonly<Chromatic | undefined>;
    E: Readonly<Chromatic | undefined>;
    F: Readonly<Chromatic | undefined>;
    FF: Readonly<Chromatic | undefined>;
    G: Readonly<Chromatic | undefined>;
    GG: Readonly<Chromatic | undefined>;
    A: Readonly<Chromatic | undefined>;
    AA: Readonly<Chromatic | undefined>;
    B: Readonly<Chromatic> | undefined;
    all: readonly Readonly<Chromatic>[] | undefined;

    newC() {
        return create(0);
    }

    newCC() {
        return create(1);
    }

    newD() {
        return create(2);
    }

    newDD() {
        return create(3);
    }

    newE() {
        return create(4);
    }

    newF() {
        return create(5);
    }

    newFF() {
        return create(6);
    }

    newG() {
        return create(7);
    }

    newGG() {
        return create(8);
    }

    newA() {
        return create(9);
    }

    newAA() {
        return create(10);
    }

    newB() {
        return create(11);
    }

    precalcC() {
        this.C = this.newC();
        return Object.freeze(this.C);
    }

    precalcCC() {
        this.CC = this.newCC();
        return Object.freeze(this.CC);
    }

    precalcD() {
        this.D = this.newD();
        return Object.freeze(this.D);
    }

    precalcDD() {
        this.DD = this.newDD();
        return Object.freeze(this.DD);
    }

    precalcE() {
        this.E = this.newE();
        return Object.freeze(this.E);
    }

    precalcF() {
        this.F = this.newF();
        return Object.freeze(this.F);
    }

    precalcFF() {
        this.FF = this.newFF();
        return Object.freeze(this.FF);
    }

    precalcG() {
        this.G = this.newG();
        return Object.freeze(this.G);
    }

    precalcGG() {
        this.GG = this.newGG();
        return Object.freeze(this.GG);
    }

    precalcA() {
        this.A = this.newA();
        return Object.freeze(this.A);
    }

    precalcAA() {
        this.AA = this.newAA();
        return Object.freeze(this.AA);
    }

    precalcB() {
        this.B = this.newB();
        return Object.freeze(this.B);
    }

    precalcAll(): readonly Readonly<Chromatic>[] {
        return [
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
        ]
    }
}

function create(n: number): Chromatic {
    return (<any>Chromatic)._create(n);
}