
const readline = require('readline');
const RPNEvaluator = require('./rpnevaluator')

class InteractiveMode{

    constructor(evaluator){
        this.evaluator = evaluator
    }

    async start(){
        let curState = this.evaluator.toString()
        let input = await this.readUserInput(curState)
        if(input){
            try{
                this.evaluator.evaluate(input)
            }catch(e){
                console.log(e.message)
            }
            this.start()
        }
    }

    readUserInput(curState) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        return new Promise(resolve => rl.question(curState + ' > ', ans => {
            rl.close();
            resolve(ans);
        }))
    }

}


module.exports = InteractiveMode;