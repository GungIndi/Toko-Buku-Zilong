const mongoose = require("mongoose");

const isActiveEnum = ["Active", "Not Active"];
const userTypeEnum = ["Admin", "Member"];

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive:{
        type: String,
        enum: isActiveEnum,
        required: true,
    },
    userType:{
        type: String,
        enum: userTypeEnum,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);