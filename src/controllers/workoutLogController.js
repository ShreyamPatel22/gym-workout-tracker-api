import * as service from "../services/workoutLogService.js";

export const createWorkoutLog = async (req, res, next) => {
  try {
    const log = await service.createWorkoutLog(req.user.id, req.body);
    res.status(201).json(log);
  } catch (err) { next(err); }
};

export const getWorkoutLogs = async (req, res, next) => {
  try {
    const logs = await service.getWorkoutLogs(req.user.id);
    res.status(200).json(logs);
  } catch (err) { next(err); }
};

export const getWorkoutLog = async (req, res, next) => {
  try {
    const log = await service.getWorkoutLog(req.params.id, req.user.id);
    res.status(200).json(log);
  } catch (err) { next(err); }
};

export const updateWorkoutLog = async (req, res, next) => {
  try {
    const log = await service.updateWorkoutLog(req.params.id, req.user.id, req.body);
    res.status(200).json(log);
  } catch (err) { next(err); }
};

export const deleteWorkoutLog = async (req, res, next) => {
  try {
    await service.deleteWorkoutLog(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
