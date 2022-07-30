const express = require("express");
const mongoose = require("mongoose");
const app = express();
const categories = require("./routers/categories");
const banner = require("./routers/banner");

const blog = require("./routers/blog");
const foodCategories = require("./routers/foods-category");
const drinkCategories = require("./routers/drinks-category");
const allCategories = require("./routers/all-categories");
const foodRouter = require("./routers/food");
const drinks = require("./routers/drink");
const user = require("./routers/user");
const auth = require("./routers/auth");
const contact = require("./routers/contact");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb+srv://mohamed:l3JwwF9vTTUHuTIN@cluster0.tyhr0.mongodb.net/sample_api?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB is connected....");
  })
  .catch((error) => console.log(`Connection Error..., ${error}`));

// ********** MIDDLEWARE *********//
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/categories", categories);
app.use("/api/banner", banner);

app.use("/api/blog", blog);
app.use("/api/food-categories", foodCategories);
app.use("/api/drink-categories", drinkCategories);
app.use("/api/all-categories", allCategories);
app.use("/api/foods", foodRouter);
app.use("/api/drinks", drinks);
app.use("/api/contact-us", contact);

// ? Authentication
app.use("/api/user", user);
app.use("/api/auth", auth);

//************* PORT ********************* */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening - ${port}`);
});
