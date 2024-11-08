import express from 'express';
import cors from 'cors';
import recordsRouter from './routes/record.js';
import problemsRouter from './routes/problem.js';
import coursesRouter from './routes/course.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import channelsRouter from './routes/channels.js';
import postsRouter from './routes/posts.js';
import userInfoRouter from './routes/userInfo.route.js';
import dotenv from 'dotenv';
import { defaultErrorHandler } from './middlewares/error.middleware.js';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/record', recordsRouter);
app.use('/problem', problemsRouter);
app.use('/course', coursesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/channels', channelsRouter);
app.use('/posts', postsRouter);
app.use('/users', userInfoRouter);

app.use(defaultErrorHandler);

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
