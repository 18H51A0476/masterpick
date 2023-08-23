const mongoose = require('mongoose');

// Define the College schema
const collegeSchema = new mongoose.Schema(
  {
    collegeName: { // Changed field name to collegeName
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the College model from the schema
const College = mongoose.model('College', collegeSchema);

// Export the College model
module.exports = College;
