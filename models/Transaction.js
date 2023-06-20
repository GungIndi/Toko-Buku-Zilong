const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    memberId: {
      type: mongoose.ObjectId,
      ref:"User",
      required: true,
    },
    adminId: {
      type: mongoose.ObjectId,
      ref:"User",
      required: true,
    },
    details: [
      {
        bookId: {
          type: mongoose.ObjectId,
          ref:"Book",
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
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
