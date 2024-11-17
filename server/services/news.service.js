import axios from 'axios';
import db from '../db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const newsServices = {
    async fetchNewsFromAPI() {
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                params: {
                    country: 'us',
                    category: 'technology',
                    apiKey: process.env.NEWS_API_KEY
                }
            });

            return response.data.articles;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    async saveNewsToDB(articles) {
        const collection = await db.collection('news');
        
        for (const article of articles) {
            const newsItem = {
                title: article.title,
                date: new Date(article.publishedAt),
                imageURL: article.urlToImage,
                newsURL: article.url
            };

            // Kiểm tra xem tin tức đã tồn tại chưa
            const existingNews = await collection.findOne({ title: newsItem.title });

            if (existingNews) {
                // Cập nhật tin tức đã tồn tại
                await collection.updateOne(
                    { title: newsItem.title },
                    { $set: newsItem }
                );
            } else {
                // Thêm tin tức mới
                await collection.insertOne(newsItem);
            }
        }
    }
};

export default newsServices;
