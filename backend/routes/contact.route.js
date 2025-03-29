import { Router } from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import ContactController from "../controller/contact.controller.js";

const router = Router();

router.get("/", AsyncHandler.wrap(ContactController.renderContact));

export default router;
