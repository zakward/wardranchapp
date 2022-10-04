const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema( {

    location : {
        type: String,
        required: true
        //inside the house or outside 
    },
    section: {
        type: String,
        required: false
        // property maintenance, goats, horses, barn, equip maintenance
    },
    title: {
        type: String,
        required: true
        // title or name of the task
    },
    isComplete: {
        type: Boolean
    },
    priority: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Task", taskSchema)