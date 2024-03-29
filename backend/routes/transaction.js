const express = require("express");

var jwt = require("jsonwebtoken");
const { Transaction } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";

  const authKey = req.headers.authorization;
  const token = authKey.split(" ")[1];
  const decoded = jwt.decode(token);

  const transactions = await Transaction.find({
    $or: [
      {
        toFirstName: {
          $regex: filter,
        },
      },
      {
        toLastName: {
          $regex: filter,
        },
      },
    ],
    $and: [{
      $or: [ { fromAccount: decoded.userId  }, { toAccount: decoded.userId  } ]
  }]
  });
  res.json({
    transactions: transactions.map((transaction) => ({
      amount: transaction.amount,
      fromAccount: transaction.fromAccount,
      toAccount: transaction.toAccount,
      toFirstName: transaction.toFirstName,
      toLastName: transaction.toLastName,
      fromFirstName: transaction.fromFirstName,
      fromLastName: transaction.fromLastName,
      completed: transaction.completed,
      message: transaction.message,
      date:transaction.date,
      time: transaction.time,
    })),
  });
});

module.exports = router;
