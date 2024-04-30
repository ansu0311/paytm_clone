const express = require("express"); // Import Express module as express
const jwt = require("jsonwebtoken"); // Import JsonWebToken module as jwt

// Import Zod object Schema to check recieved data has required details before conducting the process
const { createUser, signInUser, updateUser } = require("../types");
const { User, Account } = require("../db"); // Import Databases from config file
const { authMiddleware } = require("../middleware"); // Import Authentication middleware

const { jwt_secret } = require("../config"); // Import the secret key from config file
const JWT_SECRET  = jwt_secret;

const router = express.Router(); // Creates an Express router instance

// This route is used to Signup user into the database
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

  //add random balace to acount
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

// This route is used to Signin user
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

// This route is used to get user data from the database
router.get("/",authMiddleware,async function(req,res){
  // extract authorization key from the request header
  const authKey = req.headers.authorization;
  // Spliting the authorization key as the format is  {Bearer: key} and we need the key part
  const token = authKey.split(" ")[1];
  // decode the token ton extract the user_id
  const decoded = jwt.decode(token);
  // Find the user based on the user_id
  let userExists = await User.findOne({
    _id: decoded.userId
})
res.status(200).json({
  firstName: userExists.firstName,
  lastName: userExists.lastName,
  userId: userExists._id
})

})

// This route is used to update user data in the database
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

// This route returns all the users or users based on the filter present in the Account DB
router.get("/bulk", async function (req, res) {
  // Extract filter conditions from the request query parameters
  const filter = req.query.filter || "";

  // extract authorization key from the request header
  const authKey = req.headers.authorization;
  // Spliting the authorization key as the format is  {Bearer: key} and we need the key part
  const token = authKey.split(" ")[1];
  // decode the token ton extract the user_id
  const decoded = jwt.decode(token);

  // Find all the users of loggedIn user based on the filter conditions
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

  // Send the users as a response to the client
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

// To catch error if any 
router.use(function(err,req,res,next){
  res.json({
    err
  })
})

module.exports = router;
