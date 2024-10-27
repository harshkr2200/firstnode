const express = require("express");

const app = express();

app.use("/hello" ,(req, res) => {
  res.send("hello from the harsh sever test.....");
});

app.use("/" ,(req, res) => {
    res.send("this is our home page....");
  });

app.listen(3000, () => {
  console.log("sever is listening on port 3000");
});
