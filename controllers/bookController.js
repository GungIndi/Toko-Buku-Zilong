//import required from model books
const Books = require("../models/Book");

module.exports = {
    
    viewBooks: async (req, res) => {

        try{
            //  wait until async process finish then take table from books database
            const books = await Books.find();

            // // // create alertMessage and alertStatus variable and stored them in an object
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            /*
                render view from books
                show data and call books variable above
                render alert
            */
            res.render("books",{
                books,
                alert,
                title: "BOOKS",
            });

        } catch (error){
            // if error then redirect to /books
            res.redirect("/books");
            
          
        }
    },

    addBooks: async (req, res) => {
        try {        
          const { title, author, publisher, publicationYear, genre, price } = req.body;
          // mengembalikan fungsi dan membuat data dari scheme/model books
          await Books.create({ title, author, publisher, publicationYear, genre, price });
          // ketika create data berhasil memberikan notifikasi
          req.flash("alertMessage", "Success add data Books");
          req.flash("alertStatus", "success");
          res.redirect("/books");
        } catch (error) {
          // ketika create data error memberikan notifikasi
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          // ketika inputan kosong, maka redirect kehalaman
          res.redirect("/books");
        }
      },

      updateBooks: async (req,res) => {
        try{
            const {title,author,publisher,publicationYear,genre,price} = req.body;
            const  book = await Books.findOne({title: title});

            book.title = title;
            book.author = author;
            book.publisher = publisher;
            book.publicationYear = publicationYear;
            book.genre = genre;
            book.price = price;

            await book.save();

            req.flash("alertMessage", "Book Data Updated!!")
            req.flash("alertStatus", "success");

            res.redirect("/books");
        } catch (error){
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/books");

        }
      },
    
    // CREATE DATA

    // READ DATA

    // UPDATE DATA

    // DELETE DATA

}

