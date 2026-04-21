import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { authenticate } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/workoutLogController.js";

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
  [
    body("workout_id").isUUID(),
    body("exercise_id").isUUID(),
    body("sets").isInt({ min: 1 }),
    body("reps").isInt({ min: 1 }),
    body("weight").isFloat({ min: 0 }),
  ],
  validate,
  controller.createWorkoutLog
);

router.get("/", authenticate, controller.getWorkoutLogs);

router.get("/:id", authenticate, [uuidParam], validate, controller.getWorkoutLog);

router.put(
  "/:id",
  authenticate,
  [
    uuidParam,
    body("sets").optional().isInt({ min: 1 }),
    body("reps").optional().isInt({ min: 1 }),
    body("weight").optional().isFloat({ min: 0 }),
  ],
  validate,
  controller.updateWorkoutLog
);

router.delete("/:id", authenticate, [uuidParam], validate, controller.deleteWorkoutLog);

export default router;
