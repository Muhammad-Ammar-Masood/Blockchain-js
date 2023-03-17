const MINE_RATE = 1000;
const INITIAL_DIFF = 2;

const GENESIS_DATA = {
    timestamp: 1,
    prevHash: "0x000",
    hash: "0x123",
    data: "Block0",
    nounce: 0,
    difficulty: INITIAL_DIFF,
};

module.exports = { GENESIS_DATA, MINE_RATE };