import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { Scale } from '../tonality/Scale';
import { SetComparator } from './SetComparator';

export class ScaleDegreeComparator extends SetComparator<DiatonicAltDegree> {
    private constructor(sets: Set<DiatonicAltDegree>[]) {
        super(sets);
    }

    public static from(scales: Scale[]): ScaleDegreeComparator {
        let sets = scales.map(scale => {
            let set = new Set<DiatonicAltDegree>();
            for (let value of scale.degrees)
                set.add(value);
            return set;
        })
        return new ScaleDegreeComparator(sets);
    }
}