require("dotenv").config();
require("./config/db").connect();

const express = require("express");
const auth = require("./middleware/authMiddleware");
const corsMiddleware = require('./middleware/coreMiddleware');
const Evaluation = require("./models/Evaluation");
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const evaluationRoutes = require('./routes/evaluationRoutes');
const evaluatorRoutes = require('./routes/evaluatorRoutes')
const resultRoutes = require('./routes/resultRoutes')
const cors = require('cors');
const corsOptions = { origin: 'http://localhost:3000', optionsSuccessStatus: 200 };

app.use(express.json());
app.use(corsMiddleware);
app.use('/evaluations', evaluationRoutes); 
app.use('/evaluator', evaluatorRoutes);
app.use(cors(corsOptions));
app.use(express.json());
app.use("/results", resultRoutes);


// Register
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, username, password, department, position } = req.body;

    if (!(username && password && first_name && last_name && department && position)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User already exists. Please login.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      department,
      position,
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
      const { username, password } = req.body;

      if (!(username && password)) {
          return res.status(400).send("All input is required");
      }

      const user = await User.findOne({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
              { user_id: user._id, username },
              process.env.TOKEN_KEY,
              {
                  expiresIn: "2h",
              }
          );
          user.token = token;

          return res.status(200).json(user);
      }

      return res.status(400).send("Invalid credentials");
  } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
  }
});

//check user display on home
app.get("/user", auth, async (req, res) => {
  try {
    const userId = req.user.user_id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//list member on form
app.get('/user/evaluations', auth, async (req, res) => {
  try {
    const loggedInUserId = req.userId;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("first_name last_name");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//save form
app.post('/evaluations', async (req, res) => {
  try {
    const { evaluators, evaluation, ...otherData } = req.body;

    if (!evaluation || !evaluators || evaluators.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const evaluationData = new Evaluation({
      evaluators: evaluators, 
      evaluation: evaluation,
      ...otherData
    });

    await evaluationData.save();
    res.status(200).json({ message: 'Evaluation saved successfully' });
  } catch (err) {
    console.error('Error saving evaluation:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/evaluations', async (req, res) => {
  try {
      const evaluations = await Evaluation.findOne();
      res.json(evaluations);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching evaluations' });
  }
});


module.exports = app;