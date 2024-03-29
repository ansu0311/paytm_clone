const express = require("express");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const JWT_SECRET  = jwt_secret;

const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const { amount, to,from ,toFirstName,toLastName,fromFirstName,fromLastName } = req.body;
  console.log(req.body);
  const transaction = await Transaction.create({
    toAccount: to,
    toFirstName: toFirstName,
    toLastName: toLastName,
    fromFirstName: fromFirstName,
    fromLastName: fromLastName,
    fromAccount: from,
    amount: amount,
    date: date,
    time: time,
  })
  const transactionId = transaction._id

  const session = await mongoose.startSession();
  session.startTransaction();

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: from }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    await Transaction.updateOne({_id:transactionId},{message:"Invalid account"}).session(session);
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: from },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await Transaction.updateOne(
    {_id:transactionId},
    {completed:true,message:"Completed transaction"}
    ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
    transactionId: transaction._id,
  });
});

module.exports = router;
