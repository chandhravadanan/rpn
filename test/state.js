

const assert = require('assert');
const RPNEvaluator = require('../lib/rpnevaluator')

describe('State Operations', function() {

    let evaluator = new RPNEvaluator()

    beforeEach(()=>{
        evaluator.clearStackAndVars()
    })

    describe('create variable', function() {
        it('should create variable', function() {
            evaluator.evaluate('10 20 30')
            assert.throws(()=>evaluator.evaluate('dup='), Error)
            assert.equal(evaluator.evaluate('x=').getVariableValue('x'), 30)
            assert.equal(evaluator.getTop(), 20)
        });
    });

    describe('create a macro', function() {
        it('should create macro', function() {
            assert.throws(()=>evaluator.evaluate('macro dup 10 10'), Error)
            assert.throws(()=>evaluator.evaluate('macro mymacro8 10 20 *'), Error)
            assert.throws(()=>evaluator.evaluate('macro secmacro anothermacro 10 *'), Error)
            assert.throws(()=>evaluator.evaluate('macro secmacro anothervar 10 *'), Error)
            evaluator.evaluate('macro tensquare 10 10 *')
            assert.equal(evaluator.evaluate('tensquare').getTop(), 100)
            assert.equal(evaluator.isDeclaredMacro('tensquare'), true)
        });
    });

    describe('clr', function() {
        it('should clear the stack', function() {
            assert.deepEqual(evaluator.evaluate('10 20 30 clr').getStack(), [])
        });
    });

    describe('cla', function() {
        it('should clear the stack and variables', function() {
            evaluator.evaluate('10 20 30 x=')
            assert.equal(evaluator.getStack().length, 2)
            assert.equal(evaluator.getVariableValue('x'), 30)
            evaluator.evaluate('cla')
            assert.equal(evaluator.getStack().length, 0)
            assert.equal(evaluator.getVariableValue('x'), undefined)
        });
    });

    describe('clv', function() {
        it('should clear the variables', function() {
            evaluator.evaluate('10 20 30 x=')
            assert.equal(evaluator.getVariableValue('x'), 30)
            assert.equal(evaluator.evaluate('x x +').getTop(), 60)
            evaluator.evaluate('clv')
            assert.equal(evaluator.getVariableValue('x'), undefined)
           
        });
    });

    describe('bin|hex|oct|dec', function() {
        it('should change the mode', function() {
            assert.equal(evaluator.evaluate('bin').mode, 2)
            assert.equal(evaluator.evaluate('hex').mode, 16)
            assert.equal(evaluator.evaluate('oct').mode, 8)
            assert.equal(evaluator.evaluate('dec').mode, 10)
        });
    });

    describe('stack', function() {
        it('should change the separator', function() {
            assert.equal(evaluator.evaluate('stack').separtor, '\n')
            assert.equal(evaluator.evaluate('stack').separtor, ' ')
            assert.equal(evaluator.evaluate('stack').separtor, '\n')
        });
    });

    describe('symbols', function() {
        it('should insert symbol value to stack', function() {
            assert.equal(evaluator.evaluate('e').getTop(), Math.E)
            assert.equal(evaluator.evaluate('pi').getTop(), Math.PI)
        });
    });

});