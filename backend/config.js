const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  jwt_secret: process.env.JWT_SECRET
};