define(
['libs/chai', 'sinon', 'kita/is'],
function(chai, sinon, is) {
	console.log(" - Running Is Test Suite");

	var expect 	= chai.expect,
		spy		= sinon.spy;

	describe("Is()", function() {

		it("should exist", function() {
			expect(is).to.be.a("function");
		});

		it("should confirm that it is a boolean", function() {
			expect(is(true, "boolean")).to.be.true;
		});

		it("should confirm that it is a string (when string is empty)", function() {
			expect(is("", "string")).to.be.true;
		});

		it("should confirm that it is a string (when string is not empty)", function() {
			expect(is("Kita", "string")).to.be.true;
		});

		it("should confirm that it is a number", function() {
			expect(is(12345, "number")).to.be.true;
		});

		it("should confirm that it is an object", function() {
			expect(is({}, "object")).to.be.true;
		});

		it("should confirm that it is an array", function() {
			expect(is([], "array")).to.be.true;
		});

		it("should confirm that it is undefined (when `undefined` is provided)", function() {
			expect(is(undefined, "undefined")).to.be.true;
		});

		it("should confirm that it is undefined (when var test = undefined is provided)", function() {
			var test = undefined;
			expect(is(test, "undefined")).to.be.true;
		});

		it("should confirm that it is null", function() {
			expect(is(null, "null")).to.be.true;
		});

		it("should return false when string is not an array", function() {
			expect(is("", "array")).to.be.false;
		});
	});
});