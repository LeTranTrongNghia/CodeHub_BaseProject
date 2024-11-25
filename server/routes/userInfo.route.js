import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get a list of all users
router.get("/", async (req, res) => {
    try {
        let collection = await db.collection("users");
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving users");
    }
});

// Get a single user by id
router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("users");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.status(404).send("Not found");
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
});

// Create a new user
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        let collection = await db.collection("users");
        let result = await collection.insertOne(newDocument);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    }
});

// Update a user by id
router.put("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                username: req.body.username,
                address: req.body.address,
                avatar: req.body.avatar,
                cover_photo: req.body.cover_photo,
                position: req.body.position,
                skills: req.body.skills,
            },
        };

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);

        if (result.modifiedCount === 0) {
            throw new Error('No documents matched the query. Updated 0 documents.');
        }

        const updatedUser = await collection.findOne(query);
        res.status(200).send(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
});

// Delete a user by id
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("users");
        let result = await collection.deleteOne(query);

        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});

// Update savedPost for a user
router.put("/:id/savedPost", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = req.body.action === 'remove' 
            ? { $pull: { savedPost: req.body.postId } } // Xóa postId khỏi savedPost
            : { $addToSet: { savedPost: req.body.postId } }; // Thêm postId vào savedPost

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating savedPost");
    }
});

export default router;
