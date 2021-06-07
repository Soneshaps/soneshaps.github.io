const bookshelf = require("../config/database");

bookshelf.plugin("registry");

const Users = bookshelf.model("Users", {
  tableName: "users",
  todo() {
    return this.hasMany("Todos");
  },
});

module.exports = Users;
