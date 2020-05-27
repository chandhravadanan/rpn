const BigNumber = require('bignumber.js');
const Operations = require('./operations')
const Utils = require('./utils')

const MODES = { 
    bin : 2, 
    oct : 8, 
    dec : 10, 
    hex : 16
},

SYMPOLS = { 
    pi : ()=> BigNumber(Math.PI), 
    e : ()=> BigNumber(Math.E),
    rand : ()=> BigNumber.random()
}

function isMode(str){
    return str in MODES
}

function isSymbol(str){
    return str in SYMPOLS
}

function isOperator(str){
    if( Operations.isBinaryOperator(str)){
        return true
    }
    if( Operations.isUnaryOperator(str)){
        return true
    }
    if( Operations.isStackOperator(str)){
        return true
    }
    return false
}

function isVariableDclr(str){
    return str.charAt(str.length-1)=='='
}


class RPNEvaluator{

    constructor(){
        this.stack = []
        this.vars = {}
        this.macro = {}
        this.mode = 10
        this.separtor = ' '
        this.opn = {
            'clr' : this.clearStack.bind(this),
            'cla' : this.clearStackAndVars.bind(this),
            'clv' : this.clearVars.bind(this),
            'stack' : this.vertical.bind(this),
            'macro' : this.createMacro.bind(this),
            'help' : Utils.printUsage,
            'exit' : ()=> process.exit(0)
        }
    }

    getStack(){
        return this.stack
    }

    clearStack(){
        this.stack = []
    }

    getVars(){
        return this.vars
    }

    getVariableValue(varName){
        return this.vars[varName]
    }

    clearVars(){
        this.vars = {}
    }

    clearStackAndVars(){
        this.clearStack()
        this.clearVars()
    }

    vertical(){
        this.separtor = this.separtor==' ' ? '\n' : ' '
    }

    isVariable(literal){
        return literal in this.vars;
    }

    isDeclaredMacro(literal){
        return literal in this.macro
    }

    getTop(){
        return this.stack[this.stack.length-1]
    }

    isReserved(str){
        if(isMode(str) || isSymbol(str) || isOperator(str)){
            return true
        }
        if(str in this.opn){
            return true
        }
        return false
    }

    evaluate(statement){
        if(!statement){
            return
        }
        let literals = statement.split(/\s+/)
        return this.evaluateArr(literals)
    }

    evaluateArr(literals){
        if(!literals){
            return this
        }
        for(let index=0; index<literals.length; index++){
            let curLiteral = literals[index]
            if(curLiteral=='repeat'){
                index++
                this.repeatOpn(literals, index)
            }
            else if(curLiteral=='macro'){
                let macroInfo = literals.slice(index+1)
                this.opn.macro(macroInfo)
                break;
            }
            else if(curLiteral in this.opn){
                this.opn[curLiteral]()
            }
            else if(this.isDeclaredMacro(curLiteral)){
                let macroDef = this.macro[curLiteral]
                this.evaluateArr(macroDef)
            }
            else{
                this.processLiterals(curLiteral)
            }
        }
        return this
    }


    createVariable(literal){
        if(this.stack.length<=0)
            throw new Error('rpn syntax error : no operand found')
        
        let varName = literal.slice(0, -1)
        if(!varName.match(/^[a-zA-z]+$/))
            throw new Error('only alphabets allowed in variable name')

        if(this.isReserved(varName))
            throw new Error('reserved keyword used as variable')
        
        this.vars[varName] = this.stack.pop()
    }

    createMacro(macroInfoArr){
        if(macroInfoArr.length<2)
            return

        let macroName = macroInfoArr[0]
        if(!macroName.match(/^[a-zA-z]+$/))
            throw new Error('only alphabets allowed in macroname')

        if(this.isReserved(macroName))
            throw new Error('reserved keyword used as macronames')

        let macroDef = macroInfoArr.slice(1)
        for(let index=0; index<macroDef.length; index++){
            let token = macroDef[index]
            if(!isOperator(token) && !Operations.isOperand(token)){
                throw new Error('only operators and operand allowed in macro')
            }
        }

        this.macro[macroName]= macroDef
    }

    repeatOpn(literals, index){
        if(index >= literals.length)
            throw new Error('invalid repeat syntax')
        let opn =  literals[index]
        Operations.stackOperations.repeat(this.stack, opn)
    }


    processLiterals(literal){
        if(Operations.isOperand(literal)){
            this.stack.push(BigNumber(literal))
        }
        else if(this.isVariable(literal)){
            this.stack.push(this.vars[literal])
        }
        else if(isSymbol(literal)){
            this.stack.push(SYMPOLS[literal]()) 
        }
        else if(isMode(literal)){
            this.mode = MODES[literal]
        }
        else if(isOperator(literal)){
            let newStack = Operations.doOpn(this.stack, literal)
            this.stack = newStack ? newStack : this.stack
        }
        else if(isVariableDclr(literal)){
            this.createVariable(literal)
        }
    }

    toString(){
        let str = ''
        let mode = this.mode
        for(let eachVar in this.vars){
            str += ' ' + eachVar+'='+ this.vars[eachVar]
        }
        str =  str.length>0 ? '['+str +' ]'+ this.separtor : str
        this.stack.forEach((bigNumber)=>{
            str += mode==2 ? '0b' : ''
            str += bigNumber.toString(mode) + this.separtor
        })
        return str
    }

}


module.exports = RPNEvaluator;