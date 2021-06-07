const express = require("express");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const User = require("./model/user.service");

const ApiRouter = require("./api.routes");

app.use("/api", ApiRouter);

// app.use((err, req, res, next) => {
//   const { message } = err;
//   res.status(statusCode).json({
//     statusCode: statusCode,
//     message: message,
//   });
// });
app.listen(3000, () => {
  console.log("Listining on Port 3000");
});
