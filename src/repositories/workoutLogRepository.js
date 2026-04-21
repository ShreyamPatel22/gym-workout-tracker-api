import prisma from "../lib/prisma.js";

export const createWorkoutLog = (data) => prisma.workoutLog.create({ data });

export const getWorkoutLogsByUser = (user_id) =>
  prisma.workoutLog.findMany({
    where: { workout: { user_id } },
  });

export const getWorkoutLogById = (id) =>
  prisma.workoutLog.findUnique({ where: { id }, include: { workout: true } });

export const updateWorkoutLog = (id, data) =>
  prisma.workoutLog.update({ where: { id }, data });

export const deleteWorkoutLog = (id) =>
  prisma.workoutLog.delete({ where: { id } });
