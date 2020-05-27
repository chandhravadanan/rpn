
const BigNumber = require('bignumber.js');

function checkAndThrowErr(bignumber1){
    if(!bignumber1.isInteger())
        throw new Error('bitwise operation not allowed in decimal values')
    if(bignumber1.lt(0))
        throw new Error('bitwise operation on negative number not yet supported')
}

function checkAndFormatBits(bignumber1, bignumber2){
    checkAndThrowErr(bignumber1)
    checkAndThrowErr(bignumber2)
    let binStr1 = bignumber1.toString(2);
    let binStr2 = bignumber2.toString(2);
    if(binStr1.length>binStr2.length){
        diff = binStr1.length - binStr2.length
        binStr2 = '0'.repeat(diff) + binStr2
    }else{
        diff = binStr2.length - binStr1.length
        binStr1 = '0'.repeat(diff) + binStr1
    }
    return [binStr1, binStr2]
}

function bitwiseNot(bignumber1){
    checkAndThrowErr(bignumber1)
    let binStr = bignumber1.toString(2);
    let modifiedBitStr = ''
    for(let index=0; index<binStr.length; index++){
        modifiedBitStr += binStr.charAt(index)=='1'  ? '0' : '1'
    }
    return BigNumber(modifiedBitStr, 2)
}

function bitwiseAnd(bignumber1, bignumber2){
    let [binStr1, binStr2 ] = checkAndFormatBits(bignumber1, bignumber2)
    let resBitStr = ''
    for(let index=0; index<binStr1.length; index++){
        resBitStr += binStr1.charAt(index) & binStr2.charAt(index)
    }
    return BigNumber(resBitStr, 2)
}

function bitwiseOR(bignumber1, bignumber2){
    let [binStr1, binStr2 ] = checkAndFormatBits(bignumber1, bignumber2)
    let resBitStr = ''
    for(let index=0; index<binStr1.length; index++){
        resBitStr += binStr1.charAt(index) | binStr2.charAt(index)
    }
    return BigNumber(resBitStr, 2)
}

function bitwiseXOR(bignumber1, bignumber2){
    let [binStr1, binStr2 ] = checkAndFormatBits(bignumber1, bignumber2)
    let resBitStr = ''
    for(let index=0; index<binStr1.length; index++){
        resBitStr += binStr1.charAt(index) ^ binStr2.charAt(index)
    }
    return BigNumber(resBitStr, 2)
}

function getFactorial(bignumber1){
    if(bignumber1.lte(1)){
        return 1
    }
    let ONE = BigNumber('1')
    let res = ONE;
    for(let index=BigNumber('2');
            index.lte(bignumber1); 
            index = index.plus(ONE)){
        res = res.times(index)
    }
    return res
}

function bitShiftLeft(bignumber1, pos){
    checkAndThrowErr(bignumber1)
    let binStr = bignumber1.toString(2);
    return BigNumber(binStr + '0'.repeat(pos), 2)
}

function bitShiftRight(bignumber1, pos){
    checkAndThrowErr(bignumber1)
    let binStr = bignumber1.toString(2);
    if(pos>=binStr.length)
        return BigNumber('0')

    let dropPos = binStr.length - pos
    return BigNumber(binStr.slice(0, dropPos), 2)
}

function printUsage(){
    console.log(`
    USAGE:
    
        rpn                          Launch in interactive mode
        rpn [expression]             Evaluate a one-line expression
    
        RC FILE
    
        rpn will execute the contents of ~/.rpnrc at startup if it exists.
    
        EXAMPLES
    
        rpn 1 2 + 3 + 4 + 5 +              => 15
        rpn pi cos                         => -1.0
        rpn                                => interactive mode
    `)
}

module.exports = {
    bitwiseNot,
    bitwiseAnd,
    bitwiseOR,
    bitwiseXOR,
    bitShiftLeft,
    bitShiftRight,
    getFactorial,
    printUsage
}