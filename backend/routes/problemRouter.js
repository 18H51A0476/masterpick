const express = require("express");
const protect = require("../middlewares/authMiddleWare");
const {
  getAllProblems,
  getProblemBySlug,
  createProblem,
  updateProblemBySlug,
} = require("../lib/problemController");

const problemRouter = express.Router();

problemRouter.get("", protect, (req, res) => {
  getAllProblems(req, res);
});

problemRouter.get("/:slug", protect, (req, res) => {
  getProblemBySlug(req, res);
});

problemRouter.put("/:slug", protect, (req, res) => {
  updateProblemBySlug(req, res);
});

problemRouter.post("", protect, (req, res) => {
  createProblem(req, res);
});

problemRouter.delete("/:slug", protect, (req, res) => {});

// Add more authentication routes here

module.exports = problemRouter;
