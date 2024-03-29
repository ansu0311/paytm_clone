const express = require("express");

var jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const { createUser, signInUser, updateUser } = require("../types");
const { User, Account } = require("../db");
const JWT_SECRET  = jwt_secret;
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {


  // check if the inputs are correct
  const { success } = createUser.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "You have sent Wrong Input format",
    });
    return;
  }

  // check if the username already exist
  let userExists = await User.findOne({
    username: req.body.username
})
  if (userExists) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }

  const balance = ( 1+ Math.random()*10000)

  //create new user
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  });
  const userId = user._id;

  //add balace to acount
  await Account.create({
    userId,
    balance: (1 + Math.random() * 10000).toFixed(2)
})

  //create token for the new user
  const token = jwt.sign({
    userId
}, JWT_SECRET);

res.json({
    message: "User created successfully",
    token: token
})
})

router.post("/signin", async function (req, res) {

  //check for the input data is valid
  const parsedPayload = signInUser.safeParse(req.body);
  if (!parsedPayload) {
    res.status(411).json({
      message: "Error while logging in",
    });
    return;
  }

  //check if the user exist in the database and are the credentials correct
  const correctCredentials = await User.findOne({
    username: req.body.username,
    password: req.body.password
});

  if (!correctCredentials) {
    res.status(411).json({
      message: "Error while logging in",
    });
    return;
  }
  const userId = correctCredentials._id;

  //create token for the new user
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({
    message: "User Logged In successfully",
    token,
  });
});

router.get("/",authMiddleware,async function(req,res){
  const authKey = req.headers.authorization
  const token = authKey.split(' ')[1];

  const decoded = jwt.decode(token)
  let userExists = await User.findOne({
    _id: decoded.userId
})
res.status(200).json({
  firstName: userExists.firstName,
  lastName: userExists.lastName,
  userId: userExists._id
})

})

router.put("/update", authMiddleware, async function (req, res) {

  //check for the input data is valid
  const parsedPayload = updateUser.safeParse(req.body);
  if (!parsedPayload) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }

  // update the data for the user
  await User.updateOne({ _id: req.userId }, req.body);

  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";

  
  const authKey = req.headers.authorization;
  const token = authKey.split(" ")[1];
  const decoded = jwt.decode(token);

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    users: users.filter((user)=>{
      return user._id != decoded.userId
    }).map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.use(function(err,req,res,next){
  res.json({
    err
  })
})

module.exports = router;
