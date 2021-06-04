const { findData } = require("../helper/check");
const bcrypt = require("bcryptjs");

function checkPassword(plainPassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

async function loginController(req, res, next) {
  const { username, password } = req.body;

  const foundUser = await findData(username);

  if (!foundUser || !(await checkPassword(password, foundUser.password))) {
    return res
      .status(400)
      .send({ message: "username or password is not correct" });
  }

  res.send({ message: "login successful" });
}

module.exports = loginController;
