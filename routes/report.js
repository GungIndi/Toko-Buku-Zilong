var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");
// const reportController =  require("../controllers/reportController");
const Books = require("../models/Book");
const Users = require("../models/User");
let actionUrl;

// REPORTS
router.get('/',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    res.render('report',{
        req,
        actionUrl,
        user: req.user,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

router.post('/', (req, res) => {
    let actionUrl;
    if (req.body.collection === 'users') {
      actionUrl = 'users';
    } else if (req.body.collection === 'transactions') {
      actionUrl = 'transactions';
    } else {
      actionUrl = 'books';
    }
    res.redirect(`/report/${actionUrl}`)
  });

// BOOKS REPORTS
router.get('/books',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const books = await Books.find();
    res.render('report/bookReport',{
        user: req.user,
        books: books,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 
router.post('/books',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const searchResult = req.body.search;
    const filterGenre = "Sci-Fi"; // Replace with the selected genre filter
    const filterStockAsc = true; // Set to true for ascending stock filter, false for descending

    const queryConditions = {
        $or: [
          { title: new RegExp('^' + searchResult, 'i') },
          { author: new RegExp('^' + searchResult, 'i') },
          { publisher: new RegExp('^' + searchResult, 'i') }
        ]
      };

    // if (filterGenre) {
    //     queryConditions.genre = filterGenre;
    // }
      
      // Add stock filter
    // queryConditions.stock = { $gte: 0 }; // Example: Filter for books with stock greater than or equal to 0
      
      // Perform the query
    const sortOrder = filterStockAsc ? 1 : -1;
    const books = await Books.find(queryConditions)
    res.render('report/bookReport',{
        user: req.user,
        books: books,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

// USERS REPORTS
router.get('/users',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const users = await Users.find();
    res.render('report/userReport',{
        user: req.user,
        users,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 
router.post('/users',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const searchResult = req.body.search;
    const filterGenre = "Sci-Fi"; // Replace with the selected genre filter
    const filterStockAsc = true; // Set to true for ascending stock filter, false for descending

    const queryConditions = {
        $or: [
          { name: new RegExp('^' + searchResult, 'i') },
          { address: new RegExp('^' + searchResult, 'i') },
        ]
      };

    // if (filterGenre) {
    //     queryConditions.genre = filterGenre;
    // }
      
      // Add stock filter
    // queryConditions.stock = { $gte: 0 }; // Example: Filter for books with stock greater than or equal to 0
      
      // Perform the query
    const sortOrder = filterStockAsc ? 1 : -1;
    const users = await Users.find(queryConditions)
    res.render('report/userReport',{
        user: req.user,
        users,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

module.exports = router;