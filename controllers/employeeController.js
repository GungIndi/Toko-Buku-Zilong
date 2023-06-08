// //import required from model books
const Employees = require("../models/Employee");

module.exports = {
    viewBooks:async (req, res) => {
        try{

//              // wait until async process finish then take table from books database
            const employees = await Employees.find();

//             // create alertMessage and alertStatus variable and stored them in an object
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };

//             /*
//                 render view from index
//                 show data and call books variable above
//                 render alert
//             */
            res.render("employee",{
                employees,
                alert,
                title: Zilong,
            });

        } catch (error){
            console.log("HELO1");
            // if error then redirect to /books
            res.redirect("/employees");
        }
    },


    
//     // CREATE DATA

//     // READ DATA

//     // UPDATE DATA

//     // DELETE DATA

}

