import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { Scale } from '../tonality/Scale';
import { SetComparator } from './SetComparator';

export class ScaleDegreeEnharmonicComparator extends SetComparator<DiatonicAltDegree> {
    private constructor(sets: Set<DiatonicAltDegree>[]) {
        super(sets);
    }

    public static from(scales: Scale[]): ScaleDegreeEnharmonicComparator {
        let sets = scales.map(scale => {
            let set = new Set<DiatonicAltDegree>();
            for (let value of scale.degrees)
                set.add(value);
            return set;
        })
        return new ScaleDegreeEnharmonicComparator(sets);
    }

    protected mapValue(value: DiatonicAltDegree): number {
        return value.semis;
    }

    protected setHasValue(set: Set<DiatonicAltDegree>, value: DiatonicAltDegree): boolean {
        return Array.from(set).map(this.mapValue).includes(this.mapValue(value));
    }
}