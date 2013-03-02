/*
 * Kita
 *
 * dataController.test.js
 *
 * Data Controller Tests for the Kita JS library
 *
 * Shann McNicholl (@shannmcnicholl)
 */
 
define(
['libs/chai', 'sinon', "../src/dataController"],
function(chai, sinon, DataController) {

    console.log(" - Running Data Controller Test Suite");

    var expect  = chai.expect,
        spy     = sinon.spy;

    describe("Data Controller", function() {

        it("should exist", function() {
            expect(DataController).to.be.a("function");
        });

        describe("an instance of", function() {
            beforeEach(function() {
                this.controller =   new DataController();
            });

            afterEach(function() {
                delete(this.controller);
            });

            it("should be an object", function() {
                expect(this.controller).to.be.an("object");
            });

            it("should have a reference to the ICC", function() {
                expect(this.controller.icc).to.be.an("object");
            });
        })
    });
});