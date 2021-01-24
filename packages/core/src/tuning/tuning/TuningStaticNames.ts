import { ConcertPitch } from "../../pitches";
import { Temperament } from "../temperament/Temperament";
import { Tuning } from "./Tuning";

export class TuningStaticNames {
    static get EQUAL_440(): Tuning {
        if (!_EQUAL_440)
            _EQUAL_440 = Tuning.from(ConcertPitch.A440, Temperament.ET12);

        return _EQUAL_440;
    }
    static get LIMIT_5_SYMMETRIC_N1_440(): Tuning {
        if (!_LIMIT_5_SYMMETRIC_N1_440)
            _LIMIT_5_SYMMETRIC_N1_440 = Tuning.from(ConcertPitch.A440, Temperament.LIMIT_5_SYMMETRIC_N1);

        return _LIMIT_5_SYMMETRIC_N1_440;
    }
}

let _EQUAL_440: Tuning, _LIMIT_5_SYMMETRIC_N1_440: Tuning;