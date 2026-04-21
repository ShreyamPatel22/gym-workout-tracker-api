import prisma from "../lib/prisma.js";

export const createWorkout = (data) => prisma.workout.create({ data });

export const getWorkoutsByUser = (user_id) =>
  prisma.workout.findMany({ where: { user_id } });

export const getWorkoutById = (id) =>
  prisma.workout.findUnique({ where: { id } });

export const updateWorkout = (id, data) =>
  prisma.workout.update({ where: { id }, data });

export const deleteWorkout = (id) =>
  prisma.workout.delete({ where: { id } });
