import type { ArrayRhythm } from "../array";
import type { RhythmPattern } from "../Pattern";
import { Arrays } from "@datune/utils";
import { fromArray } from "../building";
import { reverse } from "../modifiers";

type Group = Arrays.NonEmpty<0 | 1>;
type Groups = Arrays.NonEmpty<Group>;
export class EuclideanRhythmCalculator {
  #onNotes: number;

  #totalNotes: number;

  #groups: Groups;

  #lastIndexOfGroups: number;

  #count: number;

  private constructor(onNotes: number, totalNotes: number) {
    this.#onNotes = onNotes;
    this.#totalNotes = totalNotes;
    this.#lastIndexOfGroups = -1;
    this.#count = 0;
    this.#groups = [[0]];
  }

  static calculate(onNotes: number, totalNotes: number): RhythmPattern {
    if (totalNotes < 1)
      throw new Error();

    const eucledianRythmCalculator = new EuclideanRhythmCalculator(onNotes, totalNotes);

    eucledianRythmCalculator.initialize();
    eucledianRythmCalculator.process();

    return eucledianRythmCalculator.getRythm();
  }

  private initialize(): void {
    const groups = [];

    for (let i = 0; i < this.#totalNotes; i++) {
      const b = i < this.#onNotes;
      const n = b ? 1 : 0;

      groups.push([n]);
    }

    this.#groups = <Groups>groups;
  }

  private process(): void {
    this.#lastIndexOfGroups = this.updateLastIndexOfGroups();

    while (this.#lastIndexOfGroups > 0) {
      this.#count = this.calculateCount();

      if (this.#count < 0)
        break;

      this.updateGroups();

      this.updateLastIndexOfGroups();
    }
  }

  private updateGroups(): void {
    const newGroups = this.getAddedPairedGroups();

    this.#groups = this.getAddedUnpairedGroupsTo(newGroups);
  }

  private getAddedPairedGroups(): Group[] {
    const newGroups: Group[] = [];

    for (let i = 0; i < this.#count; i++) {
      let groupI: Group = this.#groups[i];

      groupI = <Group>groupI.concat(this.#groups[this.#lastIndexOfGroups - i]);
      newGroups.push(groupI);
    }

    return newGroups;
  }

  private getAddedUnpairedGroupsTo(newGroups: Group[]): Groups {
    const subList = this.#groups.slice(this.#count, this.#groups.length - this.#count);

    return <Groups>newGroups.concat(subList);
  }

  private calculateCount(): number {
    const start = this.calculateStartIndex();

    if (start === this.#lastIndexOfGroups)
      return -1;

    const end = this.calculateEndIndex();

    if (end === 0)
      return -1;

    return Math.min(start, this.#lastIndexOfGroups - end);
  }

  private calculateStartIndex(): number {
    let start = 0;
    const [firstGroup] = this.#groups;

    while (
      start < this.#lastIndexOfGroups && Arrays.hasSameContent(firstGroup, this.#groups[start])
    )
      start++;

    return start;
  }

  private calculateEndIndex(): number {
    let end = this.#lastIndexOfGroups;
    const lastGroup = this.#groups[this.#lastIndexOfGroups];

    while (end > 0 && Arrays.hasSameContent(lastGroup, this.#groups[end]))
      end--;

    return end;
  }

  private updateLastIndexOfGroups(): number {
    this.#lastIndexOfGroups = this.#groups.length - 1;

    return this.#lastIndexOfGroups;
  }

  private getRythm(): RhythmPattern {
    const ret = EuclideanRhythmCalculator.concatenateGroups(this.#groups);
    const a: ArrayRhythm = [...<ArrayRhythm>ret];
    let retRythm = fromArray(...a);

    if (this.#onNotes === this.#totalNotes - 1)
      retRythm = reverse(retRythm);

    return retRythm;
  }

  private static concatenateGroups(groups: Groups): Group {
    return groups.reduce((prev, current) => <Group>prev.concat(current));
  }
}

export function calculateEuclideanRhythm(onNotes: number, totalNotes: number): RhythmPattern {
  return EuclideanRhythmCalculator.calculate(onNotes, totalNotes);
}
