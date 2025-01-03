const express = require("express")
require('dotenv').config();
const cors = require('cors')
const app = express();

const authRouter = require("./routes/auth.route");
const db = require("./db/db");

db();

app.use(cors());
app.use(express.json())
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening at PORT ${process.env.PORT}`)
})