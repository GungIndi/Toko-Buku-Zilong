//import required from model books
const Books = require("../models/Book");
// console.log("MASUK CONTROLLER Book");
module.exports = {
    viewBooks: async (req, res) => {
        console.log("HELO2");
        try{
             // wait until async process finish then take table from books database
            const books = await Books.find();

            // create alertMessage and alertStatus variable and stored them in an object
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

            /*
                render view from books
                show data and call books variable above
                render alert
            */
            console.log("HELO");
            res.render("books",{
                books,
                alert,
                title: "ZILONG",
            });

        } catch (error){
            console.log("HELO1");
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


    
    // CREATE DATA

    // READ DATA

    // UPDATE DATA

    // DELETE DATA

}

