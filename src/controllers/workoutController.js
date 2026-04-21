import * as service from "../services/workoutService.js";

export const createWorkout = async (req, res, next) => {
  try {
    const workout = await service.createWorkout(req.user.id, req.body);
    res.status(201).json(workout);
  } catch (err) { next(err); }
};

export const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await service.getWorkouts(req.user.id);
    res.status(200).json(workouts);
  } catch (err) { next(err); }
};

export const getWorkout = async (req, res, next) => {
  try {
    const workout = await service.getWorkout(req.params.id, req.user.id);
    res.status(200).json(workout);
  } catch (err) { next(err); }
};

export const updateWorkout = async (req, res, next) => {
  try {
    const workout = await service.updateWorkout(req.params.id, req.user.id, req.body);
    res.status(200).json(workout);
  } catch (err) { next(err); }
};

export const deleteWorkout = async (req, res, next) => {
  try {
    await service.deleteWorkout(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
