/*
 * Kita
 *
 * debug.test.js
 *
 * Unit tests for the debug.js limrary within the Kita JS library
 *
 * Shann McNicholl (@shannmcnicholl)
 *
 * License Pending.
 */

define(
['libs/chai', 'sinon', 'kita/debug'],
function(chai, sinon, debug) {
	console.log("\n - Running Debug Test Suite");

	var expect 	= chai.expect,
		spy		= sinon.spy,
		timers	= sinon.useFakeTimers;
		console	= window.console;

	describe("Debug", function() {
		describe("log should", function() {

			var callback		=	null;

			beforeEach(function() {
				debug.debug		=	true;
				callback		=	spy();

				spy(console, "log");
			});

			afterEach(function() {
				console.log.restore();
			});

			it("return false if no message is supplied", function() {
				expect(debug.log()).to.be.false;
			});

			it("return false if debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.log()).to.be.false;
			});

			it("return false if a message is supplied but debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.log("Debug testing")).to.be.false;
			});

			it("return true if a message is provided and debugging is turned on", function() {
				expect(debug.log("Debug testing")).to.be.true;
			})

			it("call console.log", function() {
				debug.log("hello");
				expect(console.log.calledOnce).to.be.true;
			});

			it("be called with 1 argument but call console.log with 3 arguments", function() {
				debug.log("hello");
				expect(console.log.args[0].length).to.equal(3);
			});

			it("be called with 1 argument but call console.log with 3 arguments - the third being an empty array", function() {
				debug.log("hello");
				expect(console.log.args[0][2].length).to.equal(0);
			});

			it("be called with 2 arguments but call console.log with 3 arguments - the third being an array of length 1", function() {
				debug.log("hello", "You");
				expect(console.log.args[0][2].length).to.equal(1);
			});

			it("be called with 10 arguments but call console.log with 3 arguments - the third being an array of length 9", function() {
				debug.log("hello", {}, {}, {}, {}, {}, {}, {}, {}, {});
				expect(console.log.args[0][2].length).to.equal(9);
			});
		});

		describe("warn should", function() {

			var callback		=	null;

			beforeEach(function() {
				debug.debug		=	true;
				callback		=	spy();

				spy(console, "warn");
			});

			afterEach(function() {
				console.warn.restore();
			});

			it("return false if no message is supplied", function() {
				expect(debug.warn()).to.be.false;
			});

			it("return false if debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.warn()).to.be.false;
			});

			it("return false if a message is supplied but debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.warn("Debug testing")).to.be.false;
			});

			it("return true if a message is provided and debugging is turned on", function() {
				expect(debug.warn("Debug testing")).to.be.true;
			})

			it("call console.warn", function() {
				debug.warn("hello");
				expect(console.warn.calledOnce).to.be.true;
			});

			it("be called with 1 argument but call console.warn with 2 arguments", function() {
				debug.warn("hello");
				expect(console.warn.args[0].length).to.equal(2);
			});

			it("be called with 5 arguments but call console.warn with 2 arguments", function() {
				debug.warn("hello", {}, {}, {}, {});
				expect(console.warn.args[0].length).to.equal(2);
			});
		});

		describe("error should", function() {

			var callback		=	null;

			beforeEach(function() {
				debug.debug		=	true;
				callback		=	spy();

				spy(console, "error");
			});

			afterEach(function() {
				console.error.restore();
			});

			it("return false if no message is supplied", function() {
				expect(debug.error()).to.be.false;
			});

			it("return false if debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.error()).to.be.false;
			});

			it("return false if a message is supplied but debugging is turned off", function() {
				debug.debug		=	false;
				expect(debug.error("Debug testing")).to.be.false;
			});

			it("return true if a message is provided and debugging is turned on", function() {
				expect(debug.error("Debug testing")).to.be.true;
			})

			it("call console.error", function() {
				debug.error("hello");
				expect(console.error.calledOnce).to.be.true;
			});

			it("be called with 1 argument but call console.error with 2 arguments", function() {
				debug.error("hello");
				expect(console.error.args[0].length).to.equal(2);
			});

			it("be called with 5 arguments but call console.error with 2 arguments", function() {
				debug.error("hello", {}, {}, {}, {});
				expect(console.error.args[0].length).to.equal(2);
			});
		});


		describe("trace should", function() {

			var callback		=	null;

			beforeEach(function() {
				debug.debug		=	true;
				callback		=	spy();

				spy(console, "trace");
				spy(debug, "trace");
			});

			afterEach(function() {
				console.trace.restore();
				debug.trace.restore();
			});

			it("be called", function() {
				debug.trace();
				expect(debug.trace.calledOnce).to.be.true;
			});

			it("call console.trace", function() {
				debug.trace();
				expect(console.trace.calledOnce).to.be.true;
			});

			it("call console.trace with no arguments", function() {
				debug.trace();
				expect(console.trace.args[0].length).to.equal(0);
			});

			it("return false when debugging is off", function() {
				debug.debug = false;
				expect(debug.trace()).to.be.false;

			});

			it("not call console.trace when debugging is off", function() {
				debug.debug = false;
				debug.trace();
				expect(console.trace.callCount).to.equal(0);
			});
		});

		describe("getArguments should", function() {

			var callback		=	null,
				skipFirst		=	undefined,
				nullTest		=	false
				testFunction	=	function() {
					return debug.getArguments(nullTest ? null : arguments, skipFirst);
				};

			beforeEach(function() {
				skipFirst		=	undefined;
				callback		=	spy();

				spy(debug, "getArguments");
			});

			afterEach(function() {
				debug.getArguments.restore();
			});

			it("be called", function() {
				debug.getArguments();
				expect(debug.getArguments.called).to.be.true;
			});

			it("return an empty array if no arguments are provided", function() {
				var res = testFunction();
				expect(res.length).to.equal(0);
			});

			it("return an empty array if 1 argument is provided and skipFirst is undefined", function() {
				var res = testFunction({});

				expect(res.length).to.equal(0);
			});

			it("return an empty array if 1 argument is provided and skipFirst is true", function() {
				skipFirst 	= true;
				var res 	= testFunction({});

				expect(res.length).to.equal(0);
			});

			it("return an array of length(1) if 1 argument is provided and skipFirst is false", function() {
				skipFirst 	= false;
				var res 	= testFunction({});

				expect(res.length).to.equal(1);
			});

			it("return an array of length(5) if 6 arguments are provided and skipFirst is undefined", function() {				
				var res = testFunction({}, {}, {}, {}, {}, {});
				
				expect(res.length).to.equal(5);
			});

			it("return an array of length(5) if 6 arguments are provided and skipFirst is true", function() {				
				var res = testFunction({}, {}, {}, {}, {}, {});
				
				expect(res.length).to.equal(5);
			});

			it("return an array of length(6) if 6 arguments are provided and skipFirst is false", function() {
				skipFirst	= false;
				var res 	= testFunction({}, {}, {}, {}, {}, {});
				
				expect(res.length).to.equal(6);
			});

			it("return an empty array if null is passed in as the first argument", function() {
				nullTest 	= true;
				var res		= testFunction();

				expect(res.length).to.equal(0);
			});
		});
	});
});