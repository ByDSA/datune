import { Chromatic } from "../../Chromatic";
import { ChromaticCache } from "./ChromaticCache";

export class NoteStaticNames {
    static NUMBER = 12;

    static get C(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.C || ChromaticCache.singleton.precalcC());
    }
    static get CC(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.CC || ChromaticCache.singleton.precalcCC());
    }
    static get D(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.D || ChromaticCache.singleton.precalcD());
    }
    static get DD(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.DD || ChromaticCache.singleton.precalcDD());
    }
    static get E(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.E || ChromaticCache.singleton.precalcE());
    }
    static get F(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.F || ChromaticCache.singleton.precalcF());
    }
    static get FF(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.FF || ChromaticCache.singleton.precalcFF());
    }
    static get G(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.G || ChromaticCache.singleton.precalcG());
    }
    static get GG(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.GG || ChromaticCache.singleton.precalcGG());
    }
    static get A(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.A || ChromaticCache.singleton.precalcA());
    }
    static get AA(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.AA || ChromaticCache.singleton.precalcAA());
    }
    static get B(): Chromatic {
        return <Chromatic>(ChromaticCache.singleton.B || ChromaticCache.singleton.precalcB());
    }
    static get all(): readonly Chromatic[] {
        return <Chromatic[]>(ChromaticCache.singleton.all || ChromaticCache.singleton.precalcAll());
    }
}