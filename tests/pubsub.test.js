/*
 * Kita
 *
 * pubsub.test.js
 *
 * Unit tests for the pubSub library within the Kita JS Framework.
 *
 * Shann McNicholl
 *
 * License pending.
 */
 
define(
['libs/chai', 'sinon', 'kita/pubsub'],
function(chai, sinon, pubSub) {

	var expect 	= chai.expect,
		spy		= sinon.spy,
		timers	= sinon.useFakeTimers;

	describe("Pub/Sub", function() {

		it("should load", function() {
			expect(pubSub).to.be.a("function");
		});

		describe("a new instance should", function() {

			var pubsub = null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub = new pubSub();
			});

			it("be an object", function() {
				expect(pubsub).to.be.an("object");
			});

			it("have no callbacks", function() {
				expect(pubsub._callbacksLength).to.equal(0);
			});
		});

		describe("bind() should", function() {

			var pubsub = null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub = new pubSub();
			});

			it("return false when no arguments are provided", function() {
				expect(pubsub.bind()).to.be.false;
			});

			it("return false when no event is provided", function() {
				expect(pubsub.bind(undefined, function() {})).to.be.false;
			});

			it("return false when no callback is provided", function() {
				var test = pubsub._callbacks;
				
				expect(pubsub.bind("change", undefined)).to.be.false;
			});

			it("return true when an event and callback are provided", function() {
				expect(pubsub.bind("change", function() {})).to.be.true;
			});

			it("have 1 callback when only 1 is added", function() {
				pubsub.bind("change", function() {});
				expect(pubsub._callbacksLength).to.equal(1);
			});

			it("have 2 callbacks when 2 are added", function() {
				pubsub.bind("change", function() {});
				pubsub.bind("click", function() {});
				expect(pubsub._callbacksLength).to.equal(2);
			});

			it("have 5 callbacks when 5 are added", function() {
				pubsub.bind("change", function() {});
				pubsub.bind("click", function() {});
				pubsub.bind("load", function() {});
				pubsub.bind("set", function() {});
				pubsub.bind("get", function() {});
				expect(pubsub._callbacksLength).to.equal(5);
			});

			it("should have 2 \"change\" events if 2 are added (individually)", function() {
				pubsub.bind("change", function() {});
				pubsub.bind("change", function() {
					var a = true,
						b = false;
				});

				expect(pubsub._callbacks["change"].length).to.equal(2);
			});

			it("should have 2 \"change\" events if 2 are added (together)", function() {
				pubsub.bind("change change", function() {
					var a = true,
						b = false;
				});
				
				expect(pubsub._callbacks["change"].length).to.equal(2);
			});

			it("should have 1 \"change\" and 1 \"click\" event if they are added at the same time", function() {
				pubsub.bind("change click", function() {
					var a = true,
						b = false;
				});
				
				expect(pubsub._callbacks["change"].length).to.equal(1);
				expect(pubsub._callbacks["click"].length).to.equal(1);
			});
		});

		describe("on() should", function() {

			var pubsub 		= null,
				callback	= null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub 		= new pubSub();
				callback	= spy();

				// Wrap the bind function
				spy(pubsub, "bind");
			});

			afterEach(function() {
				// Unwrap the bind function
				pubsub.bind.restore();
			});

			it("call the bind function", function() {
				pubsub.on("click", callback);
				expect(pubsub.bind.calledOnce).to.be.true;
			});

			it("call the bind function with 1 argument (click)", function() {
				pubsub.on("click", callback);

				expect(pubsub.bind.calledWith("click")).to.be.true;
			});

			it("call the bind function with 2 arguments (click, me)", function() {
				pubsub.on("click", callback);

				expect(pubsub.bind.calledWith("click", callback)).to.be.true;
			});

			it("call the bind function and setup 1 listener on 2 events", function() {
				pubsub.on("click change", callback);

				expect(pubsub._callbacks["click"].length).to.equal(1);
				expect(pubsub._callbacks["change"].length).to.equal(1);
			});
		});

		describe("unbind() should", function() {

			var pubsub = null,
				callback	= null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub 		= new pubSub();
				callback	= spy();

				// Wrap the unbind function
				spy(pubsub, "unbind");
			});

			afterEach(function() {
				// Unwrap the unbind function
				pubsub.unbind.restore();
			});

			it("be called", function() {
				pubsub.unbind("click", callback);

				expect(pubsub.unbind.calledOnce).to.be.true;
			});

			it("return false if no arguments are provided", function() {
				expect(pubsub.unbind()).to.be.false;
			});

			it("return false if only the event is provided", function() {
				expect(pubsub.unbind("click")).to.be.false;
			});

			it("return false if only the callback is provided", function() {
				expect(pubsub.unbind(undefined, callback)).to.be.false;
			});

			it("return false if event and callback combination are not currently bound", function() {
				expect(pubsub.unbind("click", callback)).to.be.false;
			});

			it("return false if event has bound callbacks but not the callback in the arguments", function() {
				pubsub.on("click", callback);
				
				expect(pubsub.unbind("click", function() {})).to.be.false;
			});

			it("return true if event and callback arguments were previously bound", function() {
				pubsub.on("click", callback);

				expect(pubsub.unbind("click", callback)).to.be.true;
			});
		});

		describe("off() should", function() {

			var pubsub 		= null,
				callback	= null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub 		= new pubSub();
				callback	= spy();

				// Wrap the bind function
				spy(pubsub, "unbind");
			});

			afterEach(function() {
				// Unwrap the bind function
				pubsub.unbind.restore();
			});

			it("call the unbind function", function() {
				pubsub.off();

				expect(pubsub.unbind.calledOnce).to.be.true;
			});

			it("call the unbind function with 1 argument", function() {
				pubsub.off("click");
				expect(pubsub.unbind.calledWith("click")).to.be.true;
			});

			it("call the unbind function with 1 argument and the result to be false", function() {
				expect(pubsub.off("click")).to.be.false;
				expect(pubsub.unbind.calledWith("click")).to.be.true;
			});

			it("call the unbind function with 2 arguments (click, spy)", function() {
				pubsub.off("click", callback);
				expect(pubsub.unbind.calledWith("click", callback)).to.be.true;
			});

			it("call the unbind function with 2 arguments (click, spy) and the result to be false (not bound)", function() {
				expect(pubsub.off("click", callback)).to.be.false;
				expect(pubsub.unbind.calledWith("click", callback)).to.be.true;
			});

			it("call the unbind function with 2 arguments (click, spy) and the result to be true (bound)", function() {
				pubsub.on("click", callback);
				expect(pubsub.off("click", callback)).to.be.true;
				expect(pubsub.unbind.calledWith("click", callback)).to.be.true;
			});
		});

		describe("trigger() should", function() {

			var pubsub 		= null,
				callback	= null,
				clock		= null;

			beforeEach(function() {
				// Create a new pub sub object
				pubsub 		= new pubSub();
				callback 	= spy();
				clock		= timers();

				spy(pubsub, "trigger");
			});

			afterEach(function() {
				pubsub.trigger.restore();
				clock.restore();
			});

			it("be called", function() {
				pubsub.trigger();

				expect(pubsub.trigger.calledOnce).to.be.true;
			});

			it("return false if no arguments are provided", function() {
				expect(pubsub.trigger()).to.be.false;
			});

			it("return false if 1 argument is provided, but the event is not bound", function() {
				expect(pubsub.trigger("click")).to.be.false;
			});

			it("return true when it is called with an event that has a bound callback", function() {
				pubsub.on("click", callback);
				expect(pubsub.trigger("click")).to.be.true;
			});

			it("return true and the callback should be called when an event that has a bound callback", function() {
				pubsub.on("click", callback);
				expect(pubsub.trigger("click")).to.be.true;

				// Move the clock forward so that all of the listening/subscribing callbacks get fired
				clock.tick(10000);

				expect(callback.calledOnce).to.be.true;
			});

			it("return true and 6 callbacks should be called", function() {
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				expect(pubsub.trigger("click")).to.be.true;

				// Move the clock forward so that all of the listening/subscribing callbacks get fired
				clock.tick(10000);

				expect(callback.callCount).to.equal(6);
			});

			it("return true and 30 callbacks should be called", function() {
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);

				// Trigger the event
				expect(pubsub.trigger("click")).to.be.true;

				// Move the clock forward so that all of the listening/subscribing callbacks get fired
				clock.tick(10000);

				expect(callback.callCount).to.equal(30);
			});

			it("call 3 callbacks for the first event and 4 for the second", function() {
				pubsub.on("click", callback);
				pubsub.on("click", callback);
				pubsub.on("click", callback);

				pubsub.on("change", callback);
				pubsub.on("change", callback);
				pubsub.on("change", callback);
				pubsub.on("change", callback);

				expect(pubsub.trigger("click")).to.be.true;

				clock.tick(10000);

				expect(callback.calledThrice).to.be.true;

				expect(pubsub.trigger("change")).to.be.true;

				clock.tick(10000);

				expect(callback.callCount).to.equal(7);
			});

			it("return true and call the bound callback with 3 arguments", function() {
				pubsub.on("click", callback);

				expect(pubsub.trigger("click", 10, 50, 300)).to.be.true;

				clock.tick(10000);

				expect(callback.calledOnce).to.be.true;
				expect(callback.calledWith(10, 50, 300)).to.be.true;
			});
		});
	});
});