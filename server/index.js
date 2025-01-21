const express = require("express")
require('dotenv').config();
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/routine.route")
const authMiddleware = require("./middleware/auth.middleware")
const db = require("./db/db");

db();
app.use(cookieParser())
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" , httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "Strict", }));

app.use("/v1",authMiddleware,userRouter)
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening at PORT ${process.env.PORT}`)
})