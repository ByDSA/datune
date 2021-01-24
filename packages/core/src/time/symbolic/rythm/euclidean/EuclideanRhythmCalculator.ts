import { Arrays } from '@datune/utils';
import { NonEmptyArray } from '@datune/utils/datastructures/arrays/Arrays';
import { RhythmArray } from '../pattern/RhythmArray';
import { RhythmPattern } from '../pattern/RhythmPattern';

type Group = NonEmptyArray<0 | 1>;
type Groups = NonEmptyArray<Group>;
export class EuclideanRhythmCalculator {
    private onNotes: number;
    private totalNotes: number;

    private groups: Groups;
    private lastIndexOfGroups: number;
    private count: number;

    private constructor(onNotes: number, totalNotes: number) {
        this.onNotes = onNotes;
        this.totalNotes = totalNotes;
        this.lastIndexOfGroups = -1;
        this.count = 0;
        this.groups = [[0]];
    }

    static calculate(onNotes: number, totalNotes: number): RhythmPattern {
        if (totalNotes < 1)
            throw new Error();
        let eucledianRythmCalculator
            = new EuclideanRhythmCalculator(onNotes, totalNotes);
        eucledianRythmCalculator.initialize();
        eucledianRythmCalculator.process();

        return eucledianRythmCalculator.getRythm();
    }

    private initialize(): void {
        let groups = [];
        for (let i = 0; i < this.totalNotes; i++) {
            let b = i < this.onNotes;
            let n = b ? 1 : 0;
            groups.push([n]);
        }

        this.groups = <Groups>groups;
    }

    private process(): void {
        this.lastIndexOfGroups = this.updateLastIndexOfGroups();
        while (this.lastIndexOfGroups > 0) {
            this.count = this.calculateCount();
            if (this.count < 0)
                break;
            this.updateGroups();

            this.updateLastIndexOfGroups();
        }
    }

    private updateGroups(): void {
        let newGroups = this.getAddedPairedGroups();
        this.groups = this.getAddedUnpairedGroupsTo(newGroups);
    }

    private getAddedPairedGroups(): Group[] {
        let newGroups: Group[] = [];
        for (let i = 0; i < this.count; i++) {
            let group_i: Group = this.groups[i];
            group_i = <Group>group_i.concat(this.groups[this.lastIndexOfGroups - i]);
            newGroups.push(group_i);
        }

        return newGroups;
    }

    private getAddedUnpairedGroupsTo(newGroups: Group[]): Groups {
        const subList = this.groups.slice(this.count, this.groups.length - this.count);
        return <Groups>newGroups.concat(subList);
    }

    private calculateCount(): number {
        let start = this.calculateStartIndex();
        if (start == this.lastIndexOfGroups)
            return -1;

        let end = this.calculateEndIndex();
        if (end == 0)
            return -1;

        return Math.min(start, this.lastIndexOfGroups - end);
    }

    private calculateStartIndex(): number {
        let start = 0;
        let firstGroup = this.groups[0];
        while (start < this.lastIndexOfGroups && Arrays.hasSameContent(firstGroup, this.groups[start]))
            start++;

        return start;
    }

    private calculateEndIndex(): number {
        let end = this.lastIndexOfGroups;
        let lastGroup = this.groups[this.lastIndexOfGroups];
        while (end > 0 && Arrays.hasSameContent(lastGroup, this.groups[end]))
            end--;

        return end;
    }

    private updateLastIndexOfGroups(): number {
        return this.lastIndexOfGroups = this.groups.length - 1;
    }

    private getRythm(): RhythmPattern {
        let ret = EuclideanRhythmCalculator.concatenateGroups(this.groups);

        let a: RhythmArray = [...<RhythmArray>ret];

        let retRythm = RhythmPattern.fromArray(...a);

        if (this.onNotes == this.totalNotes - 1)
            retRythm = retRythm.withReversed();

        return retRythm;
    }

    private static concatenateGroups(groups: Groups): Group {
        return groups.reduce((prev, current) => <Group>prev.concat(current));
    }
}