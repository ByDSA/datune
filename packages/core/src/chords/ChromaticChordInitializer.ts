import { ChromaticChord } from "./ChromaticChord";
import { Immutables } from '@datune/utils/Immutables';
import { PrecalcCache } from '@datune/utils/PrecalcCache';
import { Chromatic } from '../degrees/Chromatic';
import { chromatics } from '../initializer';

export default () => {
    if (ChromaticChord.C)
        return;

    chromatics.default();

    ChromaticChord.C = ChromaticChord.from([Chromatic.C, Chromatic.E, Chromatic.G]);
    ChromaticChord.Dm = ChromaticChord.from([Chromatic.D, Chromatic.F, Chromatic.A]);
    ChromaticChord.C7 = ChromaticChord.from([Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.AA]);
    ChromaticChord.Dm7 = ChromaticChord.from([Chromatic.D, Chromatic.F, Chromatic.A, Chromatic.AA]);

    Immutables.lockrIf(ChromaticChord, (obj) => !(obj instanceof PrecalcCache));
}