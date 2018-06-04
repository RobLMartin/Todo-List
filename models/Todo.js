const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    createddate: {
        type: Date,
        default: Date.now
    },
    duedate: Date,
    isdone: {
        type: Boolean,
        default: false
    }

});

module.exports = Todo = mongoose.model("todos", TodoSchema);