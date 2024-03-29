const zod = require("zod");

//Schema for taking New Sign Up
const createUser = zod.object({
  username: zod.string().email(),
firstName: zod.string(),
lastName: zod.string(),
password: zod.string()
});

//Schema for checking Sign in
const signInUser = zod.object({
  username: zod.string().email(),
password: zod.string()
})

//Schema for checking Sign in
const updateUser = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

//Exporting the Schemas
module.exports = { createUser, signInUser, updateUser };
