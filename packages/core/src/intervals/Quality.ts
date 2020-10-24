import { Settings } from '../settings/Settings';

export class Quality {
    static PERFECT: Quality;
    static MAJOR: Quality;
    static MINOR: Quality;
    static AUGMENTED: Quality;
    static DIMINISHED: Quality;
    static DOUBLY_AUGMENTED: Quality;
    static DOUBLY_DIMINISHED: Quality;

    static fromString(str: string): Quality {
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
            case Quality.MAJOR: return "M"; break;
            case Quality.MINOR: return "m"; break;
            case Quality.PERFECT: return "P"; break;
            case Quality.DIMINISHED: return "d"; break;
            case Quality.AUGMENTED: return "a"; break;
            case Quality.DOUBLY_AUGMENTED: return "da"; break;
            case Quality.DOUBLY_DIMINISHED: return "dd"; break;
            default: throw new Error();
        }
    }

    toString(): string {
        switch (this) {
            case Quality.MAJOR: return Settings.lang.quality.major; break;
            case Quality.MINOR: return Settings.lang.quality.minor; break;
            case Quality.PERFECT: return Settings.lang.quality.perfect; break;
            case Quality.DIMINISHED: return Settings.lang.quality.diminished; break;
            case Quality.AUGMENTED: return Settings.lang.quality.augmented; break;
            case Quality.DOUBLY_AUGMENTED: return Settings.lang.quality.doublyAugmented; break;
            case Quality.DOUBLY_DIMINISHED: return Settings.lang.quality.doublyDiminished; break;
            default: throw new Error();
        }
    }
}