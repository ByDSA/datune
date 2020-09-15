import { BPM } from './BPM';
import { MusicalDuration } from './MusicalDuration';
import { musicalDurations } from '../initializer';

export default () => {
    if (BPM.QUARTER_120)
        return;

    musicalDurations.default();

    BPM.QUARTER_120 = BPM.from(120, MusicalDuration.QUARTER);
}