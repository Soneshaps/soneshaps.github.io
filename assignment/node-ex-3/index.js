const express = require("express");
const app = express();
// const fs = require("fs");
// const path = require("path");
// const dbPath = path.join(__dirname, "file.json");

app.use(express.json());
const router = express.Router();
const signupRouter = require("./router/signup.router");

// const bycrypt = require("bcryptjs");
// // //controller
// // function registerController(res, req, next) {
// //   const { username, password } = req.body;

// // }

// //routes
// app.use(
//   "/api",
//   router.route("/register").post((req, res, next) => {
//     const { username, password } = req.body;
//     const hashpassword = bcrypt.genSalt(10, function (err, salt) {
//       bcrypt.hash(password, salt, function (err, hash) {
//         return hash;
//       });
//     });

//     let saveUser = { username, password };
//     fs.writeFile(dbPath, saveUser, (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//     });
//   })
// );

app.use("/api", signupRouter);

//Error Handling
app.use((err, req, res, next) => {
  res.send({ error: "Error Found" });
});

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
