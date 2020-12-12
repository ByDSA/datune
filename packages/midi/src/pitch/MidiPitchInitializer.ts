import { Chromatic, getVarStringFrom } from '@datune/core/degrees/Chromatic';
import { DiatonicAlt } from '@datune/core/degrees/DiatonicAlt';
import { diatonicAlts, intervalDiatonicAlts, spns, tunings } from '@datune/core/initializer';
import { MidiPitch } from './MidiPitch';
import { getVarStringFromSPN, SPN } from '@datune/core/pitches/symbolic/SPN';

export default () => {
    if (MidiPitch.C5)
        return;

    spns.default();
    intervalDiatonicAlts.default();
    diatonicAlts.default();
    tunings.default();

    mainLoop: for (let i = 0; i <= 10; i++) {
        for (const chromatic of Chromatic.all()) {
            let varStr: string = getVarStringFrom(chromatic) + i;
            const diatonicAlt = DiatonicAlt.fromChromatic(chromatic);
            let varSPN = getVarStringFromSPN(diatonicAlt, i);

            MidiPitch[varStr] = MidiPitch.from(SPN[varSPN], 0);

            if (varStr == "G10")
                break mainLoop;
        }
    }

    MidiPitch.MIN = MidiPitch.C0;
    MidiPitch.MAX = MidiPitch.G10;
}