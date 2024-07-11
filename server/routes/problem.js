import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all problems
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("problems");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving problems");
  }
});

// Get a single problem by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("problems");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving problem");
  }
});

// Create a new problem
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      difficulty: req.body.difficulty,
      type: req.body.type,
      statement: req.body.statement,
      constraints: req.body.constraints,
      testCases: req.body.testCases,
    };
    let collection = await db.collection("problems");
    let result = await collection.insertOne(newDocument);
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
        testCases: req.body.testCases,
      },
    };

    let collection = await db.collection("problems");
    let result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating problem");
  }
});

// Delete a problem
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("problems");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting problem");
  }
});

export default router;
