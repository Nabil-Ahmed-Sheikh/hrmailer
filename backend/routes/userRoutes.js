import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  createUser,
  createMultiUser,
  getUsers,
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateAndParseMultiCreateUser,
} from "../middleware/validatorMiddleware.js";
const router = express.Router();

router.route("/").post(validateCreateUser, createUser).get(getUsers);
router
  .route("/multi")
  .post(upload.single("csv"), validateAndParseMultiCreateUser, createMultiUser);
export default router;
