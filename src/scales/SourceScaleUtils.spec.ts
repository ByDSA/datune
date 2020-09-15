import { Scale } from './Scale';
import { SourceScaleUtils } from './SourceScaleUtils';
import * as init from "../initializer";
init.scales.default();
init.sourceScales.default();

test('getSourceScaleFrom: ', () => {
    for (let scale of Scale.sets.all()) {
        let sourceScale = SourceScaleUtils.getSourceScaleFrom(scale);
        expect(sourceScale).not.toBe(undefined);
        expect(sourceScale).not.toBe(null);
    }
});