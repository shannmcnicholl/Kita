/*
 * Kita
 *
 * Model Tests for the Kita JS library
 *
 * Shann McNicholl
 */

define(
['libs/chai', 'sinon', 'kita/model'],
function(chai, sinon, kitaModel) {
	console.log(" - Running Model Test Suite");

	var expect 	= chai.expect,
		spy		= sinon.spy,
		timers	= sinon.useFakeTimers;
		console	= window.console;

	describe("Model", function() {

		it("should load", function() {
			expect(kitaModel).to.be.a("function");
		});

		describe("A new instance should", function() {

			var model	=	null;

			beforeEach(function() {
				model	=	new kitaModel();
			})

			it("be an object", function() {
				expect(model).to.be.an("object");
			});

			it("be an instance of kitaModel", function() {
				expect(model instanceof kitaModel).to.be.true;
			});

			it("have no listeners attached", function() {
				expect(model.getListenerLength()).to.equal(0);
			});

			it("have an ID", function() {
				expect(model.id).to.be.a("string");
			});
		});

		describe("Initialisation data should", function() {

			beforeEach(function() {
				this.model	=	new kitaModel({
					test1:	"This is test 1",
					test2:	10001
				});
			})

			afterEach(function() {
				delete(this.model);
			});

			it("should have initialisation data", function() {
				expect(this.model.get("test1")).to.equal("This is test 1");
				expect(this.model.get("test2")).to.equal(10001);
			});
		});

		describe("set() should", function() {

			var model		=	null;
				callback	=	null;
				clock		= 	null;

			beforeEach(function() {
				model		=	new kitaModel();				
				callback	=	spy();
				clock		= 	timers();

				spy(model, "set");
			});

			afterEach(function() {
				model.set.restore();
				clock.restore();
			});

			it("set the value of 'setTest' to true", function() {
				model.set("setTest", true);

				expect(model.attributes.setTest).to.be.true;
			});

			it("trigger a change:setTest event", function() {
				
				model.bind("change:setTest", callback);
				model.set("setTest", true);
				
				clock.tick(10000);

				expect(callback.calledOnce).to.be.true;
			});

			it("trigger a change event", function() {
				model.bind("change", callback);
				model.set("setTest", true);
				
				clock.tick(10000);

				expect(callback.calledOnce).to.be.true;
			});

			it("trigger a change:setTest event and pass through the changed value", function() {
				model.bind("change:setTest", callback);
				model.set("setTest", "This is a test");
				
				clock.tick(10000);

				expect(callback.args[0][0]).to.equal("This is a test");
			});

			it("trigger a change:setTest event and pass through 2 values, the second of which should be \"undefined\"", function() {
				model.bind("change:setTest", callback);
				model.set("setTest", "This is a test");
				
				clock.tick(10000);

				expect(callback.args[0][1]).to.be.undefined;
			});

			it("trigger a change:setTest event and pass through 2 values, the second of which should be \"This is a test\"", function() {
				model.set("setTest", "This is a test");

				model.bind("change:setTest", callback);
				model.set("setTest", "This is another test");
				
				clock.tick(10000);

				expect(callback.args[0][0]).to.equal("This is another test");
				expect(callback.args[0][1]).to.equal("This is a test");
			});

			it("not trigger a change:setTest event if set is called with silent = true", function() {
				model.bind("change:setTest", callback);
				model.set("setTest", "This is another test", true);
				
				clock.tick(10000);

				expect(callback.callCount).to.equal(0);
			});
		});

		describe("setAttributes() should", function() {
			var model		=	null;
				callback	=	null;
				clock		= 	null;

			beforeEach(function() {
				model		=	new kitaModel();				
				callback	=	spy();

				spy(model, "setAttributes");
			});

			afterEach(function() {
				model.setAttributes.restore();
			});

			it("be called", function() {
				model.setAttributes();
				expect(model.setAttributes.called).to.be.true;
			});

			it("return false if no attributes are given", function() {
				expect(model.setAttributes()).to.be.false;
			});

			it("return true if attributes are given", function() {
				expect(model.setAttributes({test: "123"})).to.be.true;
			});

			it("set the attributes", function() {
				model.setAttributes({ test: "this", more: "testing" });

				expect(model.get("test")).to.equal("this");
				expect(model.get("more")).to.equal("testing");
			});

		});

		describe("get() should", function() {

			var model		=	null;
				callback	=	null;
				clock		= 	null;

			beforeEach(function() {
				model		=	new kitaModel();				
				callback	=	spy();
				clock		= 	timers();

				spy(model, "get");
			});

			afterEach(function() {
				model.get.restore();
				clock.restore();
			});

			it("be called", function() {
				model.get("setTest");
				expect(model.get.callCount).to.equal(1);
			});

			it("return \"undefined\" if the attribute doesn't exist", function() {
				expect(model.get("setTest")).to.be.undefined;
			});

			it("return \"This is a test\"", function() {
				model.set("setTest", "This is a test");

				expect(model.get("setTest")).to.equal("This is a test");
			});

			it("return 101", function() {
				model.set("this_test", 101);

				expect(model.get("this_test")).to.equal(101);
			});
		});

		describe("destroy() should", function() {

			beforeEach(function() {
				this.model		=	new kitaModel();
				spy(this.model, "destroy");
			});

			afterEach(function() {
				this.model.destroy.restore();
			});

			it("be called", function() {
				this.model.destroy();
				expect(this.model.destroy.called).to.be.true;
			});

			it("remove all registered callbacks", function() {

				this.model.on("changed", function() {});
				expect(this.model._callbacksLength).to.equal(1);

				this.model.destroy();
				expect(this.model._callbacksLength).to.equal(0);
				expect(this.model._callbacks).to.deep.equal({});
			});
		});
	});
});