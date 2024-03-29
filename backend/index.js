const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1",mainRouter);
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server is running on port ${port}`); })