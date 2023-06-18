const Books = require("../models/Book");
const Users = require("../models/User");
const Transactions = require("../models/Transaction");

module.exports = {
  //GET
  viewReport: async (req, res) => {
    try {
      
      res.render("report", {
        Books,
        alert,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
      });

    } catch (error) {
      res.redirect("/report");
    }
  },

  // POST
  postReport: async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await Books.find({name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
    res.send({payload: search});
  },
};
