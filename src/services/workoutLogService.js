import * as repo from "../repositories/workoutLogRepository.js";
import { getWorkoutById } from "../repositories/workoutRepository.js";
import { getExerciseById } from "../repositories/exerciseRepository.js";

export const createWorkoutLog = async (user_id, { workout_id, exercise_id, sets, reps, weight, notes, performed_at }) => {
  const workout = await getWorkoutById(workout_id);
  if (!workout) {
    const err = new Error("Workout not found");
    err.status = 404;
    throw err;
  }
  if (workout.user_id !== user_id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  const exercise = await getExerciseById(exercise_id);
  if (!exercise) {
    const err = new Error("Exercise not found");
    err.status = 404;
    throw err;
  }

  return repo.createWorkoutLog({ workout_id, exercise_id, sets, reps, weight, notes, performed_at });
};

export const getWorkoutLogs = (user_id) => repo.getWorkoutLogsByUser(user_id);

export const getWorkoutLog = async (id, user_id) => {
  const log = await repo.getWorkoutLogById(id);
  if (!log) {
    const err = new Error("Workout log not found");
    err.status = 404;
    throw err;
  }
  if (log.workout.user_id !== user_id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return log;
};

export const updateWorkoutLog = async (id, user_id, data) => {
  await getWorkoutLog(id, user_id);
  return repo.updateWorkoutLog(id, data);
};

export const deleteWorkoutLog = async (id, user_id) => {
  await getWorkoutLog(id, user_id);
  return repo.deleteWorkoutLog(id);
};
