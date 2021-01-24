import { Settings } from "../../../config";

export class Quality {
    static get PERFECT(): Quality {
        return _PERFECT;
    }
    static get MAJOR(): Quality {
        return _MAJOR;
    }
    static get MINOR(): Quality {
        return _MINOR;
    }
    static get AUGMENTED(): Quality {
        return _AUGMENTED;
    }
    static get DIMINISHED(): Quality {
        return _DIMINISHED;
    }
    static get DOUBLY_AUGMENTED(): Quality {
        return _DOUBLY_AUGMENTED;
    }
    static get DOUBLY_DIMINISHED(): Quality {
        return _DOUBLY_DIMINISHED;
    }

    static fromString(str: string): Quality | null {
        switch (str) {
            case Quality.MAJOR.shortName:
            case Quality.MAJOR.toString():
                return Quality.MAJOR;
            case Quality.MINOR.shortName:
            case Quality.MINOR.toString():
                return Quality.MINOR;
            case Quality.PERFECT.shortName:
            case Quality.PERFECT.toString():
                return Quality.PERFECT;
            case Quality.DIMINISHED.shortName:
            case Quality.DIMINISHED.toString():
                return Quality.DIMINISHED;
            case Quality.AUGMENTED.shortName:
            case Quality.AUGMENTED.toString():
                return Quality.AUGMENTED;
            case Quality.DOUBLY_AUGMENTED.shortName:
            case Quality.DOUBLY_AUGMENTED.toString():
                return Quality.DOUBLY_AUGMENTED;
            case Quality.DOUBLY_DIMINISHED.shortName:
            case Quality.DOUBLY_DIMINISHED.toString():
                return Quality.DOUBLY_DIMINISHED;
        }

        return null;
    }

    get shortName(): string {
        switch (this) {
            case Quality.MAJOR: return "M";
            case Quality.MINOR: return "m";
            case Quality.PERFECT: return "P";
            case Quality.DIMINISHED: return "d";
            case Quality.AUGMENTED: return "a";
            case Quality.DOUBLY_AUGMENTED: return "da";
            case Quality.DOUBLY_DIMINISHED: return "dd";
            default: throw new Error();
        }
    }

    toString(): string {
        switch (this) {
            case Quality.MAJOR: return Settings.lang.quality.major;
            case Quality.MINOR: return Settings.lang.quality.minor;
            case Quality.PERFECT: return Settings.lang.quality.perfect;
            case Quality.DIMINISHED: return Settings.lang.quality.diminished;
            case Quality.AUGMENTED: return Settings.lang.quality.augmented;
            case Quality.DOUBLY_AUGMENTED: return Settings.lang.quality.doublyAugmented;
            case Quality.DOUBLY_DIMINISHED: return Settings.lang.quality.doublyDiminished;
            default: throw new Error();
        }
    }
}

let _PERFECT = new Quality();
let _MAJOR = new Quality();
let _MINOR = new Quality();
let _AUGMENTED = new Quality();
let _DIMINISHED = new Quality();
let _DOUBLY_AUGMENTED = new Quality();
let _DOUBLY_DIMINISHED = new Quality();