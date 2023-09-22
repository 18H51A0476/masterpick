const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      required: true,
    },
    outputFormat: {
      type: String,
      required: true,
    },
    constraints: {
      type: String,
      required: true,
    },
    sampleInputs: {
      type: [String],
      required: true,
    },
    sampleOutputs: {
      type: [String],
      required: true,
    },
    testcasesInputs: {
      type: [String],
      required: true,
    },
    testcasesOutputs: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
