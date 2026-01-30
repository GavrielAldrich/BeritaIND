import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import HomeController from "../controllers/home.controller.js";
import rateLimiterMiddleware from "../middlewares/rateLimiter.js";

const router = Router();

router.get(
  "/",
  rateLimiterMiddleware,
  AsyncHandler.wrap(HomeController.renderHome)
);

export default router;
