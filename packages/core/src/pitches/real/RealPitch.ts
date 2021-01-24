export abstract class RealPitch {
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