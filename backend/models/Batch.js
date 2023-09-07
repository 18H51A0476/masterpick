const mongoose = require("mongoose");

// Define the Batch schema
const batchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
        type:Boolean,
        default:true
    }
  },
  {
    timestamps: true,
  }
);

// Create the Batch model from the schema
const Batch = mongoose.model("Batch", batchSchema);

// Export the Batch model
module.exports = Batch;
