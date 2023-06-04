const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    firstName: String,
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    address: {
        streetName: {
            type: String,
            required: true,
        },
        streetNumber: String,
        city: {
            type: String,
            required: true,
        },
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Member", memberSchema);
