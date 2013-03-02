/*
 * Kita
 *
 * controller.test.js
 *
 * Controller Tests for the Kita JS library
 *
 * Shann McNicholl (@shannmcnicholl)
 */

define(
['libs/chai', 'sinon', "../src/controller", "../src/icc"],
function(chai, sinon, Controller, ICC) {

    console.log(" - Running Controller Test Suite");

    var expect  = chai.expect,
        spy     = sinon.spy;

    describe("Controller", function() {

        beforeEach(function() {
            ICC.reset();
            this.controller =   new Controller();
        });

        afterEach(function() {
            delete(this.controller);
        });

        it("should exist", function() {
            expect(this.controller).to.be.an("object");
        });

        it("should have a reference to the ICC", function() {
            expect(this.controller.icc).to.be.an("object");
        });

        it("should have an initialize function", function() {
            expect(this.controller.initialize).to.be.a("function");
        });

        it("should have a getNamespace function", function() {
            expect(this.controller.getNamespace).to.be.a("function");
        });

        it("should have a defined namespace", function() {
            expect(this.controller.getNamespace()).to.be.a("string");
        });

        it("should have a registerListeners function", function() {
            expect(this.controller.registerListeners).to.be.a("function");
        });

        it("should have an unRegisterListeners function", function() {
            expect(this.controller.unRegisterListeners).to.be.a("function");
        });

        describe("registerListeners()", function() {
            
            beforeEach(function() {
                this.listenerSpy        =   spy();
                this.remoteListenerSpy1 =   spy();
                this.remoteListenerSpy2 =   spy();
                this.ControllerDef      =   Controller.extend({
                                                kitaControllerType: "test",
                                                iccNamespace:       "controller",
                                                listeners: {
                                                    "run":    this.listenerSpy,
                                                    "@remote:controller:1": this.remoteListenerSpy1,
                                                    "@remote:controller:2": this.remoteListenerSpy2
                                                }
                                            });
                spy(this.ControllerDef.prototype, "registerListeners");

                this.controller         =   new this.ControllerDef();
            });

            afterEach(function() {
                this.controller.registerListeners.restore();
                delete(this.controller);
                delete(this.listenerSpy)
                delete(this.ControllerDef);
            });

            it("should return false if there are no listeners", function() {
                var c   = new Controller();

                expect(c.registerListeners()).to.be.false;
            });

            it("should be called when the Controller is instantiated", function() {
                expect(this.controller.registerListeners.calledOnce).to.be.true;
            });

            it("should register the listeners", function() {
                expect(this.controller.icc._callbacksLength).to.equal(3);
            });

            it("should not prepend the local namespace to remote listeners", function() {
                ICC.trigger("remote:controller:1");
                ICC.trigger("remote:controller:2");

                expect(this.remoteListenerSpy1.calledOnce).to.be.true;
                expect(this.remoteListenerSpy2.calledOnce).to.be.true;
            });

            it("should register the listeners correctly (they should be callable)", function() {
                ICC.trigger("test:controller:run");

                expect(this.listenerSpy.calledOnce).to.be.true;
            });
        });

        describe("unRegisterListeners()", function() {
            beforeEach(function() {
                this.listenerSpy    =   spy();
                this.remoteListenerSpy1 =   spy();
                this.remoteListenerSpy2 =   spy();
                this.ControllerDef      =   Controller.extend({
                                                kitaControllerType: "test",
                                                iccNamespace:       "controller",
                                                listeners: {
                                                    "run":    this.listenerSpy,
                                                    "@remote:controller:1": this.remoteListenerSpy1,
                                                    "@remote:controller:2": this.remoteListenerSpy2
                                                }
                                        });
                spy(this.ControllerDef.prototype, "registerListeners");

                this.controller     =   new this.ControllerDef();
            });

            afterEach(function() {
                this.controller.registerListeners.restore();
                delete(this.controller);
                delete(this.listenerSpy)
                delete(this.ControllerDef);
            });

            it("should return false if there are no listeners", function() {
                var c = new Controller();

                expect(c.unRegisterListeners()).to.be.false;
            });

            it("should un-register the listeners from the ICC", function() {
                this.controller.unRegisterListeners();

                expect(ICC._callbacksLength).to.equal(0);
                expect((Object.keys(ICC._callbacks)).length).to.equal(0);
            });

            it("should return true when it works", function() {
                expect(this.controller.unRegisterListeners()).to.be.true;
            });

        });

        describe("getNamespace()", function() {

            it("should return the correct namespace", function() {
                expect(this.controller.getNamespace()).to.equal("vanilla:controller");

                this.controller.kitaControllerType = "test";

                expect(this.controller.getNamespace()).to.equal("test:controller");

                this.controller.iccNamespace = "this-thing";

                expect(this.controller.getNamespace()).to.equal("test:this-thing");
            });
        });
    });
});