const express = require("express");
const authCheck = require("./authCheck");
const dbo = require("../../db/conn");

const userProfile = express.Router();

// Update user profile needs to still be implemented and also check for existing usernames/emails before edit can be confirmed
userProfile.route("/profile").put(authCheck, async (req, res) => {
  try {
    const dbConnection = dbo.getDb();

    // Retrieve user information from the authenticated user token
    const userId = req.user._id;

    // Extract new username and email from the request body
    const { newUsername, newEmail } = req.body;

    // Update user information in the database
    const updateResult = await dbConnection.collection("users").updateOne(
      { _id: userId },
      { $set: { username: newUsername, email: newEmail }}
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found or no changes made"})
    }

    // Send the updated user information in the response
    res.status(200).json({
      userId,
      userName: newUsername,
      email: newEmail,
      success: true,
    });
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = userProfile;
