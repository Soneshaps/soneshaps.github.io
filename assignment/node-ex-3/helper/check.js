const fs = require("fs");

function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile("file.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const user = JSON.parse(data);
      resolve(user);
    });
  });
}

async function saveData(data) {
  const totaldata = await readData();
  totaldata.push(data);
  const users = JSON.stringify(totaldata);
  fs.writeFileSync("file.json", users, (err) => {
    if (err) {
      throw err;
    }
    console.log("data saved");
  });
}

async function findData(data) {
  console.log(data);
  const users = await readData();

  const check = users.find((user) => user.username === data);
  return check;
}

module.exports = { readData, saveData, findData };
