
const Users = require("../models/User");


module.exports = {

  viewUser: async (req, res) => {
    try {

      const users = await Users.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("users", {
        users,
        alert,
        title: "USERS", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/users");
    }
  },

  addUser: async (req, res) => {

    try {
      const { firstName, lastName, role, address, phone, email } = req.body;
      await Users.create({ firstName, lastName, role, address, phone, email  });
      req.flash("alertMessage", "Success add data User");
      req.flash("alertStatus", "success");
      res.redirect("/users"); 
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/users");
    }bumi
  },

  // Membuat update data untuk mahasiswa
  editUser: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { id, firstName, lastName, role, address, phone, email  } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const users = await Users.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      users.firstName = firstName;
      users.lasttName = lastName;
      users.role = role;
      users.address = addres;
      users.phone = phone;
      users.email = email;
      
      await users.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data mahasiswa");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/users");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
      res.redirect("/users");
    }
  },

  // Membuat delete data untuk mahasiswa
  deleteUser: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const users = await Users.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await users.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data mahasiswa");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/users");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/users");
    }
  },
};
