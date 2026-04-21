import { signup, login } from "../services/authService.js";

export const signupController = async (req, res, next) => {
  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
