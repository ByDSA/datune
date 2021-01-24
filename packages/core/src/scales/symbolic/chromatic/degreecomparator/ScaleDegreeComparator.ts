import { SetComparator } from '@datune/utils';
import { ScaleArray } from '../scale/Scale';

export class ScaleDegreeComparator extends SetComparator<number> {
    private constructor(sets: Set<number>[]) {
        super(sets);
    }

    static from(...scales: ScaleArray): ScaleDegreeComparator {
        let sets = scales.map(scale => {
            let set = new Set<number>();
            for (let value of scale.degrees)
                set.add(value);
            return set;
        })
        return new ScaleDegreeComparator(sets);
    }

    protected setHasValue(set: Set<number>, value: number): boolean {
        return set.has(value);
    }
}