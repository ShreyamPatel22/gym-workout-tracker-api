import * as repo from "../repositories/exerciseRepository.js";

export const createExercise = ({ name, muscle_group }) =>
  repo.createExercise({ name, muscle_group });

export const getAllExercises = () => repo.getAllExercises();

export const getExercise = async (id) => {
  const exercise = await repo.getExerciseById(id);
  if (!exercise) {
    const err = new Error("Exercise not found");
    err.status = 404;
    throw err;
  }
  return exercise;
};

export const updateExercise = async (id, data) => {
  await getExercise(id);
  return repo.updateExercise(id, data);
};

export const deleteExercise = async (id) => {
  await getExercise(id);
  return repo.deleteExercise(id);
};
