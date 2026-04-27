import * as repo from "../repositories/exerciseRepository.js";

export const createExercise = async ({ name, muscle_group }) => {
  try {
    return await repo.createExercise({ name, muscle_group });
  } catch (err) {
    if (err.code === "P2002") {
      const conflict = new Error("Exercise name already exists");
      conflict.status = 409;
      throw conflict;
    }
    throw err;
  }
};

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
  try {
    return await repo.updateExercise(id, data);
  } catch (err) {
    if (err.code === "P2002") {
      const conflict = new Error("Exercise name already exists");
      conflict.status = 409;
      throw conflict;
    }
    throw err;
  }
};

export const deleteExercise = async (id) => {
  await getExercise(id);
  return repo.deleteExercise(id);
};
