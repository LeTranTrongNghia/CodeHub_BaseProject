import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import { NEWS_API_CONFIG } from '../config/news.config.js';

const router = express.Router();

// Get all news
router.get("/", async (req, res) => {
    try {
        let collection = await db.collection("news");
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving news");
    }
});

// Fetch news from API and save to DB (changed from POST to GET)
router.get("/fetch", async (req, res) => {
    try {
        // Fetch news from News API
        const response = await axios.get(NEWS_API_CONFIG.BASE_URL, {
            params: {
                country: NEWS_API_CONFIG.COUNTRY,
                category: 'technology',
                pageSize: NEWS_API_CONFIG.PAGE_SIZE,
                apiKey: NEWS_API_CONFIG.API_KEY
            }
        });

        const articles = response.data.articles;
        const collection = await db.collection("news");

        // Process each article
        for (const article of articles) {
            const newsItem = {
                title: article.title,
                date: new Date(article.publishedAt),
                imageURL: article.urlToImage,
                newsURL: article.url
            };

            // Check if news already exists
            const existingNews = await collection.findOne({ title: newsItem.title });

            if (existingNews) {
                // Update existing news
                await collection.updateOne(
                    { title: newsItem.title },
                    { $set: newsItem }
                );
            } else {
                // Insert new news
                await collection.insertOne(newsItem);
            }
        }

        res.status(200).send({ message: "News updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching news: " + err.message);
    }
});

export default router;
