class logging {

    constructor () {
        this.message = '';
    }
    
    set(input){
        this.message = input;
    };
 
    remove(){
        this.message = '';
    };
 
    execute(){
        console.log(this.message);
    };
}
// SINGLETON UNIQUE INSTANCE
logging.instance = null;

logging.getInstance = function(){
    if(this.instance === null){
        this.instance = new logging();
    }
    return this.instance;
}
module.exports = {
    handler: logging.getInstance()
}