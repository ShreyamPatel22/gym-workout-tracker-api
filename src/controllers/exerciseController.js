import * as service from "../services/exerciseService.js";

export const createExercise = async (req, res, next) => {
  try {
    const exercise = await service.createExercise(req.body);
    res.status(201).json(exercise);
  } catch (err) { next(err); }
};

export const getAllExercises = async (req, res, next) => {
  try {
    const exercises = await service.getAllExercises();
    res.status(200).json(exercises);
  } catch (err) { next(err); }
};

export const getExercise = async (req, res, next) => {
  try {
    const exercise = await service.getExercise(req.params.id);
    res.status(200).json(exercise);
  } catch (err) { next(err); }
};

export const updateExercise = async (req, res, next) => {
  try {
    const exercise = await service.updateExercise(req.params.id, req.body);
    res.status(200).json(exercise);
  } catch (err) { next(err); }
};

export const deleteExercise = async (req, res, next) => {
  try {
    await service.deleteExercise(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
