export abstract class Pitch {
    abstract frequency: number;
    get overtones(): number[] {
        const MAX_FREQUENCY = 20000;
        let base = this.frequency;
        let ret: number[] = [];

        for (let f = base; f < MAX_FREQUENCY; f += base) {
            ret.push(f);
        }

        return ret;
    }
}

class SimplePitch extends Pitch {
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