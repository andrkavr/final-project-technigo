import express from "express";
import listEndpoints from "express-list-endpoints";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

const createJWT = (_id) => {
  jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

// Route to get available endpoints
router.get("/", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json({ endpoints });
});

// Registration endpoint
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      // if so, set http status to a 400code
      res.status(400);
      // and throw new error with some info
      throw new Error("Please add all fields");
    }

    // Check if the current user trying to register is using an username or email that matches with the same username or email in the database, so they would have to choose something different
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }

    const salt = await bcrypt.genSalt(10);

    const user = new UserModel({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
    });

    await user.save();
    //create a token
    const token = await createJWT(user._id);
    res.status(201).json({
      id: user._id,
      email: user.email,
      response: "You have successfully been registered.",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "Could not create user",
      errors: err.errors,
      problem: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res
        .status(401)
        .json({ success: false, response: "Invalid email or password" });
    }
    res.status(200).json({
      success: true,
      response: {
        email: user.email,
        id: user._id,
        response: "Successfully logged in.",
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      response: {
        message: "Could not log in",
        errors: err.errors,
      },
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    await UserModel.find()
      .sort({ createdAt: "desc" })
      .exec()
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    res.json(error);
  }
});

export default router;
