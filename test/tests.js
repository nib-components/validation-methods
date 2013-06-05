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
    methods.equals(null, undefined).should.be.false;
    methods.equals([1], [1]).should.be.true;
  });

  it('should validate email', function(){
    methods.email('foo@mail.com').should.be.true;
    methods.email('foo@mail').should.be.false;
    methods.email('foo').should.be.false;
    methods.email('foo@mail.co.uk').should.be.true;
    chai.assert( methods.email('') === undefined );
    chai.assert( methods.email(null) === undefined );
    chai.assert( methods.email(undefined) === undefined );
  });

  it('should validate url', function(){
    methods.url('http://foo.com').should.be.true;
    methods.url('http://www.foo.com').should.be.true;
    methods.url('foo.com').should.be.true;
    methods.url('foo').should.be.false;
    chai.assert( methods.url('') === undefined );
    chai.assert( methods.url(null) === undefined );
    chai.assert( methods.url(undefined) === undefined );
  });

  it('should validate alphanumeric', function(){
    methods.alphanumeric('a').should.be.true;
    methods.alphanumeric('1').should.be.true;
    methods.alphanumeric(true).should.be.false;
    chai.assert( methods.alphanumeric('') === undefined );
    chai.assert( methods.alphanumeric(null) === undefined );
    chai.assert( methods.alphanumeric(undefined) === undefined );
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
    chai.assert( methods.hex('') === undefined );
    chai.assert( methods.hex(null) === undefined );
    chai.assert( methods.hex(undefined) === undefined );
  });

  it('should validate strings', function(){
    methods.string('1').should.be.true;
    methods.string(1).should.be.false;
    methods.string(true).should.be.false;
    chai.assert( methods.string('') === undefined );
    chai.assert( methods.string(null) === undefined );
    chai.assert( methods.string(undefined) === undefined );
  });

  it('should validate a number', function(){
    methods.number('string').should.be.false;
    methods.number('1').should.be.true;
    methods.number(1).should.be.true;
    methods.number(true).should.be.false;
    chai.assert( methods.number('') === undefined );
    chai.assert( methods.number(null) === undefined );
    chai.assert( methods.number(undefined) === undefined );
  });

  it('should validate an array', function(){
    methods.array(['1', 2]).should.be.true;
    methods.array('1').should.be.false;
    methods.array(1).should.be.false;
    methods.array(true).should.be.false;
    chai.assert( methods.array('') === undefined );
    chai.assert( methods.array(null) === undefined );
    chai.assert( methods.array(undefined) === undefined );
  });

  it('should validate a date', function(){
    methods.date(new Date()).should.be.true;
    methods.date('12th June').should.be.false;
    methods.date(12).should.be.true;
    methods.boolean('', null, undefined).should.be.false;
  });

  it('should validate a boolean', function(){
    methods.boolean(true).should.be.true;
    methods.boolean(false).should.be.true;
    methods.boolean('1').should.be.false;
    methods.boolean(12).should.be.false;
    methods.boolean('', null, undefined).should.be.false;
  });

  it('should validate if one value is below another value', function(){
    methods.max(1,2).should.be.true;
    methods.max(2,1).should.be.false;
    methods.max('1','2').should.be.true;
    methods.max('2','1').should.be.false;
    methods.max(1,'2').should.be.true;
    methods.max(2,'1').should.be.false;
    methods.max(1, null).should.be.false;
    methods.max('1', null).should.be.false;
    chai.assert( methods.max(null) === undefined );
    chai.assert( methods.max(undefined) === undefined );
  });

  it('should validate if one value is a at least another value', function(){
    methods.min(1,1).should.be.true;
    methods.min(2,1).should.be.true;
    methods.min(1,2).should.be.false;
    methods.min('1','1').should.be.true;
    methods.min('2','1').should.be.true;
    methods.min('1','2').should.be.false;
    methods.min(1,'1').should.be.true;
    methods.min(2,'1').should.be.true;
    methods.min(1,'2').should.be.false;
    methods.min(1,'1').should.be.true;
    methods.min(2,'1').should.be.true;
    methods.min(1,'2').should.be.false;
    methods.min(1,null).should.be.true;
    methods.min('1',null).should.be.true;
    chai.assert( methods.min(null) === undefined );
    chai.assert( methods.min(undefined) === undefined );
  });

  it('should validate the length of a string or array', function(){
    methods.length([1, '2'], 1).should.be.false;
    methods.length([1,2,3], 3).should.be.true;
    methods.length([1], 1).should.be.true;
    methods.length('three', 3).should.be.false;
    methods.length('four', 4).should.be.true;
  });

  it('should validate the if a length of a string or array is equal to or greater than a value', function(){
    methods.minlength([1], 0).should.be.true;
    methods.minlength([1], 1).should.be.true;
    methods.minlength([1], 2).should.be.false;
    methods.minlength("one", 3).should.be.true;
    methods.minlength("one", 4).should.be.false;
  });

  it('should validate the if a length of a string or array is equal to or less than a value', function(){
    methods.maxlength([1], 1).should.be.true;
    methods.maxlength([1], 2).should.be.true;
    methods.maxlength([1, 2], 1).should.be.false;
    methods.maxlength("1", 3).should.be.true;
    methods.maxlength("one", 3).should.be.true;
    methods.maxlength("three", 3).should.be.false;
    methods.maxlength("4", 3).should.be.true;
  });

  it('should validate the if string or number is within range of a value', function(){
    methods.range(5, {"from": 1, "to": 10}).should.be.true;
    methods.range(5, {"from": 1, "to": 4}).should.be.false;
    methods.range(5, {"from": 6, "to": 10}).should.be.false;
    methods.range('5', {"from": 1, "to": 10}).should.be.true;
    methods.range('5', {"from": 1, "to": 4}).should.be.false;
    methods.range('5', {"from": 6, "to": 10}).should.be.false;
    methods.range("five", {"from": 1, "to": 10}).should.be.false;
  });

  it('should validate the if a value is found in an array', function(){
    methods.in(1, [1,2,3]).should.be.true;
    methods.in("one", [1,2,3]).should.be.false;
    methods.in(1, ['one', 'two', 'three']).should.be.false;
    methods.in("one", ['one', 'two', 'three']).should.be.true;
  });

  it('should validate the if a value matches another value', function(){
    var test = methods.matches('foo');
    test('bar', { foo: 'bar' }).should.be.true;
    test('bar', { foo: 'foo' }).should.be.false;
  });
});
