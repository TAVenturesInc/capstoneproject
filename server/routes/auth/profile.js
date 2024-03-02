const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const dbo = require("../../db/conn");

const userProfile = express.Router();

// Update user profile needs to still be implemented and also check for existing usernames/emails before edit can be confirmed
userProfile.route("/profile").put(async (req, res) => {
  try {
    const dbConnection = dbo.getDb();

    // Extract new username and email from the request body
    const { userId, newUsername, newEmail } = req.body;

    const currentUser = await dbConnection
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const unchangedUsername = currentUser.username === newUsername;
    const unchangedEmail = currentUser.email === newEmail;

    if (!unchangedUsername) {
      const existingUser = await dbConnection
      .collection("users")
      .findOne({ username: newUsername });
    
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Username already exists" });
      };
    }

    if (!unchangedEmail) {
      const existingEmail = await dbConnection
      .collection("users")
      .findOne({ email: newEmail });

      if (existingEmail) {
        return res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      };
    }

    // Update user information in the database
    const updateResult = await dbConnection
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username: newUsername, email: newEmail }}
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found or no changes made"})
    }
    
    const updatedUser = await dbConnection
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    // Send the updated user information in the response
    res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Profile udpated successfully",
    });
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = userProfile;
