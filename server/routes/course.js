import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// Get a list of all courses
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("courses");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving courses");
  }
});

// Get a single course by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("courses");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving course");
  }
});

// Create a new course
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      author: req.body.author,
      image_cover: req.body.image_cover,
      language: req.body.language,
      language_short: req.body.language_short,
      title: req.body.title,
      video_link: req.body.video_link,
      video_id: req.body.video_id,
      lectures: req.body.lectures,
    };
    let collection = await db.collection("courses");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding course");
  }
});

// Update a course by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        author: req.body.author,
        image_cover: req.body.image_cover,
        language: req.body.language,
        language_short: req.body.language_short,
        title: req.body.title,
        video_link: req.body.video_link,
        video_id: req.body.video_id,
        lectures: req.body.lectures,
      },
    };

    let collection = await db.collection("courses");
    let result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating course");
  }
});

// Delete a course by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("courses");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting course");
  }
});

export default router;
