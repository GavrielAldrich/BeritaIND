import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import HomeController from "../controller/home.controller.js";

const router = Router();

router.get("/", AsyncHandler.wrap(HomeController.renderHome));

export default router;
