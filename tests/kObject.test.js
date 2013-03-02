/*
 * Kita
 *
 * kObject.test.js
 *
 * kObject Tests for the Kita JS library
 *
 * Shann McNicholl
 */

define(
['libs/chai', 'sinon', 'kita/kObject'],
function(chai, sinon, kObject) {
	console.log("\n - Running kObject Test Suite");

	var expect 	= chai.expect,
		spy		= sinon.spy,
		timers	= sinon.useFakeTimers;

	describe("kObject", function() {

		it("should load", function() {
			expect(kObject).to.be.a("function");
		});

		it("should have an extend function", function() {
			expect(kObject.extend).to.be.a("function");
		});

		describe("A new instance should", function() {

			kobject = null;

			beforeEach(function() {
				kobject = new kObject();
			});

			it("be an object", function() {
				expect(kobject).to.be.an("object");
			});

			it("be an instance of kObject", function() {
				expect(kobject instanceof kObject).to.be.true;
			});

			it("have an id", function() {
				expect(kobject.id).to.not.be.undefined;
			});
		});

		describe("Extending it should", function() {

			newClassDef 		= null;
			newClass			= null;

			beforeEach(function() {
				newClassDef 	= kObject.extend({
					
					initializeRan:	false,

					initialize: function() {
						this.initializeRan	=	true;
					}
				});

				newClass		= new newClassDef();
			});
			
			it("return a function constructor", function() {
				expect(newClassDef).to.be.a("function");
			});

			it("have an extend function", function() {
				expect(newClassDef.extend).to.be.a("function");
			});

			it("contain an initialize prototype function", function() {
				expect(newClassDef.prototype.initialize).to.be.a("function");
			});
		});

		describe("A new instance of an extended class should", function() {

			newClassDef 		= null;
			newClass			= null;

			beforeEach(function() {
				newClassDef 	= kObject.extend({
					
					initializeRan:	false,

					initialize: function() {
						this.initializeRan	=	true;
					}
				});

				newClass		= new newClassDef();
			});
			
			it("be an object", function() {
				expect(newClass).to.be.an("object");
			});

			it("be an instance of 'newClassDef'", function() {
				expect(newClass instanceof newClassDef).to.be.true;
			});

			it("have an ID", function() {
				expect(newClass.id).to.not.be.undefined;
			});

			it("have an initialize function", function() {
				expect(newClass.initialize).to.be.a("function");
			});

			it("have called initialize() when the object was created", function() {
				expect(newClass.initializeRan).to.be.true;
			});
		});

		describe("Extending an extended class of kObject", function() {

			baseClass	 		= 	kObject.extend({					
										initializeRan:	false,

										initialize: function() {
											this.initializeRan	=	true;
										}
									});
			extendedClass		=	baseClass.extend({
										initializeofExtendedClassRan:	false,

										initialize: function() {
											this.initializeofExtendedClassRan	=	true;
										}
									});

			it("return a function constructor", function() {
				expect(extendedClass).to.be.a("function");
			});

			it("have an extend function", function() {
				expect(extendedClass.extend).to.be.a("function");
			});

			it("contain an initialize prototype function", function() {
				expect(extendedClass.prototype.initialize).to.be.a("function");
			});
		});

		describe("A new instance of the extended class, of the extended class should", function()  {

			baseClass	 		= 	kObject.extend({
					
										initializeRan:	false,

										initialize: function() {
											this.initializeRan	=	true;
										}
									});
			extendedClass		=	baseClass.extend({
										initializeofExtendedClassRan:	false,

										initialize: function() {
											this.initializeofExtendedClassRan	=	true;
										}
									});
			newClass			=	null;

			beforeEach(function() {
				newClass		= new extendedClass();
			});

			it("be an object", function() {
				expect(newClass).to.be.an("object");
			});

			it("be an instance of 'extendedClass'", function() {
				expect(newClass instanceof extendedClass).to.be.true;
			});

			it("have an ID", function() {
				expect(newClass.id).to.not.be.undefined;
			});

			it("have an initialize function", function() {
				expect(newClass.initialize).to.be.a("function");
			});

			it("have called initialize() when the object was created", function() {
				expect(newClass.initializeofExtendedClassRan).to.be.true;
			});
		});
	}); // describe kObject
});// define