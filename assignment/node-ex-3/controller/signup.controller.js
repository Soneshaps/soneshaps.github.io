const bcrypt = require("bcryptjs");
const fs = require("fs");

function saveData(data) {
  const users = JSON.stringify(data);
  fs.appendFileSync("file.json", users + ",", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("data saved");
  });
}

async function signupController(req, res, next) {
  const { username, password } = req.body;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  saveData({ username: username, password: hashedPassword });

  res.send({ message: "signup successful" });
}

module.exports = signupController;
