const fs = require("fs");

function readFile(filename) {
  fs.readFile(filename, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
}

function appendFile(filename, text) {
  fs.appendFile(filename, text, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Text Appended");
  });
}

function writeFile(filename, text) {
  fs.writeFile(filename, text, "utf8", function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Extra File Created!");
  });
}

function deleteFile(filename) {
  fs.unlink(filename, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File Deleted!");
  });
}

module.exports = {
  readFile,
  appendFile,
  writeFile,
  deleteFile,
};
