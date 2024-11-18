import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all channels
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("channels");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving channels");
  }
});

// Get a single channel by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("channels");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving channel");
  }
});

// Create a new channel
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      icon: req.body.icon,
    };
    let collection = await db.collection("channels");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding channel");
  }
});

// Update a channel by id
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        icon: req.body.icon,
      },
    };

    let collection = await db.collection("channels");
    let result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating channel");
  }
});

// Delete a channel by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("channels");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting channel");
  }
});

export default router;
