const {GENESIS_DATA, MINE_RATE} = require("./config");
const cryptoHash = require("./crypto-hash");
const Blockchain = require("./blockchain");
const hextoBinary = require("hex-to-binary");


class Block {
    constructor({timestamp, prevHash, hash, data, nounce, difficulty}) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nounce = nounce;
        this.difficulty = difficulty;
        this.data = data;
    }  

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock, data}) {
        let hash,timestamp;
        const prevHash  = prevBlock.hash;
        let {difficulty} = prevBlock;

        let nounce = 0;
        do {
            nounce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                orginalBlock: prevBlock,
                timestamp,
            })
            hash = cryptoHash(timestamp, prevHash, data, nounce, difficulty);
        }while (hextoBinary(hash).substring(0,difficulty) !== "0".repeat(difficulty));
        return new this({
           timestamp, prevHash,hash, nounce, difficulty, data,
        })
    }

    static adjustDifficulty({orginalBlock, timestamp}) {
        const {difficulty} = orginalBlock;
        if(difficulty<1) return 1;
        const difference = timestamp - orginalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty-1;
        return difficulty+1;
    }
}

module.exports = Block;


