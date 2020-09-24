
const assert = require('assert');
const RPNEvaluator = require('../lib/rpnevaluator')

describe('Binary Operations', function() {

  let evaluator = new RPNEvaluator()

  beforeEach(()=>{
      evaluator.clearStack()
  })

  describe('+', function() {
      it('should do addition of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('+'), Error)
          assert.throws(()=>evaluator.evaluate('0 +'), Error)
          assert.equal(evaluator.evaluate('1 2 +').getTop(), 4)
          assert.equal(evaluator.evaluate('-1 -1 +').getTop(), -2)
          assert.equal(evaluator.evaluate('14.5 16.4 +').getTop(), 30.9)
      });
  });

  describe('-', function() {
      it('should do subtraction of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('-'), Error)
          assert.throws(()=>evaluator.evaluate('0 -'), Error)
          assert.equal(evaluator.evaluate('1 2 -').getTop(), -1)
          assert.equal(evaluator.evaluate('-1 -1 -').getTop(), 0)
          assert.equal(evaluator.evaluate('20.5 .3 -').getTop(), 20.2)
      });
  });

  describe('*', function() {
      it('should do multiplications of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('*'), Error)
          assert.throws(()=>evaluator.evaluate('0 *'), Error)
          assert.equal(evaluator.evaluate('1 2 *').getTop(), 2)
          assert.equal(evaluator.evaluate('-1 -1 *').getTop(), 1)
          assert.equal(evaluator.evaluate('1.5 .3 *').getTop(), 0.45)
      });
  });


  describe('/', function() {
      it('should do division of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('/'), Error)
          assert.throws(()=>evaluator.evaluate('0 /'), Error)
          assert.equal(evaluator.evaluate('1 2 /').getTop(), 0.5)
          assert.equal(evaluator.evaluate('-1 -1 /').getTop(), 1)
          assert.equal(evaluator.evaluate('4.5 1.5 /').getTop(), 3)
      });
  });


  describe('%', function() {
      it('should do modulo division of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('%'), Error)
          assert.throws(()=>evaluator.evaluate('0 %'), Error)
          assert.equal(evaluator.evaluate('1 2 %').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -1 %').getTop(), 0)
          assert.equal(evaluator.evaluate('4.5 1 %').getTop(), 0.5)
      });
  });

  describe('&&', function() {
      it('should do boolean and of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('&&'), Error)
          assert.throws(()=>evaluator.evaluate('0 &&'), Error)
          assert.equal(evaluator.evaluate('1 2 &&').getTop(), 2)
          assert.equal(evaluator.evaluate('-1 -5 &&').getTop(), -5)
          assert.equal(evaluator.evaluate('0 5 &&').getTop(), 0)
      });
  });

  describe('||', function() {
      it('should do boolean OR of two numbers', function() {
          assert.throws(()=>evaluator.evaluate('||'), Error)
          assert.throws(()=>evaluator.evaluate('0 ||'), Error)
          assert.equal(evaluator.evaluate('1 2 ||').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -5 ||').getTop(), -1)
          assert.equal(evaluator.evaluate('0 5 ||').getTop(), 5)
      });
  });


  describe('<', function() {
      it('should do lt and result 1 or 0', function() {
          assert.throws(()=>evaluator.evaluate('<'), Error)
          assert.throws(()=>evaluator.evaluate('0 <'), Error)
          assert.equal(evaluator.evaluate('1 2 <').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -5 <').getTop(), 0)
          assert.equal(evaluator.evaluate('0.4 0.5 <').getTop(), 1)
      });
  });

  describe('>', function() {
      it('should do gt and result 1 or 0', function() {
          assert.throws(()=>evaluator.evaluate('>'), Error)
          assert.throws(()=>evaluator.evaluate('0 >'), Error)
          assert.equal(evaluator.evaluate('1 2 >').getTop(), 0)
          assert.equal(evaluator.evaluate('-1 -5 >').getTop(), 1)
          assert.equal(evaluator.evaluate('0.4 0.5 >').getTop(), 0)
      });
  });


  describe('>=', function() {
      it('should do gte and result 1 or 0', function() {
          assert.throws(()=>evaluator.evaluate('>='), Error)
          assert.throws(()=>evaluator.evaluate('0 >='), Error)
          assert.equal(evaluator.evaluate('1 2 >=').getTop(), 0)
          assert.equal(evaluator.evaluate('2 2 >=').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -5 >=').getTop(), 1)
          assert.equal(evaluator.evaluate('0.5 0.5 >=').getTop(), 1)
      });
  });

  describe('<=', function() {
      it('should do lte and result 1 or 0', function() {
          assert.throws(()=>evaluator.evaluate('<='), Error)
          assert.throws(()=>evaluator.evaluate('0 <='), Error)
          assert.equal(evaluator.evaluate('1 2 <=').getTop(), 1)
          assert.equal(evaluator.evaluate('2 2 <=').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -5 <=').getTop(), 0)
          assert.equal(evaluator.evaluate('0.5 0.5 <=').getTop(), 1)
      });
  });

  describe('==', function() {
      it('should do eq and result 1 or 0', function() {
          assert.throws(()=>evaluator.evaluate('=='), Error)
          assert.throws(()=>evaluator.evaluate('0 =='), Error)
          assert.equal(evaluator.evaluate('1 2 ==').getTop(), 0)
          assert.equal(evaluator.evaluate('2 2 ==').getTop(), 1)
          assert.equal(evaluator.evaluate('-1 -5 ==').getTop(), 0)
          assert.equal(evaluator.evaluate('0.5 0.5 ==').getTop(), 1)
      });
  });

  describe('pow', function() {
      it('should do pow(x,y)', function() {
          assert.throws(()=>evaluator.evaluate('pow'), Error)
          assert.throws(()=>evaluator.evaluate('0 pow'), Error)
          assert.equal(evaluator.evaluate('1 2 pow').getTop(), 1)
          assert.equal(evaluator.evaluate('2 2 pow').getTop(), 4)
          assert.equal(evaluator.evaluate('-1 -5 pow').getTop(), -1)
          assert.equal(evaluator.evaluate('0.5 2 pow').getTop(), 0.25)
      });
  });

  describe('&', function() {
      it('should do bitwise and operation', function() {
          assert.throws(()=>evaluator.evaluate('&'), Error)
          assert.throws(()=>evaluator.evaluate('0 &'), Error)
          assert.throws(()=>evaluator.evaluate('0.5 1 &'), Error)
          assert.throws(()=>evaluator.evaluate('-1 -2 &'), Error)
          assert.equal(evaluator.evaluate('1 2 &').getTop(), 0)
          assert.equal(evaluator.evaluate('2 2 &').getTop(), 2)
      });
  });

  describe('|', function() {
      it('should do bitwise OR operation', function() {
          assert.throws(()=>evaluator.evaluate('|'), Error)
          assert.throws(()=>evaluator.evaluate('0 |'), Error)
          assert.throws(()=>evaluator.evaluate('0.5 1 |'), Error)
          assert.throws(()=>evaluator.evaluate('-1 -2 |'), Error)
          assert.equal(evaluator.evaluate('1 2 |').getTop(), 3)
          assert.equal(evaluator.evaluate('2 2 |').getTop(), 2)
      });
  });


  describe('^', function() {
      it('should do bitwise XOR operation', function() {
          assert.throws(()=>evaluator.evaluate('^'), Error)
          assert.throws(()=>evaluator.evaluate('0 ^'), Error)
          assert.throws(()=>evaluator.evaluate('0.5 1 ^'), Error)
          assert.throws(()=>evaluator.evaluate('-1 -2 ^'), Error)
          assert.equal(evaluator.evaluate('1 2 ^').getTop(), 3)
          assert.equal(evaluator.evaluate('2 2 ^').getTop(), 0)
      });
  });

  describe('<<', function() {
      it('should do left bitwise shift', function() {
          assert.throws(()=>evaluator.evaluate('<<'), Error)
          assert.throws(()=>evaluator.evaluate('0 <<'), Error)
          assert.throws(()=>evaluator.evaluate('0.5 1 <<'), Error)
          assert.throws(()=>evaluator.evaluate('-1 -2 <<'), Error)
          assert.equal(evaluator.evaluate('1 2 <<').getTop(), 4)
          assert.equal(evaluator.evaluate('2 2 <<').getTop(), 8)
      });
  });

  describe('>>', function() {
      it('should do right bitwise shift', function() {
          assert.throws(()=>evaluator.evaluate('>>'), Error)
          assert.throws(()=>evaluator.evaluate('0 >>'), Error)
          assert.throws(()=>evaluator.evaluate('0.5 1 >>'), Error)
          assert.throws(()=>evaluator.evaluate('-1 -2 >>'), Error)
          assert.equal(evaluator.evaluate('1 2 >>').getTop(), 0)
          assert.equal(evaluator.evaluate('16 2 >>').getTop(), 4)
      });
  });

});