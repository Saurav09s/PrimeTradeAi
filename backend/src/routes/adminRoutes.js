import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { role } from "../middleware/role.js";
import { getUsers } from "../controllers/adminController.js";

const router = Router();

router.get(
  "/users",
  auth,
  role("ADMIN"),
  getUsers
);

export default router;