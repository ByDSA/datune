import { DegreeAlt } from "../../DegreeAlt";
import { DiatonicDegree } from "../../../../degrees/DiatonicDegree";

export class DegreeAltStaticNames {
    static get I(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.I, 0);
    }
    static get bII(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.II, -1);
    }
    static get II(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.II, 0);
    }
    static get bIII(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.III, -1);
    }
    static get III(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.III, 0);
    }
    static get IV(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.IV, 0);
    }
    static get bV(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.V, -1);
    }
    static get V(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.V, 0);
    }
    static get bVI(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.VI, -1);
    }
    static get VI(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.VI, 0);
    }
    static get bVII(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.VII, -1);
    }
    static get VII(): DegreeAlt {
        return DegreeAlt.from(DiatonicDegree.VII, 0);
    }
}