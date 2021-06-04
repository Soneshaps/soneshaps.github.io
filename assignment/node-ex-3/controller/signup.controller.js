const bcrypt = require("bcryptjs");
const { saveData, findData } = require("../helper/check");

function hashing(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

async function signupController(req, res, next) {
  const { username, password } = req.body;

  const userExist = await findData(username);
  console.log(userExist);

  if (userExist) {
    return res.status(400).send({ message: "Username alreay exist! " });
  }

  const hashedPassword = await hashing(password);

  saveData({ username: username, password: hashedPassword });

  res.send({ message: "successfully Registered!" });
}

module.exports = signupController;
