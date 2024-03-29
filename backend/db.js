const mongoose = require("mongoose");
const { username, password } = require("./config");

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.xxdaiuv.mongodb.net/`    
  );

const userSchema =new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
        unique: true,
    },
    balance:{
        type: Number,
        required: true,
    }
})

const transactionSchema = new mongoose.Schema({
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Accounts",
        required: true,
    },
    toFirstName:{
        type: String,
        required: true,
    },
    toLastName:{
        type: String,
        required: true,
    },
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Accounts",
        required: true,
    },
    fromFirstName:{
        type: String,
        required: true,
    },
    fromLastName:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        default: "Insufficient balance",
    }
})

const User = mongoose.model("Users", userSchema)
const Account = mongoose.model("Accounts",accountSchema)
const Transaction = mongoose.model("Transaction",transactionSchema)

module.exports = {
    User , Account , Transaction
}