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
      likes: [],
      comments: [],
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
router.put("/:id", async (req, res) => {
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

// Update likes for a post by id
router.put("/:id/likes", async (req, res) => {
    const { userId, action } = req.body; // Get userId and action from request body
    const postId = req.params.id; // Get postId from request parameters

    try {
        const collection = db.collection("posts");
        const post = await collection.findOne({ _id: new ObjectId(postId) });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (action === 'like') {
            // Add userId to likes if not already present
            if (!post.likes.includes(userId)) {
                await collection.updateOne(
                    { _id: new ObjectId(postId) },
                    { $addToSet: { likes: userId } } // Use $addToSet to avoid duplicates
                );
            }
        } else if (action === 'unlike') {
            // Remove userId from likes if present
            await collection.updateOne(
                { _id: new ObjectId(postId) },
                { $pull: { likes: userId } } // Use $pull to remove the userId
            );
        } else {
            return res.status(400).send("Invalid action");
        }

        // Fetch the updated post to return the new likes array
        const updatedPost = await collection.findOne({ _id: new ObjectId(postId) });
        res.status(200).send(updatedPost.likes); // Return the updated likes array
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating likes");
    }
});

// Update content for a post by id
router.put("/:id/content", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                content: req.body.content, // Update content
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
        res.status(500).send("Error updating post content");
    }
});

// Add this route to handle adding comments
router.put("/:id/comments", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $push: {
                comments: req.body.comment, // Add the new comment to the comments array
            },
        };

        let collection = await db.collection("posts");
        let result = await collection.updateOne(query, updates);
        
        if (result.modifiedCount === 0) {
            return res.status(404).send("Post not found or no changes made");
        }

        // Fetch the updated post to return
        const updatedPost = await collection.findOne(query);
        res.status(200).send(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding comment");
    }
});

export default router;
