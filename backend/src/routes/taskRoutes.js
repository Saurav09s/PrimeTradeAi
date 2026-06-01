import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

import { taskValidation } from "../validators/taskValidator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(auth);

router.get("/", getTasks);
router.get("/:id", getTask);

router.post(
  "/",
  taskValidation,
  validate,
  createTask
);

router.put(
  "/:id",
  taskValidation,
  validate,
  updateTask
);

router.delete("/:id", deleteTask);

export default router;