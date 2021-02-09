import * as fs from "fs";
import { MainInit } from "./main/MainInit";

export function initInitTest(tmp: string) {
    afterEach(afterEachFunction(tmp));

    beforeEach(() => MainInit.singleton.clearData());
}

function afterEachFunction(tmp: string) {
    return () => {
        try {
            fs.unlinkSync(tmp);
        } catch (err) { }
    }
}