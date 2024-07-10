import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const routerProblem = express.Router();

// This section will help you get a list of all the problems.
routerProblem.get("/problem", async (req, res) => {
  let collection = await db.collection("problems");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
routerProblem.get("/problem/:id", async (req, res) => {
  let collection = await db.collection("problems");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
routerProblem.post("/problem", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      statement: req.body.statement,
      difficulty: req.body.difficulty,
      type: req.body.type,
      constraints: req.body.constraints
    };
    let collection = await db.collection("problems");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding problem");
  }
});

// This section will help you update a record by id.
routerProblem.patch("/problem/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        statement: req.body.statement,
        difficulty: req.body.difficulty,
        type: req.body.type,
        constraints: req.body.constraints
      },
    };

    let collection = await db.collection("problems");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating problem");
  }
});

// This section will help you delete a record
routerProblem.delete("/problem/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("problems");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting problem");
  }
});

export default routerProblem;