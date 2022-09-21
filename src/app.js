require("dotenv").config();
const express = require("express");
const app = express();
const conn = require("./db/conn")

//router
const router = require("./routes/Router")

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(router)

//app.listen(8080, () => {console.log('rodando')})


module.exports = app;