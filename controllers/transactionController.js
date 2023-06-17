const Transactions = require("../models/Transaction");
const Books = require("../models/Book");
const Users = require("../models/User");
const moment = require("moment");

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
        moment,
        title: "TRANSACTIONS",
        userType: req.user.userType,
        name: req.user.name
      });
    } catch (error) {
      res.redirect("/transactions");
    }
  },

  // POST
  addTransaction: async (req, res) => {
    try {
        const { memberId, adminId, bookId} = req.body;
        let details = [];
        let totalPrice = 0;
        console.log(req.body.bookId.length);
        if(!Array.isArray(req.body.bookId)) {
        let book = await Books.findOne({ _id: bookId});
          let data = {
            bookId: book._id,
            price: book.price,
            quantity: req.body.quantity,
          };
          details.push(data);
          totalPrice += book.price * req.body.quantity;
        } else {
          for (let i = 0; i < req.body.bookId.length; i++) {
            let book = await Books.findOne({ _id: req.body.bookId[i]});
            let data = {
              bookId: book._id,
              price: book.price,
              quantity: req.body.quantity[i],
            };
            details.push(data);
            totalPrice += book.price * req.body.quantity[i];
          }
        }
      console.log(details.length);
      await Transactions.create({
        memberId,
        adminId,
        details,
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

  updateTransaction: async (req, res) => {
    try {
      const { adminId, memberId, bookId } = req.body;
      let details = [];
      let totalPrice = 0;
        console.log(req.body.bookId.length);
        if(!Array.isArray(req.body.bookId)) {
        let book = await Books.findOne({ _id: bookId});
          let data = {
            bookId: book._id,
            price: book.price,
            quantity: req.body.quantity,
          };
          details.push(data);
          totalPrice += book.price * req.body.quantity;
        } else {
          for (let i = 0; i < req.body.bookId.length; i++) {
            let book = await Books.findOne({ _id: req.body.bookId[i]});
            let data = {
              bookId: book._id,
              price: book.price,
              quantity: req.body.quantity[i],
            };
            details.push(data);
            totalPrice += book.price * req.body.quantity[i];
          }
        }
      console.log(details);
      req.body.adminId = adminId;
      req.body.memberId = memberId;
      req.body.bookId = bookId;
      req.body.details = details;
      req.body.totalPrice = totalPrice;
          
      await Transactions.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      req.flash("alertMessage", "Transaction Updated!!");
      req.flash("alertStatus", "success");
      res.redirect("/transactions");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transactions");
    }
  },

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
