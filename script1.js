const dotenv = require("dotenv");
const {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} = require("@solana/web3.js");
const {
  TOKEN_PROGRAM_ID,
  createMintToInstruction,
} = require("@solana/spl-token");
const bs58 = require("bs58");
const fs = require("fs");

dotenv.config();

// Define your variables
const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);
const mintPublicKey = new PublicKey(
  "6VYF5jXq6rfq4QRgGMG6co7b1Ev1Lj7KSbHBxfQ9e1L3"
);
const destination = new PublicKey(
  "9avPSZDMnmbkqpPabG1KsW2RAGoNY8NHQwjBWToSra4A"
);
const mintAuthority = new PublicKey(
  "EEqkyzc7bdHjSBQa4BekmKyWEMQxBTu8geJJ9ejWcZZV"
);
const addtionalSupply = 1_352_622_943 * 10 ** 8;

const secretKey = bs58.default.decode(process.env.PRIVATE_KEY);
const signer = Keypair.fromSecretKey(secretKey).secretKey;
const publicKey = new PublicKey(process.env.PUBLIC_KEY);

(async () => {
  try {
    const { blockhash } = await connection.getLatestBlockhash();

    const transaction = new Transaction().add(
      createMintToInstruction(
        mintPublicKey,
        destination,
        mintAuthority,
        addtionalSupply,
        publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    transaction.partialSign({
      publicKey: publicKey,
      secretKey: signer,
    });

    fs.writeFileSync(
      "psbt.json",
      JSON.stringify(
        transaction
          .serialize({ requireAllSignatures: false })
          .toString("base64")
      )
    );
    console.log(
      "Transaction partially signed by signer",
      JSON.stringify(
        transaction
          .serialize({ requireAllSignatures: false })
          .toString("base64")
      )
    );
  } catch (error) {
    console.error("Error while sign tx: ", error);
  }
})();
