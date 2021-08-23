import express from "express";
import { sendEmail } from "../controllers/emailController.js";
import { bulkEmailValidator } from "../middleware/validatorMiddleware.js";
const router = express.Router();

router.route("/").post(bulkEmailValidator, sendEmail);

export default router;
