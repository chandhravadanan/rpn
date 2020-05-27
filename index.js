#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const Interactive = require('./lib/interactive')
const RPNEvaluator = require('./lib/rpnevaluator')
const os = require('os')

function initalize(){
    let homedir = os.homedir();
    let filePath = path.join(homedir, '.rpnrc')
    let exist = fs.existsSync(filePath)
    let evaluator = new RPNEvaluator()

    if(exist){
        let content = fs.readFileSync(filePath, { encoding : 'utf-8'})
        let lines = content.split('\n')
        for(let eachLine of lines){
            evaluator.evaluate(eachLine)
        }
    }

    let args = process.argv
    if(args.length>2){
      let inputs = args.splice(2)
      let result = evaluator.evaluateArr(inputs).toString()
      console.log(result)
    }else{
      let mode = new Interactive(evaluator)
      mode.start()
    }
}



initalize()




