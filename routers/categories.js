const express = require("express");
const router = express.Router();
const { Category } = require("../models/categories");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

router.post("/",[auth, admin], async (req, res) => {
  let category = new Category({
    name: req.body.name,
    value: req.body.value
  });
  category = await category.save();

  res.status(201).send(category);
});



/* router.get('/:id', async (req, res) => {
  const category = await Category.find({ _id: req.params.id });
  if (!category) {
    return res.status(404).json({ message: "That type of names not found..." });
  }
  res.send(category);
}); */

/* router.get("/:id", async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  if (!category) {
    return res.status(404).json({ message: "That type of id not found..." });
  }
  res.send(category);
}); */

let findCategoryById = async function(id){
  const categories = await Category.find();
  for(let category of categories){
    if(category._id == id)
      return category;
  }

}

router.get('/:id', (req, res) => {
  findCategoryById(req.params.id).then(
    (category) => {
      res.status(200).json(category);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  )});

router.get("/search/:name", async (req, res) => {
  const category = await Category.find({
    $or: [{ name: { $regex: req.params.name } }],
  });
  if (!category) {
    return res.status(404).json({ message: "That type of names not found..." });
  }
  res.send(category);
});

router.put('/:id',[auth, admin], (req, res) => {
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
    value: req.body.value,
    __v: 0
  });
  Category.updateOne({_id: req.params.id,name: req.body.name}, category).then(
    () => {
      res.status(201).json({
        message: 'Category updated successfully!',
        category: category
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

/* router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      value: req.body.value
    },
    {
      new: true,
    }
  );
  console.log(category);
  if (!category) {
    return res.status(404).send("That type of id not found");
  }

  res.status(201).send(category);
}); */

/* router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      value: req.body.value,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(category);
}); */

router.delete('/:id',[auth, admin], (req, res) => {
  Category.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

/* router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(category);
}); */
module.exports = router;
