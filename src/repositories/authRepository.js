import prisma from "../lib/prisma.js";

export const findUserByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data) => prisma.user.create({ data });
