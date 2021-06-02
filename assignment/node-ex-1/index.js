const fs = require("fs");

fs.readFile("file.txt", "utf-8", function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

fs.appendFile("file.txt", " !!!!", function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Text Appended");
});

fs.writeFile("extra.txt", "Hello Extra World", "utf8", function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Extra File Created!");
});

fs.unlink("extra.txt", function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("File Deleted!");
});
