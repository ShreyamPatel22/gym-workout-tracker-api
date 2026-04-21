import * as repo from "../repositories/workoutRepository.js";

export const createWorkout = (user_id, { name, description }) =>
  repo.createWorkout({ user_id, name, description });

export const getWorkouts = (user_id) => repo.getWorkoutsByUser(user_id);

export const getWorkout = async (id, user_id) => {
  const workout = await repo.getWorkoutById(id);
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
  return workout;
};

export const updateWorkout = async (id, user_id, data) => {
  await getWorkout(id, user_id);
  return repo.updateWorkout(id, data);
};

export const deleteWorkout = async (id, user_id) => {
  await getWorkout(id, user_id);
  return repo.deleteWorkout(id);
};
