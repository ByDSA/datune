import * as fs from "fs";

export abstract class Initializer<Data> {
    private _data: Data | undefined | null;
    private _mode: Mode | undefined;

    protected constructor() {
    }

    initialized(): boolean {
        return !!this._data;
    }

    saveTo(path: string): boolean {
        if (!this.initialized())
            return false;

        const dataStr = JSON.stringify(this._data);
        fs.writeFileSync(path, dataStr);
        return true;
    }

    loadFrom(path: string): Data | null {
        if (this._mode === Mode.LOAD && this._data)
            return this._data;

        try {
            this._data = this.innerLoad(path);
        } catch (err) {
            return null;
        }

        if (!this._data)
            return null;

        if (!this.initialize(this._data)) {
            this._data = null;
            return null;
        }

        this._mode = Mode.LOAD;
        return this._data;
    }

    protected abstract innerLoad(path: string): Data | null;

    precalc(): Data | null {
        if (this._mode === Mode.PRECALC && this._data)
            return this._data;
        this._data = this.innerPrecalc();

        if (!this._data)
            return null;

        if (!this.initialize(this._data)) {
            this._data = null;
            return null;
        }

        this._mode = Mode.PRECALC;
        return this._data;
    }

    abstract initialize(data: Data): boolean;

    protected abstract innerPrecalc(): Data;

    clearData(): void {
        this._data = undefined;
        this._mode = undefined;
    }
}

enum Mode {
    LOAD, PRECALC
}