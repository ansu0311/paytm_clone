const express = require("express"); // Import Express module as express
const cors = require("cors"); // Import cors module as cors
const mainRouter = require("./routes/index"); // import required router file

const app = express();
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // All routes defined in `mainRouter` will be prefixed with `/api/v1`

app.use("/api/v1", mainRouter); // All routes defined in `mainRouter` will be prefixed with `/api/v1`
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
