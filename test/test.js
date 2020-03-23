'use strict';

const { expect } = require('chai');
const { setProperty } = require('../utils');

describe('k-utils', function() {
	describe('setProperty', () => {
		it('set array as value (default mask)', () => {
			const o = {};
			const p = [ () => 'val', val => {} ];
			setProperty(o, 'a', p);
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.an('array').that.includes(p[0]).and.includes(p[1]);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is not enumerable
			expect(o.propertyIsEnumerable('a')).to.be.false;
			expect(Object.keys(o)).to.be.empty;
			//console.dir(Object.keys(o));
			//o.a = [];
			// property 'a' is not writable
			expect(() => { o.a = []; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { value: 'x' }); })
			.to.throw(TypeError, "Cannot redefine property: a");
		});
		it('set array as getter/setter (mask is string)', () => {
			const o = {};
			const p = [ () => 'val', val => {} ];
			setProperty(o, 'a', p, 'a');
			expect(o).to.have.own.property('a');
			expect(o.a).to.equal('val');
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.not.have.property('value');
			// property have getter/setter
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('get');
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('set');
			// property 'a' is not enumerable
			expect(o.propertyIsEnumerable('a')).to.be.false;
			// property 'a' is writable
			expect(() => { o.a = ''; }).to.not.throw();
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { value: 'x' }); })
			.to.throw(TypeError, "Cannot redefine property: a");
		});
		it('set array as getter/setter (mask is number)', () => {
			const o = {};
			const p = [ () => 'val', val => {} ];
			setProperty(o, 'a', p, 0b1000);
			expect(o).to.have.own.property('a');
			expect(o.a).to.equal('val');
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.not.have.property('value');
			// property have getter/setter
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('get');
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('set');
			// property 'a' is not enumerable
			expect(o.propertyIsEnumerable('a')).to.be.false;
			// property 'a' is writable
			expect(() => { o.a = ''; }).to.not.throw();
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { value: 'x' }); })
			.to.throw(TypeError, "Cannot redefine property: a");
		});
		it('set enumerable property (mask is string)', () => {
			const o = {};
			setProperty(o, 'a', 5, 'e');
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is not writable
			expect(() => { o.a = 3; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { value: 'x' }); })
			.to.throw(TypeError, "Cannot redefine property: a");
		});
		it('set enumerable property (mask is number)', done => {
			const o = {};
			setProperty(o, 'a', 5, 0b0010);
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is not writable
			expect(() => { o.a = 3; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { value: 'x' }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			done();
		});
		it('set enumerable and writable property (mask is string)', done => {
			const o = {};
			setProperty(o, 'a', 5, 'ew');
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is writable
			expect(() => { o.a = 3; }).to.not.throw();
			expect(o.a).to.be.equal(3);
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { enumerable: false }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { writable: false }); })
			.to.not.throw();
			// now property 'a' is not writable
			expect(() => { o.a = 5; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			expect(o.a).to.be.equal(3);
			done();
		});
		it('set enumerable and writable property (mask is number)', done => {
			const o = {};
			setProperty(o, 'a', 5, 0b0011);
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is writable
			expect(() => { o.a = 3; }).to.not.throw();
			expect(o.a).to.be.equal(3);
			// property 'a' is not configurable
			expect(() => { Object.defineProperty(o, 'a', { enumerable: false }); })
			.to.throw(TypeError, "Cannot redefine property: a");
			expect(() => { Object.defineProperty(o, 'a', { writable: false }); })
			.to.not.throw();
			// now property 'a' is not writable
			expect(() => { o.a = 5; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			expect(o.a).to.be.equal(3);
			done();
		});
		it('set configurable property (mask is string)', done => {
			const o = {};
			const p = [ () => 'val', val => {} ];
			setProperty(o, 'a', 5, 'c');
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is not enumerable
			expect(o.propertyIsEnumerable('a')).to.be.false;
			expect(Object.keys(o)).to.be.empty;
			// property 'a' is not writable
			expect(() => { o.a = []; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			// property 'a' is configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true, enumerable: true }); })
			.to.not.throw();
			// property 'a' is now enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is now writable
			expect(() => { o.a = 3; }).to.not.throw();
			expect(o.a).to.be.equal(3);
			done();
		});
		it('set configurable property (mask is number)', done => {
			const o = {};
			const p = [ () => 'val', val => {} ];
			setProperty(o, 'a', 5, 0b0100);
			expect(o).to.have.own.property('a');
			expect(o.a).to.be.equal(5);
			// property descriptor have property 'value'
			expect(o).to.haveOwnPropertyDescriptor('a').that.have.property('value');
			// property 'a' is not enumerable
			expect(o.propertyIsEnumerable('a')).to.be.false;
			expect(Object.keys(o)).to.be.empty;
			// property 'a' is not writable
			expect(() => { o.a = []; })
			.to.throw(TypeError, "Cannot assign to read only property 'a' of object '#<Object>'");
			// property 'a' is configurable
			expect(() => { Object.defineProperty(o, 'a', { writable: true, enumerable: true }); })
			.to.not.throw();
			// property 'a' is now enumerable
			expect(o.propertyIsEnumerable('a')).to.be.true;
			expect(Object.keys(o)).to.include('a');
			// property 'a' is now writable
			expect(() => { o.a = 3; }).to.not.throw();
			expect(o.a).to.be.equal(3);
			done();
		});
	});
});

