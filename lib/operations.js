
const utils = require('./utils')
const BigNumber = require('bignumber.js');

const ONE = BigNumber('1'), ZERO = BigNumber('0')

const binaryOperations = {
    
    '+' : (bignumber1, bignumber2)=> bignumber1.plus(bignumber2),
    '-' : (bignumber1, bignumber2)=> bignumber1.minus(bignumber2),
    '*' : (bignumber1, bignumber2)=> bignumber1.multipliedBy(bignumber2),
    '/' : (bignumber1, bignumber2)=> bignumber1.dividedBy(bignumber2),
    '%' : (bignumber1, bignumber2)=> bignumber1.mod(bignumber2),

    '&&' : (bignumber1, bignumber2)=> bignumber1.eq(ZERO) ? bignumber1 : bignumber2,
    '||' : (bignumber1, bignumber2)=> bignumber1.eq(ZERO) ? bignumber2 : bignumber1,
    '<'  : (bignumber1, bignumber2)=> bignumber1.lt(bignumber2) ? ONE : ZERO,
    '<=' : (bignumber1, bignumber2)=> bignumber1.lte(bignumber2) ? ONE : ZERO,
    '==' : (bignumber1, bignumber2)=> bignumber1.eq(bignumber2) ? ONE : ZERO,
    '>'  : (bignumber1, bignumber2)=> bignumber1.gt(bignumber2) ? ONE : ZERO,
    '>=' : (bignumber1, bignumber2)=> bignumber1.gte(bignumber2) ? ONE : ZERO,
    
    'pow' : (bignumber1, bignumber2)=> bignumber1.pow(bignumber2),
    
    '&'  : utils.bitwiseAnd,
    '|'  : utils.bitwiseOR,
    '^'  : utils.bitwiseXOR,
    '<<' : utils.bitShiftLeft,
    '>>' : utils.bitShiftRight,
}

const unaryOperations = {

    '++' : (bignumber1)=> bignumber1.plus(ONE),
    '--' : (bignumber1)=> bignumber1.minus(ONE),
    '!'  : utils.bitwiseNot,
    'fact' : utils.getFactorial,

    'acos' : (bignumber1) => Math.acos(bignumber1),   
    'asin' :  (bignumber1) =>  Math.asin(bignumber1),
    'atan' : (bignumber1) => Math.atan(bignumber1),
    'cos' : (bignumber1) => Math.cos(bignumber1),
    'cosh' : (bignumber1) => Math.cosh(bignumber1),
    'sin'  : (bignumber1) => Math.sin(bignumber1),
    'sinh' : (bignumber1) => Math.sinh(bignumber1),  
    'tan' : (bignumber1) => Math.tan(bignumber1),
    'tanh' : (bignumber1) => Math.tanh(bignumber1),


    'ceil' : (bignumber1) => bignumber1.integerValue(BigNumber.ROUND_CEIL),
    'floor' : (bignumber1) => bignumber1.integerValue(BigNumber.ROUND_FLOOR),
    'round' : (bignumber1) => bignumber1.integerValue(),
    'ip' : (bignumber1) => bignumber1.integerValue(BigNumber.ROUND_DOWN),
    'fp' : (bignumber1) => {
        let digits = bignumber1.toString();
        let pointPos = digits.indexOf('.')
        if(pointPos<0) return ZERO
        return BigNumber(digits.slice(pointPos+1))
    },


    'abs' : (bignumber1) => bignumber1.abs(),
    'exp' : (bignumber1) => BigNumber(Math.E).pow(bignumber1),
    'log' : (bignumber1) => Math.log(bignumber1)/Math.log(10),
    'ln'  : (bignumber1) => Math.log(bignumber1),
    'sqrt': (bignumber1) => bignumber1.sqrt(),


}

const stackOperations = {
    'pick' : (stack)=>{
        let n = stack.pop()
        if(n && n <stack.length){
            let item = stack[n]
            stack.splice(n, 1)
            stack.push(item)
        }
    },
    'repeat' : (stack, opn)=>{
        if(stack.length<=0)
            throw new Error('invalid repeat counter')
        
        if(opn=='repeat')
            throw new Error('repeat loop found')

        let repeatCount = stack.pop()
        for(let index=0; index<repeatCount; index++){
            doOpn(stack, opn)
        }
    },     
    'depth' : (stack)=>{
        stack.push(stack.length)
    },
    'drop' : (stack)=>{
        stack.pop()
    },      
    'dropn' : (stack)=>{
        let n = stack.pop()
        if(n>stack.length){
            stack.length = 0
        }
        for(let index=0; index<n ; index++){
            stack.pop()
        }
    },
    'dup' : (stack)=>{
        let top = stack[stack.length-1]
        stack.push(top)
    },
    'dupn' : (stack)=>{
        let n = stack.pop()
        if(n>=stack.length)
            return

        let start = stack.length-n
        let end = stack.length
        for(let index=start; index<end; index++){
            stack.push(stack[index])
        }
    },
    'roll' : (stack)=>{
        let window = stack.pop()
        window = window % stack.length
        let firstPart = stack.splice(0, stack.length-window)
        let secPart = stack.slice(stack.length-window)
        return secPart.concat(firstPart)
    },
    'rolld' : (stack)=>{
        let window = stack.pop()
        window = window % stack.length
        let firstPart = stack.slice(0, window)
        let secPart = stack.slice(window)
        return secPart.concat(firstPart)
    },        
    'swap' : (stack)=>{
        if(stack.length<2)
            return

        let top1 = stack[stack.length-1]
        let top2 = stack[stack.length-2]
        stack[stack.length-1] = top2
        stack[stack.length-2] = top1
    }
}

function isOperand(str){
    return str.match(/^[+-]?([0-9]*[.])?[0-9]+$/)
}

function isBinaryOperator(str){
    return str in binaryOperations
}

function isUnaryOperator(str){
    return str in unaryOperations
}

function isStackOperator(str){
    return str in stackOperations
}

function handleResult(stack, opn, res){
    if(!BigNumber.isBigNumber(res)){
        res = BigNumber(res)
    }
    if(res.isNaN()){
        throw new Error('Applying operator '+ opn + ' results in NaN')
    }
    stack.push(res)
}

function doBinaryOpn(stack, opn){
    if(stack.length<2){
        throw new Error('invalid rpn notation : not enough operand')
    }
    let bignumber2 = stack.pop()
    let bignumber1 = stack.pop()
    let opnFn = binaryOperations[opn]
    try{
        let res = opnFn(bignumber1, bignumber2)
        handleResult(stack, opn, res)
    }catch(e){
        stack.push(bignumber1)
        stack.push(bignumber2)
        throw e
    }
}

function doUnaryOpn(stack, opn){
    if(stack.length<1){
        throw new Error('invalid rpn notation : operand not found')
    }
    let bignumber1 = stack.pop()
    let opnFn = unaryOperations[opn]
    try{
        let res = opnFn(bignumber1)
        handleResult(stack, opn, res)
    }catch(e){
        stack.push(bignumber1)
        throw e
    }
        
}

function doOpn(stack, opn){
    if(isBinaryOperator(opn)){
        doBinaryOpn(stack, opn)
    }
    else if(isUnaryOperator(opn)){
        doUnaryOpn(stack, opn)
    }
    else if(isStackOperator(opn)){
        return stackOperations[opn](stack)
    }
}


module.exports = {
    isOperand,
    isBinaryOperator,
    isUnaryOperator,
    isStackOperator,
    binaryOperations,
    unaryOperations,
    stackOperations,
    doBinaryOpn,
    doUnaryOpn,
    doOpn
}