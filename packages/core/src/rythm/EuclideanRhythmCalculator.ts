import { arraySameContent } from '@datune/utils/Utils';
import { RhythmPattern } from './RhythmPattern';

export class EuclideanRhythmCalculator {
    private onNotes: number;
    private totalNotes: number;

    private groups: number[][];
    private lastIndexOfGroups: number;
    private count: number;

    private constructor(onNotes: number, totalNotes: number) {
        this.onNotes = onNotes;
        this.totalNotes = totalNotes;
    }

    static calculate(onNotes: number, totalNotes: number): RhythmPattern {
        let eucledianRythmCalculator
            = new EuclideanRhythmCalculator(onNotes, totalNotes);
        eucledianRythmCalculator.initialize();
        eucledianRythmCalculator.process();

        return eucledianRythmCalculator.getRythm();
    }

    private initialize(): void {
        this.groups = [];
        for (let i = 0; i < this.totalNotes; i++) {
            let b = i < this.onNotes;
            let n = b ? 1 : 0;
            this.groups.push([n]);
        }
    }

    private process(): void {
        this.updateLastIndexOfGroups();
        while (this.lastIndexOfGroups > 0) {
            this.count = this.calculateCount();
            if (this.count < 0)
                break;
            this.updateGroups();

            this.updateLastIndexOfGroups();
        }
    }

    private updateGroups(): void {
        let newGroups: number[][] = [];

        newGroups = this.getAddedPairedGroupsTo(newGroups);
        newGroups = this.getAddedUnpairedGroupsTo(newGroups);

        this.groups = newGroups;
    }

    private getAddedPairedGroupsTo(newGroups: number[][]): number[][] {
        for (let i = 0; i < this.count; i++) {
            let group_i: number[] = this.groups[i];
            group_i = group_i.concat(this.groups[this.lastIndexOfGroups - i]);
            newGroups.push(group_i);
        }

        return newGroups;
    }

    private getAddedUnpairedGroupsTo(newGroups: number[][]): number[][] {
        const subList = this.groups.slice(this.count, this.groups.length - this.count);
        return newGroups.concat(subList);
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
        while (start < this.lastIndexOfGroups && arraySameContent(firstGroup, this.groups[start]))
            start++;

        return start;
    }

    private calculateEndIndex(): number {
        let end = this.lastIndexOfGroups;
        let lastGroup = this.groups[this.lastIndexOfGroups];
        while (end > 0 && arraySameContent(lastGroup, this.groups[end]))
            end--;

        return end;
    }

    private updateLastIndexOfGroups(): void {
        this.lastIndexOfGroups = this.groups.length - 1;
    }

    private getRythm(): RhythmPattern {
        let ret = EuclideanRhythmCalculator.concatenateGroups(this.groups);

        let a: number[] = Array.from(ret);

        let retRythm = RhythmPattern.fromArray(...a);

        if (this.onNotes == this.totalNotes - 1)
            retRythm = retRythm.getReversed();

        return retRythm;
    }

    private static concatenateGroups(groups: number[][]): number[] {
        let ret: number[] = [];
        for (let integerList of groups) {
            ret = ret.concat(integerList);
        }

        return ret;
    }
}