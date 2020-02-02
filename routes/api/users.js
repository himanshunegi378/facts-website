const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Fact = require("../../models/Fact");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/fetch_facts", (req, res) => {
  const all_facts = Fact.find({}, (err, facts) => {
    if (err) {
      console.log(err);
    }
    return res.json(facts);
  });
});

router.post("/add_fact", (req, res) => {
  let fact = new Fact({ fact: req.body.fact });
  fact.save((err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json({ added: true, fact: data });
  });
});

router.post("/bookmark/:id", (req, res) => {
  bearerHeader = req.headers.authorization;
  token = bearerHeader.split(" ")[1];

  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) {
      return res.json({ msg: err });
    }
    Fact.findById(req.params.id, (err, fact) => {
      if (err) {
        console.log(err);
      }
      let { id: userID } = decoded;
      User.findById(userID, (err, user) => {
        if (err) {
          console.log(err);
        }
        let dup = user.bookmarked_facts.some(bookmark => {
          return bookmark._id.equals(fact._id);
        });
        if (!dup) {
          user.bookmarked_facts.push(fact._id);
          user.save();
        }
      });
    });
    return res.json({ msg: req.params.id });
  });
});

router.get("/fetch_bookmarks", (req, res) => {
  bearerHeader = req.headers.authorization;
  token = bearerHeader.split(" ")[1];

  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) {
      return res.json({ msg: err });
    }

    User.findById(decoded.id, (err, user) => {
      if (err) {
        console.log(err);
      }
      bookmarkIDS = user.bookmarked_facts;
      Fact.find()
        .where("_id")
        .in(bookmarkIDS)
        .exec((err, records) => {
          bookmarkedFacts = records.map(item => {
            return item.fact;
          });
          return res.json({ msg: bookmarkedFacts });
        });
    });
  });
});

module.exports = router;
