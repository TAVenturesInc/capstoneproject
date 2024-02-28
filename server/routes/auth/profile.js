const express = require("express");
const authCheck = require("./authCheck");
const dbo = require("../../db/conn");

const userProfile = express.Router();

// Update user profile needs to still be implemented and also check for existing usernames/emails before edit can be confirmed
userProfile.route("/profile").put(authCheck, async (req, res) => {
  try {
    const dbConnection = dbo.getDb();

    const userId = req.user._id;

    const { newUsername, newEmail } = req.body;

    const updateResult = await dbConnection.collection("users").updateOne(
      { _id: userId },
      { $set: { username: newUsername, email: newEmail }}
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (updateResult.modifiedCount === 0) {
      return res.status(200).json({ success: true, message: "No changes made" });
    }

    res.status(200).json({
      userId,
      userName: newUsername,
      email: newEmail,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = userProfile;
