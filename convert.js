const dotenv = require("dotenv");

dotenv.config();

const web3 = require("@solana/web3.js");
const bs58 = require("bs58");

let secretKey = bs58.default.decode(process.env.PRIVATE_KEY);
console.log(`[${web3.Keypair.fromSecretKey(secretKey).secretKey}]`);
