"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs_1 = require("fs");
const childrenManager_1 = require("../src/childrenManager");
const linphone_1 = require("../src/linphone");
let sipConfig;
describe("core", () => {
    function onBefore(done) {
        this.timeout(0);
        sipConfig = JSON.parse(fs_1.readFileSync("tests/config.json", "utf8"));
        done();
    }
    function onCreate(done) {
        this.timeout(0);
        const linphone = new linphone_1.default(sipConfig.conf154);
        linphone.once(linphone_1.default.events.REGISTERED, () => {
            linphone.once(linphone_1.default.events.CLOSE, () => {
                done();
            });
            childrenManager_1.default.terminate();
        });
        linphone.on(linphone_1.default.events.ERROR, (err) => {
            throw err;
        });
    }
    before(onBefore);
    it("create 1", onCreate);
    it("create 2", onCreate);
    it("manager", (done) => {
        assert.equal(childrenManager_1.default.size, 0);
        assert.equal(childrenManager_1.default.children.size, 0);
        done();
    });
});
//# sourceMappingURL=001-coreActions.js.map