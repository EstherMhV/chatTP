const User = require("../db/models/userModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require('bcrypt');
const { AdminUserCreator, WorkerCreator, EmployerCreator, RegularUserCreator } = require('./FactoryUserPattern.js');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.register = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let creator;
    switch (req.body.role) {
      case 'admin':
        creator = new AdminUserCreator();
        break;
      case 'worker':
        creator = new WorkerCreator();
        break;
      case 'employer':
        creator = new EmployerCreator();
        break;
      default:
        creator = new RegularUserCreator();
    }

    // Create a new user with the hashed password and role
    const newUser = creator.createUser(req.body.name, req.body.email, hashedPassword);

    const user = await newUser.save();

    res.status(201).json({ message: `Utilisateur crée: ${user.email}`, role: user.role });
  } catch (error) {
    res.status(400).json({ message: "invalid request", error });
  }
}


exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // Compare the hashed password with the password from the request body
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "password incorrect" });
    }

    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      role: user.role
    };


      // Generate a JWT token with user data
      const token = await jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "10h" });
    // Send the user data to the client
    res.status(200).json({ userData: userData, token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id_user;
    const updates = req.body;

    await updateUserSchema.validate(updates);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id_user;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
