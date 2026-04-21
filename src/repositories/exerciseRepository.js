import prisma from "../lib/prisma.js";

export const createExercise = (data) => prisma.exercise.create({ data });

export const getAllExercises = () => prisma.exercise.findMany();

export const getExerciseById = (id) =>
  prisma.exercise.findUnique({ where: { id } });

export const updateExercise = (id, data) =>
  prisma.exercise.update({ where: { id }, data });

export const deleteExercise = (id) =>
  prisma.exercise.delete({ where: { id } });
