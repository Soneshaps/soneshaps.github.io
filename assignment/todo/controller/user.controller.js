const Users = require("../model/user.service");

async function createUser(req, res, next) {
  try {
    const { email, passwordHash } = req.body;

    var user = await Users.forge({
      email: email,
      password: passwordHash,
    })
      .save()
      .then((data) => {
        req.user = { id: data.id, email: data.email };
        res.send(data);
        next();
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          next("email already taken");
        }
        next("databaseError");
      });
  } catch (err) {
    if (err) {
      next(err);
    }
  }
}

async function getUser(req, res, next) {
  try {
    const { email } = req.body;

    const user = await Users.where({ email: email })
      .fetch({
        column: ["id", "email", "password"],
        require: false,
      })
      .then((data) => {
        req.user = {
          id: data.get("id"),
          email: data.get("email"),
          password: data.get("password"),
        };
        next();
      })
      .catch((err) => {
        next("Invalid username");
      });
  } catch (err) {
    next("DataBase error");
  }
}

function loginUser(req, res, next) {
  res.status(200).json({
    token: req.user.token,
    id: req.user.id,
    email: req.user.email,
  });
  res.end();
}

module.exports = { createUser, getUser, loginUser };
