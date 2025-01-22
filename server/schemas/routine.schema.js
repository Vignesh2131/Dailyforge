const mongoose = require("mongoose");
const User = require("./user.schema")
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: String,
    status:Boolean,
    priority: String,
    user : {type:Schema.Types.ObjectId,ref:"User",required:true},
})

const habitSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    createdAt: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
);

const journalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    createdAt: String,
    mood: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
);


const Todos = mongoose.model('Todos', todoSchema);
const Habit = mongoose.model("Habit", habitSchema);
const Journal = mongoose.model("Journal", journalSchema);


module.exports = {Todos,Habit,Journal}