import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import progressServices from '../services/progress.service.js';

const progressController = {
  create: async (req, res, next) => {
    try {
      const result = await progressServices.createProgress(req.body);
      return sendResponse.success(
        res,
        result,
        MESSAGES.SUCCESS_MESSAGES.PROGRESS.CREATE,
      );
    } catch (error) {
      next(error);
    }
  },
  getPagination: async (req, res) => {
    const { page, limit } = req.query;
    const result = await progressServices.getProgress(page, limit);
    return sendResponse.success(
      res,
      result,
      MESSAGES.SUCCESS_MESSAGES.PROGRESS.GET_ALL,
    );
  },
  getById: async (req, res) => {
    const result = await progressServices.getProgressById(req.params.id);
    return sendResponse.success(
      res,
      result,
      MESSAGES.SUCCESS_MESSAGES.PROGRESS.GET_BY_ID,
    );
  },
  getByUserId: async (req, res) => {
    const result = await progressServices.getProgressByUserId(req.params.userId);
    return sendResponse.success(
      res,
      result,
      MESSAGES.SUCCESS_MESSAGES.PROGRESS.GET_BY_USER_ID,
    );
  },
  update: async (req, res) => {
    const result = await progressServices.updateProgress(req.params.id, req.body);
    return sendResponse.success(
      res,
      result,
      MESSAGES.SUCCESS_MESSAGES.PROGRESS.UPDATE,
    );
  },
  delete: async (req, res) => {
    await progressServices.deleteProgress(req.params.id);
    return sendResponse.success(
      res,
      '',
      MESSAGES.SUCCESS_MESSAGES.PROGRESS.DELETE,
    );
  },
};

export default progressController;