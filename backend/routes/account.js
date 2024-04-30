const express = require("express"); // Import Express module as express
const jwt = require("jsonwebtoken"); // Import JsonWebToken module as jwt

const { authMiddleware } = require("../middleware"); // Import Authentication middleware
const { Account, Transaction } = require("../db"); // Import Databases from config file
const mongoose = require("mongoose"); // Import Mongoose module as mongoose

const router = express.Router(); // Creates an Express router instance

// This route returns the logged in user's balance
// The `authMiddleware` function handles the authentication checks before proceeding.
router.get("/balance", authMiddleware, async (req, res) => {
  // upon successful authentication user is searched in Account data base using userId

  try {
    // Find User Account
    const account = await Account.findOne({ userId: req.userId });
    // If user not present in Account DB return error code and message
    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return Balance:
    res.json({ balance: account.balance });
  } catch (error) {
    // Error Handling (General)
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
});

// This route is used to transfer funds from one user to another
// The `authMiddleware` function handles the authentication checks before proceeding.
router.post("/transfer", authMiddleware, async (req, res) => {
  //Extract Transfer Data from Request body
  const {
    amount,
    to,
    from,
    toFirstName,
    toLastName,
    fromFirstName,
    fromLastName,
  } = req.body;

  // Create Transaction entry as transaction is initiated
  const transaction = await Transaction.create({
    toAccount: to,
    toFirstName: toFirstName,
    toLastName: toLastName,
    fromFirstName: fromFirstName,
    fromLastName: fromLastName,
    fromAccount: from,
    amount: amount,
    // Get transaction date and time to log in the database
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  // save the transaction details to update the transaction after completion
  const transactionId = transaction._id;

  try {
    // Initiate Database Session
    // Reason : if the transaction fails midway then the whole process reverts back to normal
    const session = await mongoose.startSession();
    session.startTransaction();

    // Fetch the account details of the user
    const account = await Account.findOne({ userId: from }).session(session);

    // check if the account has the amount to be transferred
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // check if the recipient account is present
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      await Transaction.updateOne(
        { _id: transactionId },
        { message: "Invalid account" }
      ).session(session);
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer:
    // 1. deduct amount from sender
    await Account.updateOne(
      { userId: from },
      { $inc: { balance: -amount } }
    ).session(session);

    // 2. Add amount from sender
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // 3. Update the transaction log
    await Transaction.updateOne(
      { _id: transactionId },
      { completed: true, message: "Completed transaction" }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
      transactionId: transaction._id,
    });
  } catch (error) {
    //Error Handling
    console.error(error);

    // Abort transaction on any error
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    // Close Session
    session.endSession();
  }
});

module.exports = router;
