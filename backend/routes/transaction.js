const express = require("express"); // Import Express module as express
const jwt = require("jsonwebtoken"); // Import JsonWebToken module as jwt
const { Transaction } = require("../db"); // Import Databases from config file

const router = express.Router(); // Creates an Express router instance

// This route returns all the transactions or transactions based on the filter present in the Account DB
router.get("/bulk", async function (req, res) {
  // Extract filter conditions from the request query parameters
  const filter = req.query.filter || "";

  // extract authorization key from the request header
  const authKey = req.headers.authorization;
  // Spliting the authorization key as the format is  {Bearer: key} and we need the key part
  const token = authKey.split(" ")[1];
  // decode the token ton extract the user_id
  const decoded = jwt.decode(token);

  // Find all the transactions of loggedIn user based on the filter conditions
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
    $and: [
      {
        $or: [{ fromAccount: decoded.userId }, { toAccount: decoded.userId }],
      },
    ],
  });
  // Send the transactions as a response to the client
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
      date: transaction.date,
      time: transaction.time,
    })),
  });
});

module.exports = router;
