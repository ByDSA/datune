import { MusicalDuration } from "./MusicalDuration";

export class MusicalDurationStaticNames {
    static get MAXIMA(): MusicalDuration {
        if (!_MAXIMA)
            _MAXIMA = MusicalDuration.from(8);
        return _MAXIMA;
    }
    static get LONGA(): MusicalDuration {
        if (!_LONGA)
            _LONGA = MusicalDuration.from(4);
        return _LONGA;
    }
    static get DOUBLE(): MusicalDuration {
        if (!_DOUBLE)
            _DOUBLE = MusicalDuration.from(2);
        return _DOUBLE;
    }
    static get WHOLE(): MusicalDuration {
        if (!_WHOLE)
            _WHOLE = MusicalDuration.from(1);
        return _WHOLE;
    }
    static get HALF(): MusicalDuration {
        if (!_HALF)
            _HALF = MusicalDuration.from(1 / 2.0);
        return _HALF;
    }
    static get QUARTER(): MusicalDuration {
        if (!_QUARTER)
            _QUARTER = MusicalDuration.from(1 / 4.0);
        return _QUARTER;
    }
    static get EIGHTH(): MusicalDuration {
        if (!_EIGHTH)
            _EIGHTH = MusicalDuration.from(1 / 8.0);
        return _EIGHTH;
    }
    static get SIXTEENTH(): MusicalDuration {
        if (!_SIXTEENTH)
            _SIXTEENTH = MusicalDuration.from(1 / 16.0);
        return _SIXTEENTH;
    }
    static get THIRTYSECOND(): MusicalDuration {
        if (!_THIRTYSECOND)
            _THIRTYSECOND = MusicalDuration.from(1 / 32.0);
        return _THIRTYSECOND;
    }
    static get SIXTYFOURTH(): MusicalDuration {
        if (!_SIXTYFOURTH)
            _SIXTYFOURTH = MusicalDuration.from(1 / 64.0);
        return _SIXTYFOURTH;
    }

    static get MIN(): MusicalDuration {
        return this.SIXTYFOURTH;
    }

    static get ZERO(): MusicalDuration {
        if (!_ZERO)
            _ZERO = MusicalDuration.from(0);
        return _ZERO;
    }
}

let _ZERO: MusicalDuration, _MAXIMA: MusicalDuration, _LONGA: MusicalDuration, _DOUBLE: MusicalDuration, _WHOLE: MusicalDuration, _HALF: MusicalDuration, _QUARTER: MusicalDuration, _EIGHTH: MusicalDuration, _SIXTEENTH: MusicalDuration, _THIRTYSECOND: MusicalDuration, _SIXTYFOURTH: MusicalDuration;