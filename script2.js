const dotenv = require("dotenv");
const fs = require("fs");
const { PublicKey, Keypair, Transaction } = require("@solana/web3.js");
const bs58 = require("bs58");

dotenv.config();

// Load signer's private key
const secretKey = bs58.default.decode(process.env.PRIVATE_KEY);
const signer = Keypair.fromSecretKey(secretKey).secretKey;
const publicKey = new PublicKey(process.env.PUBLIC_KEY);

(async () => {
  try {
    // Load the partially signed transaction from the file
    const serializedTx = fs.readFileSync("psbt.json", {
      encoding: "utf8",
    });
    const transaction = Transaction.from(Buffer.from(serializedTx, "base64"));

    // Partially sign the transaction with the next signer
    transaction.partialSign({
      publicKey: publicKey,
      secretKey: signer,
    });

    // Save the updated transaction back to the file
    fs.writeFileSync(
      "psbt.json",
      transaction.serialize({ requireAllSignatures: false }).toString("base64")
    );
    console.log("Transaction signed by an additional signer and saved.");
  } catch (error) {
    console.error("Error signing transaction:", error);
  }
})();
