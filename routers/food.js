const express = require("express");
const router = express.Router();
const { Food } = require("../models/foods");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


// ************************GET ALL ********************************
router.get("/", async (req, res) => {
  const foods = await Food.find();
  if (!foods) {
    return res.status(404).json({
      message: "Foods is empty",
    });
  }
  res.send(foods);
});

// ********************** TOTAL SUM ********************************

router.get("/budget", async (req, res) => {
  const Sum = await Food.find();
  let sum = 0;
  let TotalSum = await Food.aggregate([
    {
      $group: {
        _id: null,
        TotalAmount: {
          $sum: "$price",
        },
      },
    },
  ]);
  if (!Sum) {
    return res.status(404).json({
      message: "Foods is Empty",
    });
  }
  res.send(TotalSum);
});

// *************************** GET FRUITS ONLY******************
router.get("/fruits", async (req, res) => {
  let fruits = await Food.find({ categoryName: "Fruits" });
  if (!fruits) {
    res.json({ message: "Fruits is empty" });
  }
  res.send(fruits);
});

// ******************* GET VEGETABLES ONLY********************

router.get("/vegetables", async (req, res) => {
  let vegetables = await Food.find({ categoryName: "Vegetables" });
  if (!vegetables) {
    res.json({
      message: "vegetables is empty",
    });
  }
  res.send(vegetables);
});
// ******************* GET Meat and poultry ONLY********************

router.get("/meat-and-poultry", async (req, res) => {
  let meat = await Food.find({
    categoryName: "Meat and poultry",
  });
  if (!meat) {
    res.json({ message: "meat empty" });
  }
  res.send(meat);
});

// ******************* GET GRAINS ONLY********************

router.get("/grains", async (req, res) => {
  let grains = await Food.find({
    categoryName: "Grains, legumes, nuts and seeds",
  });
  if (!grains) {
    res.json({ message: "grains are empty " });
  }
  res.send(grains);
});
// ******************* GET Fish and seafood ONLY********************

router.get("/fish-and-seafood", async (req, res) => {
  let fish = await Food.find({
    categoryName: "Fish and seafood",
  });
  if (!fish) {
    res.json({
      message: "Fish and seafood are empty",
    });
  }
  res.send(fish);
});
// ******************* GET Eggs ONLY********************

router.get("/eggs", async (req, res) => {
  let Eggs = await Food.find({
    categoryName: "Eggs",
  });
  if (!Eggs) {
    res.json({
      message: "Eggs are empty",
    });
  }
  res.send(Eggs);
});
// ******************* GET Dairy Foods ONLY********************

router.get("/dairy-foods", async (req, res) => {
  let dairy = await Food.find({
    categoryName: "Dairy Foods",
  });
  if (!dairy) {
    res.json({
      message: "Dairy Foods are empty",
    });
  }
  res.send(dairy);
});
// ******************* GET Alcoholic drinks ONLY********************

router.get("/alcoholic-drinks", async (req, res) => {
  let alcoholic = await Food.find({
    categoryName: "Alcoholic drinks",
  });
  if (!alcoholic) {
    res.json({
      message: "Alcoholic drinks are empty",
    });
  }
  res.send(alcoholic);
});
// ******************* GET Non-alcoholic drinks ONLY********************

router.get("/non-alcoholic-drinks", async (req, res) => {
  let nonAlcoholic = await Food.find({
    categoryName: "Non-alcoholic drinks",
  });
  if (!nonAlcoholic) {
    res.json({
      message: "Non-alcoholic drinks are empty",
    });
  }
  res.send(nonAlcoholic);
});

// ******************* GET Hot drinks ONLY********************

router.get("/hot-drinks", async (req, res) => {
  let hotDrinks = await Food.find({
    categoryName: "Hot drinks",
  });
  if (!hotDrinks) {
    res.json({
      message: "Hot drinks are empty",
    });
  }
  res.send(hotDrinks);
});

// ******************* GET Juice and plant drinks ONLY********************

router.get("/juice-and-plant-drinks", async (req, res) => {
  let juice = await Food.find({
    categoryName: "Juice and plant drinks",
  });
  if (!juice) {
    res.json({
      message: "Juice and plant drinks are empty",
    });
  }
  res.send(juice);
});

// *****************GET PRODUCT NUMBERS****************************

router.get("/count", async (req, res) => {
  const products = await Food.find();
  res.send(products);
});

// *****************GET SORT BY DATE****************************

router.get("/date", async (req, res) => {
  const products = await Food.find().sort({ createdDate: 1 });
  res.send(products);
});
// *****************GET SORT BY New****************************

router.get("/new-products", async (req, res) => {
  const products = await Food.find({ newBadge: true });
  res.send(products);
});

// *****************GET SORT BY New****************************

router.get("/sale-products", async (req, res) => {
  const products = await Food.find({ saleBadge: true });
  res.send(products);
});
// *****************GET SORT BY SEARCH****************************

router.get("/search/:key", async (req, res) => {
  const products = await Food.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  if (!products) {
    res.status(404).json({
      message: 'No result'
    })
  }
  res.send(products);
});

// ? **********************NEW PRODUCT**********************************

router.post("/", [auth, admin], async (req, res) => {
  let food = new Food({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    rating: req.body.rating,
    categoryName: req.body.categoryName,
    newBadge: req.body.newBadge,
    saleBadge: req.body.saleBadge,
    oldPrice: req.body.oldPrice,
    newPrice: req.body.newPrice,
    qtyTotal: req.body.qtyTotal,
    total: req.body.total,
  });
  food = await food.save();

  res.status(201).send(food);
});

// *******************GET BY ID ******************************

router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return res.status(404).send("That type of id not found");
  }
  res.send(food);
});

// ? ****************** UPDATE FOOD *****************************

router.put("/:id", [auth, admin], async (req, res) => {
  const food = await Food.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      rating: req.body.rating,
      categoryName: req.body.categoryName,
      newBadge: req.body.newBadge,
      saleBadge: req.body.saleBadge,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
      qtyTotal: req.body.qtyTotal,
      total: req.body.total,
    },
    {
      new: true,
    }
  );
  if (!food) {
    return res.status(404).send("That type of id not found");
  }

  res.status(201).send(food);
});

// ! ******************DELETE FOOD***************************

router.delete("/:id", [auth, admin], async (req, res) => {
  const food = await Food.findByIdAndRemove(req.params.id);
  if (!food) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(food);
});

module.exports = router;
