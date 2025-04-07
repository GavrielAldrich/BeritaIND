import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import ContactController from "../controllers/contact.controller.js";
import rateLimiterMiddleware from "../middlewares/rateLimiter.js";

const router = Router();

router.get(
  "/",
  rateLimiterMiddleware,
  AsyncHandler.wrap(ContactController.renderContact)
);

export default router;
