var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("google analytics plugin", function () {
    it("should register correctly to events", function (done) {
        var res = false;

        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            jsbundle: {
                one: [
                    'stuff'
                ],
                two: [
                    'more stuff'
                ]
            }            
        };

        thoughtpad.subscribe("javascript-precompile-complete", function *() {
            res = true;
        });

        co(function *() {
            yield thoughtpad.notify("javascript-precompile-request", {});
            res.should.be.true;
            done();
        })();
    });

    it("should yield with the analytics script", function (done) {
        var count = 0;

        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            jsbundle: {
                one: [
                    'stuff'
                ],
                two: [
                    'more stuff'
                ]
            }            
        };

        thoughtpad.subscribe("javascript-precompile-complete", function *(contents) {
            count++;
            contents.ext.should.equal('js');
        });

        co(function *() {
            yield thoughtpad.notify("javascript-precompile-request", {});
            count.should.equal(1);
            done();
        })();
    });

    it("should put the analytics script into the config", function (done) {
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            jsbundle: {
                one: [
                    'stuff'
                ],
                two: [
                    'more stuff'
                ]
            }            
        };

        thoughtpad.subscribe("javascript-precompile-complete", function *(contents) {
            contents.ext.should.equal('js');
            if (contents.name === "google-analytics") {
                contents.contents.should.not.equal("");
            }
        });

        co(function *() {
            yield thoughtpad.notify("javascript-precompile-request", {});
            thoughtpad.config.jsbundle.one.should.eql(['stuff', 'google-analytics']);
            done();            
        })();
    });

    it("should have the userid in the script", function (done) {
        var res = {};

        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            analytics: {
                userId: 'myuser'
            },
            jsbundle: {
                one: [
                    'stuff'
                ],
                two: [
                    'more stuff'
                ]
            }            
        };

        thoughtpad.subscribe("javascript-precompile-complete", function *(contents) {
            res = contents;
        });

        co(function *() {
            yield thoughtpad.notify("javascript-precompile-request", {});
            res.contents.indexOf('myuser').should.not.equal(-1);
            done();            
        })();
    });

});