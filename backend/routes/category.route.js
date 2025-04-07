import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import CategoryRouter from "../controllers/category.controller.js";
import rateLimiterMiddleware from "../middlewares/rateLimiter.js";

const router = Router();

router.get(
  "/:name",
  rateLimiterMiddleware,
  AsyncHandler.wrap(CategoryRouter.renderCategory)
);

export default router;
