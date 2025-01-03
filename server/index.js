const express = require("express")
require('dotenv').config();
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route")
const db = require("./db/db");

db();
app.use(cookieParser())
app.use(cors({credentials:true}));
app.use(express.json())
app.use("/v1",userRouter)
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening at PORT ${process.env.PORT}`)
})