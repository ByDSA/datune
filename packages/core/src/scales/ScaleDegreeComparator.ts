import { DiatonicAltDegree } from './degrees/DiatonicAltDegree';
import { Scale } from './Scale';
import { SetComparator } from '@datune/utils/SetComparator';

export class ScaleDegreeComparator extends SetComparator<DiatonicAltDegree> {
    private constructor(sets: Set<DiatonicAltDegree>[]) {
        super(sets);
    }

    static from(scales: Scale[]): ScaleDegreeComparator {
        let sets = scales.map(scale => {
            let set = new Set<DiatonicAltDegree>();
            for (let value of scale.degrees)
                set.add(value);
            return set;
        })
        return new ScaleDegreeComparator(sets);
    }
}