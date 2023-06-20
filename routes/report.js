var router = require("express").Router();
const ensureAuthenticated = require("../config/requireAuth.js");
// const reportController =  require("../controllers/reportController");
const Books = require("../models/Book");
const Transactions = require("../models/Transaction.js");
const Users = require("../models/User");
const moment = require("moment");
const mongoose = require("mongoose");
const { query } = require("express");

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
    const selectedGenres = req.query.genre || [];
    
    res.render('report/bookReport',{
        user: req.user,
        selectedGenres: selectedGenres,
        books: books,
        allBooks: books,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 
router.post('/books',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const searchResult = req.body.search;
    const selectedGenres = req.body.genre;
    const selectedAuthor = req.body.author;
    const selectedPublisher = req.body.publisher;

    const stockType = req.body.stockType; // Get the selected stock type
    const specificAmount = req.body.specificAmount; // Get the specific amount input value
    const minStock = req.body.minStock; // Get the minimum stock input value
    const maxStock = req.body.maxStock;

    const priceType = req.body.priceType;
    const specificPrice = req.body.specificPrice; 
    const minPrice = req.body.minPrice; 
    const maxPrice = req.body.maxPrice;

    const yearType = req.body.yearType;
    const specificYear = req.body.specificYear; 
    const minYear = req.body.minYear; 
    const maxYear = req.body.maxYear;
    
    console.log(priceType,minPrice, maxPrice, specificPrice);

    const selectedGenresArray = Array.isArray(selectedGenres) ? selectedGenres    : [selectedGenres];
 
    const filterStockAsc = true; // Set to true for ascending stock filter, false for descending
    console.log(selectedGenres);
    const queryConditions = {
        $or: [
          { title: new RegExp('^' + searchResult, 'i') },
          { author: new RegExp('^' + searchResult, 'i') },
          { publisher: new RegExp('^' + searchResult, 'i') }
        ]
      };

    if (selectedGenres) {
        queryConditions.genre = selectedGenres;
    }
    if (selectedAuthor) {
        queryConditions.author = selectedAuthor;
    }
    if (selectedPublisher) {
        queryConditions.publisher = selectedPublisher;
    }
    if (stockType === 'specific' && specificAmount) {
      queryConditions.stock = { $eq: specificAmount };
    } else if (stockType === 'range' && minStock && maxStock) {
      queryConditions.stock = { $gte: minStock, $lte: maxStock };
    }

    if (priceType === 'specific' && specificPrice) {
      queryConditions.price = { $eq: specificPrice };
    } else if (priceType === 'range' && minPrice && maxPrice) {
      queryConditions.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (yearType === 'specific' && specificYear) {
      queryConditions.publicationYear = { $eq: specificYear };
    } else if (yearType === 'range' && minYear && maxYear) {
      queryConditions.publicationYear = { $gte: minYear, $lte: maxYear };
    }
      // Add stock filter
    // queryConditions.stock = { $gte: 0 }; // Example: Filter for books with stock greater than or equal to 0
      
      // Perform the query
    const books = await Books.find(queryConditions);
    console.log(books);
    const allBooks = await Books.find();
    res.render('report/bookReport',{
        user: req.user,
        selectedGenres: selectedGenresArray,
        books: books,
        allBooks:allBooks,
        allBooks: allBooks,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

// USERS REPORTS
router.get('/users',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const users = await Users.find();
    const selectedType = req.body.userType || [];
    const selectedActive = req.body.isActive || [];
    res.render('report/userReport',{
        user: req.user,
        selectedActive:selectedActive,
        selectedType: selectedType,
        users,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

router.post('/users',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const searchResult = req.body.search;
    const selectedType = req.body.userType;
    const selectedActive = req.body.isActive;

    const selectedTypeArray = Array.isArray(selectedType)
    ? selectedType
    : [selectedType];

    const selectedActiveArray = Array.isArray(selectedActive)
    ? selectedActive
    : [selectedActive];
    const filterStockAsc = true; // Set to true for ascending stock filter, false for descending

    const queryConditions = {
        $or: [
          { name: new RegExp('^' + searchResult, 'i') },
          { address: new RegExp('^' + searchResult, 'i') },
        ]
      };
    if (selectedType) {
        queryConditions.userType = selectedType;
    }
    
    if (selectedActive) {
        queryConditions.isActive = selectedActive;
    }
      // Add stock filter
    // queryConditions.stock = { $gte: 0 }; // Example: Filter for books with stock greater than or equal to 0
      
      // Perform the query
    const sortOrder = filterStockAsc ? 1 : -1;
    const users = await Users.find(queryConditions)
    res.render('report/userReport',{
        user: req.user,
        selectedActive: selectedActiveArray,
        selectedType: selectedTypeArray,
        users,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

router.get('/transactions',ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
    const transactions = await Transactions.find();
    const users = await Users.find();
    const books = await Books.find();

    res.render('report/transactionReport',{
        user: req.user,
        users,
        transactions,
        moment,
        books,
        allBooks: books,
        title: "REPORT",
        userType: req.user.userType,
        name: req.user.name
        });
}); 

router.post('/transactions', ensureAuthenticated.ensureAuthenticatedAdmin, async (req, res) => {
  try {
    const allBooks = await Books.find();
    const users = await Users.find();

    const selectedAdmin = req.body.adminId;
    const selectedMember = req.body.memberId;
    const selectedBook = req.body.bookId;
    const selectedTimeStamp = req.body.timeStamp;
    const selectedPriceType = req.body.priceType;
    const specificPrice = req.body.specificPrice;
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;

    const queryConditions = {};

    if (selectedAdmin) {
      queryConditions.adminId = selectedAdmin;
    }

    if (selectedMember) {
      queryConditions.memberId = selectedMember;
    }

    if (selectedBook) {
      queryConditions.bookId = selectedBook;
    }

    if (selectedTimeStamp === 'specific') {
      const specificTimeStamp = req.body.timestamp;
      if (specificTimeStamp) {
        queryConditions.timestamp = specificTimeStamp;
      }
    } else if (selectedTimeStamp === 'range') {
      const minTimeStamp = req.body.minTimeStamp;
      const maxTimeStamp = req.body.maxTimeStamp;
      if (minTimeStamp && maxTimeStamp) {
        queryConditions.timestamp = {
          $gte: minTimeStamp,
          $lte: maxTimeStamp
        };
      }
    }

    if (selectedPriceType === 'specific') {
      if (specificPrice) {
        queryConditions.totalPrice = specificPrice;
      }
    } else if (selectedPriceType === 'range') {
      if (minPrice && maxPrice) {
        queryConditions.totalPrice = {
          $gte: minPrice,
          $lte: maxPrice
        };
      }
    }
    console.log(queryConditions);
    const transactions = await Transactions.find(queryConditions)
      .populate("memberId", "name")
      .populate("adminId", "name")
      .exec();

    res.render('report/transactionReport', {
      user: req.user,
      transactions,
      moment,
      allBooks,
      books: allBooks,
      users,
      title: "REPORT",
      userType: req.user.userType,
      name: req.user.name
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    // Render an error page or show an error message to the user
    res.render('error', { error: err });
  }
});



module.exports = router;