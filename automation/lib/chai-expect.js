const { expect, assert } = require('chai');

var Expect = function () {
	//Check if equal
	this.toEqual = async function (target, val) {
		return expect(target).to.equal(val);
	};
	
	//Check if not equal
	this.toNotEqual = async function (target, val) {
		return expect(target).to.not.equal(val);
	};
	
	//Check value if Empty
	this.toBeEmpty = async function (target) {
		return expect(target).to.be.empty;
	}
	
	//Check value if not empty
	this.toNotBeEmpty = async function (target) {
		return expect(target).to.not.be.empty;
	}

	//Check if val is true
	this.toBeTrue = async function (target) {
		return expect(target).to.be.true;
	}

	//Check if val is false
	this.toBeFalse = async function (target) {
		return expect(target).to.be.false;
	}

	//Check if contains value
	this.toInclude = async function (target, val) {
		return expect(target).to.include(val);
	}

	//Check length
	this.lengthOf = async function (target, size) {
		return expect(target).to.have.lengthOf(size);
	}

	//Check string if contains substring
	this.toHaveString = async function (target, str) {
		return expect(target).to.have.string(str);
	}

	//Check string if does not contains substring
	this.toNotHaveString = async function (target, str) {
		return expect(target).to.not.have.string(str);
	}

};

module.exports = Expect;