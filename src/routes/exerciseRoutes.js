import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/exerciseController.js";

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
  requireAdmin,
  [body("name").notEmpty(), body("muscle_group").notEmpty()],
  validate,
  controller.createExercise
);

router.get("/", authenticate, controller.getAllExercises);

router.get("/:id", authenticate, [uuidParam], validate, controller.getExercise);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  [uuidParam, body("name").notEmpty(), body("muscle_group").notEmpty()],
  validate,
  controller.updateExercise
);

router.delete("/:id", authenticate, requireAdmin, [uuidParam], validate, controller.deleteExercise);

export default router;
