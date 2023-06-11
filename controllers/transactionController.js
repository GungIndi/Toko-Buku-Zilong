const Transactions = require("../models/Transaction");
const Books = require("../models/Book");
const Users = require("../models/User");

module.exports = {
  //GET
  viewTransaction: async (req, res) => {
    try {
      const transactions = await Transactions.find();
      const books = await Books.find();
      const users = await Users.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("transactions", {
        transactions,
        books,
        users,
        alert,
        title: "TRANSACTIONS",
      });
    } catch (error) {
      res.redirect("/transactions");
    }
  },

  // POST
  addTransaction: async (req, res) => {
    try {
        const { memberId, adminId, bookId, quantity } = req.body;
        const book = await Books.findOne({ _id: bookId});
        const price = book ? book.price : 0;
        const totalPrice = price * quantity;
      await Transactions.create({
        memberId,
        adminId,
        bookId,
        price,
        quantity,
        totalPrice,
      });
  
      req.flash("alertMessage", "Success add transaction data");
      req.flash("alertStatus", "success");
      res.redirect("/transactions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transactions");
    }
  },

  // PUT
  // DELETE
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      await Transactions.deleteOne({ _id: id });
      req.flash("alertMessage", "Transaction Deleted!!");
      req.flash("alertStatus", "warning");
      res.redirect("/transactions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transactions");
    }
  },
};
