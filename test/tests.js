describe('Validation Methods', function(){
  var methods = require('validation-methods');
  var chai = require('chai');
  chai.should();

  it('should validate required', function(){
    methods.required('').should.be.false;
    methods.required(null).should.be.false;
    methods.required(undefined).should.be.false;
    methods.required(0).should.be.true;
    methods.required('foo').should.be.true;
    methods.required(false).should.be.true;
    methods.required(true).should.be.true;
  });

  it('should validate equal', function(){
    methods.equals(1,1).should.be.true;
    methods.equals('', null, undefined).should.be.false;
    methods.equals([1], [1]).should.be.true;
  });

  it('should validate email', function(){
    methods.email('foo@mail.com').should.be.true;
    methods.email('foo@mail').should.be.false;
    methods.email('foo').should.be.false;
    methods.email('foo@mail.co.uk').should.be.true;
    chai.assert( methods.email('') === undefined);
    chai.assert( methods.email(null) === undefined);
    chai.assert( methods.email(undefined) === undefined);
  });

  it('should validate url', function(){
    methods.url('http://foo.com').should.be.true;
    methods.url('http://www.foo.com').should.be.true;
    methods.url('foo.com').should.be.true;
    methods.url('foo').should.be.false;
    chai.assert( methods.url('') === undefined);
    chai.assert( methods.url(null) === undefined);
    chai.assert( methods.url(undefined) === undefined);
  });

  it('should validate alphanumeric', function(){
    methods.alphanumeric('a').should.be.true;
    methods.alphanumeric('1').should.be.true;
    methods.alphanumeric('_1').should.be.false;
    methods.alphanumeric(true).should.be.false;
    chai.assert( methods.alphanumeric('') === undefined);
    chai.assert( methods.alphanumeric(null) === undefined);
    chai.assert( methods.alphanumeric(undefined) === undefined);
  });

  it('should validate hex', function(){
    methods.hex('aaaaaa').should.be.false;
    methods.hex('#aaaaaa').should.be.true;
    methods.hex('aaa').should.be.false;
    methods.hex('#aaa').should.be.true;
    methods.hex('gggggg').should.be.false;
    methods.hex('#gggggg').should.be.false;
    methods.hex('ggg').should.be.false;
    methods.hex('#ggg').should.be.false;
    methods.hex(1).should.be.false;
    methods.hex(111111).should.be.false;
    chai.assert( methods.hex('') === undefined);
    chai.assert( methods.hex(null) === undefined);
    chai.assert( methods.hex(undefined) === undefined);
  });

  it('should validate strings', function(){
    methods.string('1').should.be.true;
    methods.string(1).should.be.false;
    methods.string(true).should.be.false;
    chai.assert( methods.string('') === undefined);
    chai.assert( methods.string(null) === undefined);
    chai.assert( methods.string(undefined) === undefined);
  });

  it('should validate a number', function(){
    methods.number('string').should.be.false;
    methods.number('1').should.be.true;
    methods.number(1).should.be.true;
    methods.number(true).should.be.false;
    chai.assert( methods.number('') === undefined);
    chai.assert( methods.number(null) === undefined);
    chai.assert( methods.number(undefined) === undefined);
  });

  it('should validate an array', function(){
    methods.array(['1', 2]).should.be.true;
    methods.array('1').should.be.false;
    methods.array(1).should.be.false;
    methods.array(true).should.be.false;
    chai.assert( methods.array('') === undefined);
    chai.assert( methods.array(null) === undefined);
    chai.assert( methods.array(undefined) === undefined);
  });

  it('should validate a date', function(){
    methods.date(new Date()).should.be.true;
    methods.date('12th June').should.be.false;
    methods.date(12).should.be.true;
    chai.assert( methods.date('') === undefined);
    chai.assert( methods.date(null) === undefined);
    chai.assert( methods.date(undefined) === undefined);
  });

  it('should validate a boolean', function(){
    methods.boolean(true).should.be.true;
    methods.boolean(false).should.be.true;
    methods.boolean('1').should.be.false;
    methods.boolean('').should.be.false;
    methods.boolean(12).should.be.false;
    chai.assert( methods.boolean(null) === undefined);
    chai.assert( methods.boolean(undefined) === undefined);
  });

  it('should validate if one value is below another value', function(){
    var fn1 = methods.max(5);
    var fn2 = methods.max("5");
    fn1(6).should.be.true;
    fn1(5).should.be.true;
    fn1(4).should.be.false;
    fn2(6).should.be.true;
    fn2(5).should.be.true;
    fn2(4).should.be.false;
    chai.assert(fn2(undefined) === undefined);
    chai.assert(fn2('') === undefined);
    chai.assert(fn2(null) === undefined);
  });

  it('should validate if one value is a at least another value', function(){
    var fn1 = methods.min(5);
    var fn2 = methods.min("5");
    fn1(5).should.be.true;
    fn1(6).should.be.false;
    fn2(5).should.be.true;
    fn2(6).should.be.false;
    chai.assert(fn2(undefined) === undefined);
    chai.assert(fn2('') === undefined);
    chai.assert(fn2(null) === undefined);
  });

  it('should validate the length of a string or array', function(){
    var fn = methods.length(5);
    fn([1, "two", "3", 4]).should.be.false;
    fn([1, 2, 3, 4, {name: "Terry"}]).should.be.true;
    fn("egg").should.be.false;
    fn("plant").should.be.true;
    chai.assert(fn(undefined) === undefined);
    chai.assert(fn('') === undefined);
    chai.assert(fn(null) === undefined);
  });

  it('should validate the if a length of a string or array is equal to or greater than a value', function(){
    var fn = methods.minlength(6);
    fn(new Array(6)).should.be.true;
    fn([1]).should.be.false;
    fn("string").should.be.true;
    fn("one").should.be.false;
    chai.assert(fn(undefined) === undefined);
    chai.assert(fn('') === undefined);
    chai.assert(fn(null) === undefined);
  });

  it('should validate the if a length of a string or array is equal to or less than a value', function(){
    var fn = methods.maxlength(6);
    fn(new Array(6)).should.be.true;
    fn(new Array(7)).should.be.false;
    fn("string").should.be.true;
    fn("eggplant").should.be.false;
    chai.assert(fn(undefined) === undefined);
    chai.assert(fn('') === undefined);
    chai.assert(fn(null) === undefined);
  });

  it('should validate the if string or number is within range of a value', function(){
    var fn = methods.range(1,6);
    fn(5).should.be.true;
    fn(11).should.be.false;
    fn("6").should.be.true;
    fn("7").should.be.false;
    fn("six").should.be.false;
    chai.assert(fn(undefined) === undefined);
    chai.assert(fn('') === undefined);
    chai.assert(fn(null) === undefined);
  });

  it('should validate the if a value is found in an array', function(){
    var fn1 = methods.in([1,2,3]);
    var fn2 = methods.in(["one", "two", 3]);
    fn1(1).should.be.true;
    fn1("one").should.be.false;
    fn1(4).should.be.false;
    fn2(1).should.be.false;
    fn2("one").should.be.true;
    fn2(4).should.be.false;
    chai.assert(fn2(undefined) === undefined);
    chai.assert(fn2('') === undefined);
    chai.assert(fn2(null) === undefined);
  });

  it('should validate the if a value matches another value', function(){
    var fn = methods.matches('foo');
    fn('bar', { foo: 'bar' }).should.be.true;
    fn('bar', { foo: 'foo' }).should.be.false;
    fn(null, { foo: 'bar' }).should.be.false;
    fn('', { foo: 'bar' }).should.be.false;
    fn(undefined, { foo: 'bar' }).should.be.false;
  });

  it('should validate if a value is made up of only numbers or not', function(){
    methods.numbersOnly('123456789').should.be.true;
    methods.numbersOnly('123456789String').should.be.false;
    methods.numbersOnly(1).should.be.true;
    methods.numbersOnly('string').should.be.false;
    methods.numbersOnly('').should.be.false;
    methods.numbersOnly(undefined).should.be.false;
  });
});