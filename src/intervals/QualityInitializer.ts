import { Quality } from './Quality';

export default () => {
    if (Quality.MAJOR)
        return;

    Quality.PERFECT = new Quality();
    Quality.MAJOR = new Quality();
    Quality.MINOR = new Quality();
    Quality.AUGMENTED = new Quality();
    Quality.DIMINISHED = new Quality();
    Quality.DOUBLY_AUGMENTED = new Quality();
    Quality.DOUBLY_DIMINISHED = new Quality();
}