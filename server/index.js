const express = require("express")
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const app = express();
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/routine.route")
const authMiddleware = require("./middleware/auth.middleware")
const db = require("./db/db");


app.use(cookieParser())
app.use(express.json());
app.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URL}` }));
app.use("/v1",authMiddleware,userRouter)
app.use("/auth", authRouter);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Listening at PORT ${process.env.PORT}`)
    db();
})