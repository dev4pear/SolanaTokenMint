const fs = require("fs");
const {
  Connection,
  sendAndConfirmRawTransaction,
  Transaction,
} = require("@solana/web3.js");

// Set up Solana connection
const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  try {
    // Load the fully signed transaction
    const serializedTx = fs.readFileSync("psbt.json", {
      encoding: "utf8",
    });
    const transaction = Transaction.from(Buffer.from(serializedTx, "base64"));

    // Send and confirm the transaction
    const signature = await sendAndConfirmRawTransaction(
      connection,
      transaction.serialize()
    );
    console.log(
      "Transaction successfully submitted with signature:",
      signature
    );
  } catch (error) {
    console.error("Error submitting transaction:", error);
  }
})();
