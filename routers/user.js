const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// Get Profile
router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});
// Get All Users
router.get("/",[auth, admin], async (req, res) => {
  const users = await User.find().sort("regDate");
  if (!users) {
    return res.status(404).json({
      message: "Users does not exist",
    });
  }
  res.send(users);
});
// New User
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: "Exist User",
    });
  }
  user = new User(
    _.pick(req.body, ["name", "email", "password", "isAdmin", "regDate"])
  );
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  user.isAdmin = false;
  await user.save().then((result) => {
    res.status(201).json({
      message: "User Created!",
      result: result,
    });
  });
});


let findUserById = async function(id){
  const user = await User.find({ _id: id });
  return user;
}


router.get('/:id', (req, res) => {
  const id = req.params['id'];
  let user= findUserById(id);
  user.then(userC => {
    res.json(userC[0]);
  });
});

router.get("/search/:key", async (req, res) => {
  const users = await User.find({
    $or: [{ email: { $regex: req.params.key } }],
  });
  if (!users) {
    res.status(404).json({
      message: 'No result'
    })
  }
  res.send(users);
});



/* Update User by Id with PUT and PATCH */

// update user by id (PUT)
router.put('/:id', [auth, admin], (req, res) => {
  const id = req.params['id'];
  const {
    name = '',
    email = '',
    password = '',
    isAdmin = false,
    regDate = new Date()
  } = req.body;

  findUserById(id).then(userC => 
    {
      let user = userC[0];
      const updatedUser = {
        id,
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        isAdmin: isAdmin || user.isAdmin,
        regDate: regDate || user.regDate,
      };
      res.send(updatedUser);
    }
  );

});

// update user by id (PATCH)
router.patch('/:id', [auth, admin], (req, res) => {
  const id = req.params['id'];
  const {
    name = '',
    email = '',
    password = '',
    isAdmin = false,
    regDate = new Date()
  } = req.body;

  findUserById(id).then(userC => 
    {
      let user = userC[0];
      const updatedUser = {
        id,
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        isAdmin: isAdmin || user.isAdmin,
        regDate: regDate || user.regDate,
      };
      
      User.updateOne({_id: req.params.id}, updatedUser).then(
        () => {
          res.status(201).json({
            message: 'User updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );

    }
  );

});


/* *********************************************** */

// delete user by id
router.delete('/:id', [auth, admin], (req, res) => {
  User.deleteOne({_id: req.params.id}).then(
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


module.exports = router;




