import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import progressController from '../controllers/progress.controller.js';
import { MESSAGES } from '../constants/message.js';

const progressRouter = express.Router();

// Get a list of all progress
progressRouter.get('/', async (req, res) => {
  try {
    await progressController.getPagination(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.GET_ALL,
    });
  }
});

// Get a single progress by id
progressRouter.get('/:id', async (req, res) => {
  try {
    await progressController.getById(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.GET_BY_ID,
    });
  }
});

// Get progress by user ID
progressRouter.get('/user/:userId', async (req, res) => {
  try {
    await progressController.getByUserId(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.GET_BY_USER_ID,
    });
  }
});

// Create a new progress
progressRouter.post('/', async (req, res) => {
  try {
    await progressController.create(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.CREATE,
    });
  }
});

// Update a progress by id
progressRouter.put('/:id', async (req, res) => {
  try {
    await progressController.update(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.UPDATE,
    });
  }
});

// Delete a progress by id
progressRouter.delete('/:id', async (req, res) => {
  try {
    await progressController.delete(req, res);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: MESSAGES.ERROR_MESSAGES.PROGRESS.DELETE,
    });
  }
});

export default progressRouter;