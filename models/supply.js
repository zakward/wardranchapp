const mongoose = require("mongoose")
const Schema = mongoose.Schema

const supplySchema = new Schema( {

    item : {
        type : String,
        required: true
    },
    locationName: {
        type : String,
        required: false
    },
    locationLink: {
        type: String
    },
    price: {
        type: Number,
        required: false
    },
    dateOfPurchase : [{
            type: Date,
            required: true,
            default: Date.now,
            quanityPurchased: null
    }],
    quanity : {
        type: Number
    },
    imgUrl: {
        type: String
    },
    urgent: {
        type: Boolean
    }
            
}    
)

module.exports = mongoose.model("Supply", supplySchema)