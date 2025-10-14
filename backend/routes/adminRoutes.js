const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      // If 'role' is provided in the body, use it; otherwise, default to 'customer'
      role: role || "customer",
    });

    // The User model is assumed to handle password hashing before save
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (admin only) - Name, email and role
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Update fields if they are present in the request body, otherwise keep the current value
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      // Save the updated user
      const updatedUser = await user.save();

      res.json({ message: "User updated successfully", user: updatedUser });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    if (user) {
      // Delete the user document
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
