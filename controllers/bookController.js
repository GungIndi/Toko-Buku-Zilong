//import required from model books
const Books = require("../models/Book");

module.exports = {
    
    //GET

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

    // POST

    addBooks: async (req, res) => {
        try {        
          const { title, author, publisher, publicationYear, genre, price } = req.body;
          await Books.create({ title, author, publisher, publicationYear, genre, price });
          req.flash("alertMessage", "Success add data Books");
          req.flash("alertStatus", "success");
          res.redirect("/books");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/books");
        }
      },

      // PUT
  
      updateBooks: async (req,res) => {
        try{
            const  book = await Books.findOneAndUpdate({_id: req.params.id}, req.body );

            req.flash("alertMessage", "Book Data Updated!!")
            req.flash("alertStatus", "success");

            res.redirect("/books");
        } catch (error){
          console.log(error);
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/books");

        }
      },
      
      // DELETE

      deleteBook: async (req, res) => {
        try {

          const { id } = req.params;
          await Books.deleteOne({ _id: id });
          req.flash("alertMessage", "Book Deleted!!");
          req.flash("alertStatus", "warning");
          res.redirect("/books");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/books");
        }
      }

}                                                                                                                                                     

