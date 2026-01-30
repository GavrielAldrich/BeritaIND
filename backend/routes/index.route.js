import { Router } from "express";
import homeRouter from "./home.route.js";
import contactRouter from "./contact.route.js";
import categoryRouter from "./category.route.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/contact", contactRouter);
router.use("/", homeRouter);

export default router;
