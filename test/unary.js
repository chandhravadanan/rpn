
const assert = require('assert');
const BigNumber = require('bignumber.js')
const RPNEvaluator = require('../lib/rpnevaluator')

describe('Unary Operations', function() {

    let evaluator = new RPNEvaluator()

    beforeEach(()=>{
        evaluator.clearStack()
    })

    describe('++', function() {
        it('should increment number by 1', function() {
            assert.throws(()=>evaluator.evaluate('++'), Error)
            assert.equal(evaluator.evaluate('1 ++').getTop(), 2)
            assert.equal(evaluator.evaluate('-1 ++').getTop(), 0)
            assert.equal(evaluator.evaluate('14.5 ++').getTop(), 15.5)
        });
    });

    describe('--', function() {
        it('should decrement number by 1', function() {
            assert.throws(()=>evaluator.evaluate('--'), Error)
            assert.equal(evaluator.evaluate('1 --').getTop(), 0)
            assert.equal(evaluator.evaluate('-1 --').getTop(), -2)
            assert.equal(evaluator.evaluate('14.5 --').getTop(), 13.5)
        });
    });

    describe('!', function() {
        it('should do bitwise NOT operation', function() {
            assert.throws(()=>evaluator.evaluate('!'), Error)
            assert.throws(()=>evaluator.evaluate('14.5 !'), Error)
            assert.throws(()=>evaluator.evaluate('-5 !'), Error)
            assert.equal(evaluator.evaluate('10 !').getTop(), 5)
            assert.equal(evaluator.evaluate('6 !').getTop(), 1)
        });
    });

    describe('fact', function() {
        it('should perform factorial of the number', function() {
            let res = new BigNumber('30414093201713378043612608166064768844377641568960512000000000000');
            assert.throws(()=>evaluator.evaluate('fact'), Error)
            assert.equal(evaluator.evaluate('-1 fact').getTop(), 1)
            assert.equal(evaluator.evaluate('5 fact').getTop(), 120)
            assert.ok(evaluator.evaluate('50 fact').getTop().eq(res))
        });
    });
  
    describe('ceil', function() {
        it('should do round up', function() {
            assert.throws(()=>evaluator.evaluate('ceil'), Error)
            assert.equal(evaluator.evaluate('10 ceil').getTop(), 10)
            assert.equal(evaluator.evaluate('6.1 ceil').getTop(), 7)
            assert.equal(evaluator.evaluate('-1.1 ceil').getTop(), -1)
        });
    });

    describe('floor', function() {
        it('should do round down', function() {
            assert.throws(()=>evaluator.evaluate('floor'), Error)
            assert.equal(evaluator.evaluate('10 floor').getTop(), 10)
            assert.equal(evaluator.evaluate('6.1 floor').getTop(), 6)
            assert.equal(evaluator.evaluate('-1.1 floor').getTop(), -2)
        });
    });

    describe('round', function() {
        it('should do round up floating positions', function() {
            assert.throws(()=>evaluator.evaluate('round'), Error)
            assert.equal(evaluator.evaluate('10 round').getTop(), 10)
            assert.equal(evaluator.evaluate('6.1 round').getTop(), 6)
            assert.equal(evaluator.evaluate('6.54 round').getTop(), 7)
            assert.equal(evaluator.evaluate('-1.1 round').getTop(), -1)
            assert.equal(evaluator.evaluate('-1.5 round').getTop(), -2)
        });
    });

    describe('ip', function() {
        it('should get integer part of the number', function() {
            assert.throws(()=>evaluator.evaluate('ip'), Error)
            assert.equal(evaluator.evaluate('10 ip').getTop(), 10)
            assert.equal(evaluator.evaluate('6.1 ip').getTop(), 6)
            assert.equal(evaluator.evaluate('-1.1 ip').getTop(), -1)
        });
    });

    describe('fp', function() {
        it('should get floating part of the number', function() {
            assert.throws(()=>evaluator.evaluate('fp'), Error)
            assert.equal(evaluator.evaluate('10 fp').getTop(), 0)
            assert.equal(evaluator.evaluate('6.5 fp').getTop(), 5)
            assert.equal(evaluator.evaluate('-1.1 fp').getTop(), 1)
        });
    });
    
    describe('abs', function() {
        it('should get absolute value of the number', function() {
            assert.throws(()=>evaluator.evaluate('abs'), Error)
            assert.equal(evaluator.evaluate('10 abs').getTop(), 10)
            assert.equal(evaluator.evaluate('-6 abs').getTop(), 6)
            assert.equal(evaluator.evaluate('-1.1 abs').getTop(), 1.1)
        });
    });

    describe('exp', function() {
        it('should get e to the power of the number', function() {
            assert.throws(()=>evaluator.evaluate('exp'), Error)
            let expeted = BigNumber('7.389056098930648947679242312025000000000000')
            assert.ok(evaluator.evaluate('2 exp').getTop().eq(expeted))
        });
    });

    describe('log', function() {
        it('should get logarithm of the number (base 10)', function() {
            assert.throws(()=>evaluator.evaluate('log'), Error)
            assert.equal(evaluator.evaluate('100 log').getTop(), 2)
        });
    });

    describe('ln', function() {
        it('should get natural logarithm of the number (base 2)', function() {
            assert.throws(()=>evaluator.evaluate('ln'), Error)
            assert.equal(evaluator.evaluate('8 ln').getTop(), 2.0794415416798357)
            assert.equal(evaluator.evaluate('16 ln').getTop(), 2.772588722239781)
        });
    });

    describe('sqrt', function() {
        it('should get square root of the number', function() {
            assert.throws(()=>evaluator.evaluate('sqrt'), Error)
            assert.equal(evaluator.evaluate('4 sqrt').getTop(), 2)
            assert.equal(evaluator.evaluate('16 sqrt').getTop(), 4)
        });
    });

});