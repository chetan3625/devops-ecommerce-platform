// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");

const { mongoUri, port } = require("./config");

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const app = express();

// middleware
// CLIENT -> middleware -> SERVER -> CLIENT

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

// Connecting DB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((e) => console.log(e));

//CREATING AN API
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening at PORT ${port}`);
});

// GET, PUT, POST, DELETE, UPDATE -> CRUD
