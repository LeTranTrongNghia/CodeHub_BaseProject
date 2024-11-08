import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all posts
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving posts");
  }
});

// Get a single post by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("posts");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving post");
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      author: req.body.author,
      userID: req.body.userID,
      channelId: req.body.channelId,
      timeAgo: req.body.timeAgo,
      content: req.body.content,
      avatarURL: req.body.avatarURL,
      imageUrl: req.body.imageUrl || null,
      likes: req.body.likes || 0,
      comments: req.body.comments || 0,
      poll: req.body.poll || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    let collection = await db.collection("posts");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding post");
  }
});

// Update a post by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        content: req.body.content,
        updatedAt: new Date(),
      },
    };

    let collection = await db.collection("posts");
    let result = await collection.updateOne(query, updates);
    
    if (result.modifiedCount === 0) {
      return res.status(404).send("Post not found or no changes made");
    }

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});

// Delete a post by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("posts");
    let result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});

export default router;
