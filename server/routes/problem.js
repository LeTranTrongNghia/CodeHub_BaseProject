import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Importing testCase router
import testCaseRouter from "./testCase.js";

// Mounting the testCaseRouter under /testCases path
router.use("/:id/testCases", testCaseRouter);

// Get all problems
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("problems");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching problems");
  }
});

// Get a single problem by id
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("problems");
    const query = { _id: new ObjectId(req.params.id) };
    const problem = await collection.findOne(query);

    if (!problem) {
      res.status(404).send("Problem not found");
      return;
    }

    // Fetch associated test cases based on testCaseIds array
    const testCaseIds = problem.testCases.map(tc => new ObjectId(tc.testCaseId));
    const testCasesCollection = await db.collection("testCases");
    const testCases = await testCasesCollection.find({ _id: { $in: testCaseIds } }).toArray();

    problem.testCases = testCases;
    res.status(200).send(problem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching problem");
  }
});

// Create a new problem
router.post("/", async (req, res) => {
  try {
    const newProblem = {
      title: req.body.title,
      difficulty: req.body.difficulty,
      type: req.body.type,
      statement: req.body.statement,
      constraints: req.body.constraints,
      testCases: req.body.testCases || [], // Array of test case objects
    };

    const collection = await db.collection("problems");
    const result = await collection.insertOne(newProblem);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding problem");
  }
});

// Update a problem by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        difficulty: req.body.difficulty,
        type: req.body.type,
        statement: req.body.statement,
        constraints: req.body.constraints,
        testCases: req.body.testCases || [], // Update testCases array
      },
    };

    const collection = await db.collection("problems");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating problem");
  }
});

// Delete a problem by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("problems");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting problem");
  }
});

export default router;
