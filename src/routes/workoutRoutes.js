import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { authenticate } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/workoutController.js";

const router = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const uuidParam = param("id").isUUID();

router.post(
  "/",
  authenticate,
  [body("name").notEmpty()],
  validate,
  controller.createWorkout
);

router.get("/", authenticate, controller.getWorkouts);

router.get("/:id", authenticate, [uuidParam], validate, controller.getWorkout);

router.put(
  "/:id",
  authenticate,
  [uuidParam, body("name").notEmpty()],
  validate,
  controller.updateWorkout
);

router.delete("/:id", authenticate, [uuidParam], validate, controller.deleteWorkout);

export default router;
