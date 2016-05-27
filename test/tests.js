var methods = require('..');
var chai = require('chai');
chai.should();

describe('Validation Methods', function(){

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
    methods.email('abc@example.com').should.be.true;
    methods.email('abc.def@example.com').should.be.true;
    methods.email('user+mailbox@example.com').should.be.true;
    methods.email('$A12345@example.com').should.be.true;
    methods.email('!def!xyz%abc@example.com').should.be.true;
    methods.email('_somename@example.com').should.be.true;
    methods.email('abcdefghijklmnopqrstuvwxyz@example.com').should.be.true;
    methods.email('ABCDEFGHIJKLMNOPQRSTUVWXYZ@example.com').should.be.true;
    methods.email('0123456789@example.com').should.be.true;
    methods.email('!#$%&\'*+-/=?^_`{|}~@example.com').should.be.true;
    methods.email('john@me@example.com').should.be.false;
    methods.email('john@').should.be.false;
    methods.email('@example.com').should.be.false;
    methods.email('.john@example.com').should.be.false;
    methods.email('john.@example.com').should.be.false;
    methods.email('john..smith@example.com').should.be.false;
    chai.assert.isUndefined(methods.email(''));
    chai.assert.isUndefined(methods.email(null));
    chai.assert.isUndefined(methods.email(undefined));
  });

  it('should validate url', function(){
    methods.url('http://foo.com').should.be.true;
    methods.url('http://www.foo.com').should.be.true;
    methods.url('foo.com').should.be.true;
    methods.url('foo').should.be.false;
    chai.assert.isUndefined(methods.url(''));
    chai.assert.isUndefined(methods.url(null));
    chai.assert.isUndefined(methods.url(undefined));
  });

  it('should validate alphanumeric', function(){
    methods.alphanumeric('a').should.be.true;
    methods.alphanumeric('1').should.be.true;
    methods.alphanumeric('_1').should.be.false;
    methods.alphanumeric(true).should.be.false;
    chai.assert.isUndefined(methods.alphanumeric(''));
    chai.assert.isUndefined(methods.alphanumeric(null));
    chai.assert.isUndefined(methods.alphanumeric(undefined));
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
    chai.assert.isUndefined(methods.hex(''));
    chai.assert.isUndefined(methods.hex(null));
    chai.assert.isUndefined(methods.hex(undefined));
  });

  it('should validate strings', function(){
    methods.string('1').should.be.true;
    methods.string(1).should.be.false;
    methods.string(true).should.be.false;
    chai.assert.isUndefined(methods.string(''));
    chai.assert.isUndefined(methods.string(null));
    chai.assert.isUndefined(methods.string(undefined));
  });

  it('should validate a number', function(){
    methods.number('string').should.be.false;
    methods.number('1').should.be.true;
    methods.number(1).should.be.true;
    methods.number(true).should.be.false;
    chai.assert.isUndefined(methods.number(''));
    chai.assert.isUndefined(methods.number(null));
    chai.assert.isUndefined(methods.number(undefined));
  });

  it('should validate an array', function(){
    methods.array(['1', 2]).should.be.true;
    methods.array('1').should.be.false;
    methods.array(1).should.be.false;
    methods.array(true).should.be.false;
    chai.assert.isUndefined(methods.array(''));
    chai.assert.isUndefined(methods.array(null));
    chai.assert.isUndefined(methods.array(undefined));
  });

  it('should validate a date', function(){
    methods.date(new Date()).should.be.true;
    methods.date('12th June').should.be.false;
    methods.date(12).should.be.false;
    chai.assert.isUndefined(methods.date(''));
    chai.assert.isUndefined(methods.date(null));
    chai.assert.isUndefined(methods.date(undefined));

  });

  it('should validate a boolean', function(){
    methods.boolean(true).should.be.true;
    methods.boolean(false).should.be.true;
    methods.boolean('1').should.be.false;
    methods.boolean('').should.be.false;
    methods.boolean(12).should.be.false;
    chai.assert.isUndefined(methods.boolean(null));
    chai.assert.isUndefined(methods.boolean(undefined));
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
    chai.assert.isUndefined(fn2(''));
    chai.assert.isUndefined(fn2(null));
    chai.assert.isUndefined(fn2(undefined));
  });

  it('should validate if one value is a at least another value', function(){
    var fn1 = methods.min(5);
    var fn2 = methods.min("5");
    fn1(5).should.be.true;
    fn1(6).should.be.false;
    fn2(5).should.be.true;
    fn2(6).should.be.false;
    chai.assert.isUndefined(fn2(''));
    chai.assert.isUndefined(fn2(null));
    chai.assert.isUndefined(fn2(undefined));
  });

  it('should validate the length of a string or array', function(){
    var fn = methods.length(5);
    fn([1, "two", "3", 4]).should.be.false;
    fn([1, 2, 3, 4, {name: "Terry"}]).should.be.true;
    fn("egg").should.be.false;
    fn("plant").should.be.true;
    chai.assert.isUndefined(fn(''));
    chai.assert.isUndefined(fn(null));
    chai.assert.isUndefined(fn(undefined));
  });

  it('should validate the if a length of a string or array is equal to or greater than a value', function(){
    var fn = methods.minlength(6);
    fn(new Array(6)).should.be.true;
    fn([1]).should.be.false;
    fn("string").should.be.true;
    fn("one").should.be.false;
    chai.assert.isUndefined(fn(''));
    chai.assert.isUndefined(fn(null));
    chai.assert.isUndefined(fn(undefined));
  });

  it('should validate the if a length of a string or array is equal to or less than a value', function(){
    var fn = methods.maxlength(6);
    fn(new Array(6)).should.be.true;
    fn(new Array(7)).should.be.false;
    fn("string").should.be.true;
    fn("eggplant").should.be.false;
    chai.assert.isUndefined(fn(''));
    chai.assert.isUndefined(fn(null));
    chai.assert.isUndefined(fn(undefined));
  });

  it('should validate the if string or number is within range of a value', function(){
    var fn = methods.range(1,6);
    fn(5).should.be.true;
    fn(11).should.be.false;
    fn("6").should.be.true;
    fn("7").should.be.false;
    fn("six").should.be.false;
    chai.assert.isUndefined(fn(''));
    chai.assert.isUndefined(fn(null));
    chai.assert.isUndefined(fn(undefined));
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
    chai.assert.isUndefined(fn2(''));
    chai.assert.isUndefined(fn2(null));
    chai.assert.isUndefined(fn2(undefined));
  });

  it.only('should validate the if ALL of the values within an array are found in another array', function(){
    var arrayContaining = methods.arrayContaining([1,2,3]);
    arrayContaining([1]).should.be.true;
    arrayContaining([2,1]).should.be.true;
    arrayContaining([3,1,2]).should.be.true;
    arrayContaining([3,1,2,4]).should.be.false;
    arrayContaining([3,0,2]).should.be.false;
    arrayContaining([0]).should.be.false;
    arrayContaining(3).should.be.false;
    arrayContaining("[1,2,3]").should.be.false;
  });

  it('should validate the if a value matches another value', function(){
    // model
    var data = {
      NewPassword: 'eggplant' // < the value we're comparing to
    };

    var fn = methods.matches('NewPassword');
    fn('eggplant', data).should.be.true;
    fn('celery', data).should.be.false;
    fn(null, data).should.be.false;
    fn('', data).should.be.false;
    fn(undefined, data).should.be.false;
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

describe('regex method', function(){

  it ('should validate a RegExp pattern', function() {
    var fn = methods.regex(/^JS|CSS|HTML$/);
    fn('JS').should.be.true;
    fn('CSS').should.be.true;
    fn('HTML').should.be.true;
    fn('PHP').should.be.false;
  });

  it('should validate a string pattern', function() {
    var fn = methods.regex('^JS|CSS|HTML$');
    fn('JS').should.be.true;
    fn('CSS').should.be.true;
    fn('HTML').should.be.true;
    fn('PHP').should.be.false;
  });

});

describe('getInvalidCharacters', function(){

  it('should get the invalid characters', function() {
    var chars = methods.getInvalidCharacters(methods.REGEX_DIGITS, 'a0-123@$A');
    chars[0].should.be.equal('a');
    chars[1].should.be.equal('-');
    chars[2].should.be.equal('@');
    chars[3].should.be.equal('$');
    chars[4].should.be.equal('A');
  });

});