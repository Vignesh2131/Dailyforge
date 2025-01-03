const mongoose = require("mongoose");
const {Todos,Habit,Journal} = require("./routine.schema")
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required:true, min:[6,'Username should be at least 6 characters'], max:[12,'Username should not exceed 12 characters']},
    email: { type: String, required:true},
    password: {type:String, required:true},
    imageUrl: String,
    todos: [{type:Schema.Types.ObjectId,ref:"Todos"}],
    habits: [{type:Schema.Types.ObjectId,ref:"Habit"}],
    journals:[{type:Schema.Types.ObjectId,ref:"Journal"}],

})

const User = mongoose.model('User', userSchema);

module.exports = User