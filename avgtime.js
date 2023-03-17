const Blockchain = new require('./blockchain');
const blockchain = new Blockchain();

blockchain.addBlock({data: "new data"});
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];
console.log(blockchain.chain[1]);

for( let i=0; i<1000; i++) {

    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data:`block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;
    
    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff);

    averageTime = times.reduce((total,num) => (total+num))/times.length;

    console.log(`Time to mine a block ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, Average time: ${averageTime}ms`);

}