const express = require("express"); // Import Express module as express

// import required sub-routers
const userRouter = require("./user");
const accountRouter = require("./account");
const transactionRouter = require("./transaction");

const router = express.Router(); // Creates an Express router instance

// Mount sub-routers with appropriate base paths
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
