import { Router } from "express";
import homeRouter from "./home.route.js";

const router = Router();

router.use("/", homeRouter);

export default router