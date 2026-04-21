import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/auth.repository.js";

export const signup = async ({ first_name, last_name, email, password, date_of_birth, fitness_goal, role }) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    const err = new Error("Email already exists");
    err.status = 409;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await createUser({ first_name, last_name, email, password_hash, date_of_birth, fitness_goal, role });

  const { password_hash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token };
};
