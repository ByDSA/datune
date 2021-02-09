import { RealPitch } from "../RealPitch";

export class SimplePitch extends RealPitch {
    constructor(private _frequency: number) {
        super();
    }

    static fromFrequency(frequency: number) {
        return new SimplePitch(frequency);
    }

    get frequency(): number {
        return this._frequency;
    }
}