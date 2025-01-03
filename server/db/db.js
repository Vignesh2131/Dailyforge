const mongoose = require("mongoose");

async function db() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        if (!connect) console.log("error occured")
        else console.log("DB Connection Successful")
    } catch (err) {
        console.log(err)
    }
}

module.exports = db