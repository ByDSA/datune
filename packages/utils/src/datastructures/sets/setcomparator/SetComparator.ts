/* eslint-disable no-continue */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
export default class SetComparator<T> {
  private _common = new Set<T>();

  private _different = new Set<T>();

  private calculated: boolean;

  constructor(private sets: Set<T>[]) {
    this.calculated = false;
  }

  compare(): void {
    this.addAllValuesToCommon();
    this.removeNonCommonValues();
    this.calculated = true;
  }

  private addAllValuesToCommon(): void {
    for (const set of this.sets) {
      for (const value of set)
        this._common.add(value);
    }
  }

  private removeNonCommonValues(): void {
    mainFor: for (const value of this._common) {
      for (const set of this.sets) {
        if (!set.has(value)) {
          this._common.delete(value);
          this._different.add(value);
          continue mainFor;
        }
      }
    }
  }

  getCommon(): Set<T> {
    this.errorIfNotCalculated();

    return this._common;
  }

  getDifferent(): Set<T> {
    this.errorIfNotCalculated();

    return this._different;
  }

  private errorIfNotCalculated() {
    if (!this.calculated)
      throw new Error("Not calculated yet");
  }
}
