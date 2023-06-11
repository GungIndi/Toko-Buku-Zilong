const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    memberId: {
        type: mongoose.ObjectId,
        required: true,
    },
    adminId: {
        type: mongoose.ObjectId,
        required: true,
    },
    bookId: {
        type: mongoose.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);
