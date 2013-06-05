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

  });

});