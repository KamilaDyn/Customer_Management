const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();
var cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./config/keys").mongoURI;
//conect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(error => console.log(error));

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));
