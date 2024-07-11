import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new test case
router.post("/", async (req, res) => {
  try {
    const newTestCase = {
      explanation: req.body.explanation,
      inputText: req.body.inputText,
      outputText: req.body.outputText,
    };

    const collection = await db.collection("testCases");
    const result = await collection.insertOne(newTestCase);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding test case");
  }
});

// Update a test case by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        explanation: req.body.explanation,
        inputText: req.body.inputText,
        outputText: req.body.outputText,
      },
    };

    const collection = await db.collection("testCases");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating test case");
  }
});

// Delete a test case by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("testCases");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting test case");
  }
});

export default router;
