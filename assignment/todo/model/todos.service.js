const bookshelf = require("../config/database");

const Todos = bookshelf.model("Todos", {
  tableName: "todos",
});

module.exports = Todos;
