/*
 * Kita
 *
 * cookies.test.js
 *
 * Cookie Tests for the Kita JS library
 *
 * Shann McNicholl (@shannmcnicholl)
 */

define(
['libs/chai', 'sinon', '../../utilities/cookies.js'],
function(chai, sinon, Cookies) {
    console.log(" - Running Cookies Test Suite");

    var expect  = chai.expect;

    describe("Cookies should", function() {

        beforeEach(function() {
        });

        afterEach(function() {
            Cookies.deleteAll();
        });

        it("exist", function() {
            expect(Cookies).to.be.an("object");
        });

        it("return an empty object when no cookies are defined", function() {
            expect(Cookies.getAll()).to.deep.equal({});
        });

        it("set the cookie", function() {
            Cookies.set("test", "12345", 23);

            expect(Cookies.get("test")).to.equal("12345");
        });

        it("set many cookies", function() {
            Cookies.set("test1", "abc", 10);
            Cookies.set("test2", "def", 10);
            Cookies.set("test3", "ghi", 10);

            expect(Cookies.getAll()).to.deep.equal({
                "test1":    "abc",
                "test2":    "def",
                "test3":    "ghi"
            });
        });

        it("delete a cookie", function() {
            Cookies.set("test123", "123");

            expect(Cookies.delete("test123")).to.be.true;
            expect(Cookies.getAll()).to.deep.equal({});
        });

        it("delete all cookies", function() {
            Cookies.set("test1", "abc", 10);
            Cookies.set("test2", "def", 10);
            Cookies.set("test3", "ghi", 10);

            expect(Cookies.deleteAll()).to.be.true;
            expect(Cookies.getAll()).to.deep.equal({});
        });
    });

});