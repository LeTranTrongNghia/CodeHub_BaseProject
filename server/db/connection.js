import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function createCollections() {
  try {
    const db = client.db("CodeHub");
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    if (!collectionNames.includes("posts")) {
      await db.createCollection("posts");
      console.log("Created 'posts' collection.");
    }
  } catch (err) {
    console.error("Error creating collections:", err);
  }
}

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await createCollections(); // Ensure the posts collection is created
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

export default client.db("CodeHub");