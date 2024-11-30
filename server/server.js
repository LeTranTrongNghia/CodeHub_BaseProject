import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { defaultErrorHandler } from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js';
import channelsRouter from './routes/channels.js';
import courseRouter from './routes/course.route.js';
import newsRouter from './routes/news.route.js';
import postsRouter from './routes/posts.js';
import problemsRouter from './routes/problem.js';
import recordsRouter from './routes/record.js';
import uploadRouter from './routes/upload.route.js';
import userRouter from './routes/user.route.js';
import userInfoRouter from './routes/userInfo.route.js';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
// Routes
app.use('/record', recordsRouter);
app.use('/problem', problemsRouter);
app.use('/course', courseRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/channels', channelsRouter);
app.use('/posts', postsRouter);
app.use('/users', userInfoRouter);
app.use('/news', newsRouter);
app.use('/upload', uploadRouter);

app.use(defaultErrorHandler);

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
