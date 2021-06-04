const express = require("express");
const app = express();

app.use(express.json());
const signupRouter = require("./router/signup.router");
const loginRouter = require("./router/login.router");

app.use("/api", signupRouter);
app.use("/api", loginRouter);

//Error Handling
app.use((err, req, res, next) => {
  res.send({ error: "Error Found" });
});

app.listen(3000, () => {
  console.log("Listining on port 3000");
});
