const express = require("express");
const protect = require("../middlewares/authMiddleWare");
const {
  createBatch,
  updateBatch,
  getAllBatches,
  deleteBatch,
} = require("../lib/batchController");
const batchRouter = express.Router();

batchRouter.get("", protect, (req, res) => {
  getAllBatches(req, res);
});

batchRouter.put("/:batchId", protect, (req, res) => {
  updateBatch(req, res);
});

batchRouter.post("", protect, (req, res) => {
  createBatch(req, res);
});

batchRouter.delete("/:batchId", protect, (req, res) => {
  deleteBatch(req, res);
});

// Add more authentication routes here

module.exports = batchRouter;
