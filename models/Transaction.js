const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    memberId: mongoose.ObjectId,
    adminId: {
        type: mongoose.ObjectId,
        required: true,
    },
    details: [
        {
            bookId: {
                type: mongoose.ObjectId,
                required: true,
            }
        },
    ],
});

module.exports = mongoose.model("Transaction", transactionSchema);
