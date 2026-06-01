import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger.js";



import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const limiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,
    max: 100
  });
app.use(helmet());
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/tasks",
  taskRoutes
);

app.use(
  "/api/v1/health",
  healthRoutes
);

app.use(
  "/api/v1/admin",
  adminRoutes
);
export default app;