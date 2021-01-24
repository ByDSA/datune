export abstract class SetComparator<T> {
    private _common = new Set<T>();
    private _different = new Set<T>();
    private calculated: boolean;

    protected constructor(private sets: Set<T>[]) {
        this.calculated = false;
    }

    compare(): void {
        this.addAllValuesToCommon();
        this.removeNonCommonValues();
        this.calculated = true;
    }

    private addAllValuesToCommon(): void {
        for (let set of this.sets)
            for (let value of set)
                this._common.add(value);
    }

    private removeNonCommonValues(): void {
        mainFor: for (let value of this._common)
            for (let set of this.sets) {
                if (!this.setHasValue(set, value)) {
                    this._common.delete(value)
                    this._different.add(value);
                    continue mainFor;
                }
            }
    }

    protected setHasValue(set: Set<T>, value: T): boolean {
        return set.has(value);
    }

    get common(): Set<T> {
        this.errorIfNotCalculated();
        return this._common;
    }

    get different(): Set<T> {
        this.errorIfNotCalculated();
        return this._different;
    }

    private errorIfNotCalculated() {
        if (!this.calculated)
            throw new Error("Not calculated yet");
    }
}