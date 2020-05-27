
const assert = require('assert');
const RPNEvaluator = require('../lib/rpnevaluator')

describe('Stack Operations', function() {

    let evaluator = new RPNEvaluator()

    beforeEach(()=>{
        evaluator.clearStack()
    })

    describe('pick', function() {
        it('should pick n the element in the stack and move on top', function() {
            assert.equal(evaluator.evaluate('1 2 3 0 pick').getTop(), 1)
            evaluator.clearStack()
            assert.equal(evaluator.evaluate('1 2 3 1 pick').getTop(), 2)
            assert.equal(evaluator.evaluate('1 2 3 100 pick').getTop(), 3)
        });
    });

    describe('repeat', function() {
        it('should repeat the opn n times', function() {
            assert.throws(()=>evaluator.evaluate('repeat'), Error)
            assert.deepEqual(evaluator.evaluate('4 repeat none').getStack(), [])
            assert.equal(evaluator.evaluate('1 1 1 1 3 repeat +').getTop(), 4)
        });
    });

    describe('depth', function() {
        it('should insert depth of the stack', function() {
            assert.equal(evaluator.evaluate('depth').getTop(), 0)
            assert.equal(evaluator.evaluate('depth').getTop(), 1)
            assert.equal(evaluator.evaluate('depth').getTop(), 2)
        });
    });
  
    describe('drop', function() {
        it('should drop the number top of the stack', function() {
            assert.deepEqual(evaluator.evaluate('drop').getStack(), [])
            assert.equal(evaluator.evaluate('1 2 drop').getTop(), 1)
            assert.deepEqual(evaluator.evaluate('drop').getStack(), [])
        });
    });

    describe('dropn', function() {
        it('should drop top n from the stack', function() {
            assert.deepEqual(evaluator.evaluate('dropn').getStack(), [])
            assert.equal(evaluator.evaluate('1 2 3 2 dropn').getTop(), 1)
            assert.deepEqual(evaluator.evaluate('dropn').getStack(), [])
        });
    });

    describe('dup', function() {
        it('should duplicates the top number in the stack', function() {
            assert.ok(evaluator.evaluate('10 dup').getStack().length, 2)
            assert.ok(evaluator.evaluate('dup').getStack().length, 3)
            assert.ok(evaluator.evaluate('dup').getStack().length, 4)
        });
    });

    describe('dupn', function() {
        it('should duplicates the top n number in the stack', function() {
            assert.ok(evaluator.evaluate('10 20 2 dupn').getStack().length, 4)
            assert.ok(evaluator.evaluate('3 dupn').getStack().length, 7)
            assert.ok(evaluator.evaluate('3 dupn').getStack().length, 10)
        });
    });

    describe('roll', function() {
        it('should slide the numbers in the stack', function() {
            assert.equal(evaluator.evaluate('10 20 30 1 roll').getTop(), 20)
            assert.equal(evaluator.evaluate('1 roll').getTop(), 10)
            assert.equal(evaluator.evaluate('1 roll').getTop(), 30)
            assert.equal(evaluator.evaluate('3 roll').getTop(), 30)
        });
    });

    describe('rolld', function() {
        it('should slide the numbers left side in the stack', function() {
            assert.equal(evaluator.evaluate('10 20 30 1 rolld').getTop(), 10)
            assert.equal(evaluator.evaluate('1 rolld').getTop(), 20)
            assert.equal(evaluator.evaluate('1 rolld').getTop(), 30)
            assert.equal(evaluator.evaluate('3 rolld').getTop(), 30)
        });
    });

    describe('swap', function() {
        it('should swap the top 2 numbers in the stack', function() {
            assert.equal(evaluator.evaluate('10 20 30 swap').getTop(), 20)
            assert.equal(evaluator.evaluate('swap').getTop(), 30)
            assert.equal(evaluator.getStack().length, 3)
        });
    });
    
});