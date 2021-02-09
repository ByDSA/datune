import { SetComparator } from '@datune/utils';
import { DegreeAlt } from '../degreealt/DegreeAlt';
import { ScaleAltArray } from '../scalealt/ScaleAlt';

export class ScaleDegreeAltComparator extends SetComparator<DegreeAlt> {
    private constructor(sets: Set<DegreeAlt>[]) {
        super(sets);
    }

    static from(...scales: ScaleAltArray): ScaleDegreeAltComparator {
        let sets = scales.map(scale => {
            let set = new Set<DegreeAlt>();
            for (let value of scale.degrees)
                set.add(value);
            return set;
        })
        return new ScaleDegreeAltComparator(sets);
    }
}