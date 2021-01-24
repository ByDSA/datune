import { ScaleAlt } from '../scalealt/ScaleAlt';
import { SourceScale } from './SourceScaleUtils';

it('getSourceScaleFrom: ', () => {
    for (let scale of ScaleAlt.sets.common()) {
        let sourceScale = SourceScale.getFromScaleAlt(scale);
        expect(sourceScale).not.toBe(undefined);
        expect(sourceScale).not.toBe(null);
    }
});