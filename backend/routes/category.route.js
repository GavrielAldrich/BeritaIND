import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import CategoryRouter from "../controller/category.controller.js";

const router = Router();

router.get("/:name", AsyncHandler.wrap(CategoryRouter.name));

export default router;
