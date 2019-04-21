"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs_1 = require("fs");
const childrenManager_1 = require("../src/childrenManager");
const linphone_1 = require("../src/linphone");
let sipConfig;
let endpoint1;
describe("register", () => {
    function onBefore(done) {
        this.timeout(0);
        sipConfig = JSON.parse(fs_1.readFileSync("tests/config.json", "utf8"));
        endpoint1 = new linphone_1.default(sipConfig.conf159);
        endpoint1.once(linphone_1.default.events.REGISTERED, () => {
            done();
        });
    }
    function testRegister(done) {
        this.timeout(0);
        assert.equal(endpoint1.getSipNumber(), sipConfig.conf159.sip);
        assert.equal(endpoint1.getInterface(), sipConfig.conf159.technology + "/" + sipConfig.conf159.sip);
        endpoint1.on(linphone_1.default.events.UNREGISTERED, () => {
            endpoint1.on(linphone_1.default.events.REGISTERED, () => {
                done();
            });
            endpoint1.register();
        });
        endpoint1.unregister();
    }
    function onAfter(done) {
        this.timeout(0);
        childrenManager_1.default.terminate(done);
    }
    before(onBefore);
    it("call ", testRegister);
    after(onAfter);
});
//# sourceMappingURL=003-registerActions.js.map