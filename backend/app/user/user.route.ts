import express from "express";
import * as userController from "./user.controller";
import { authenticate } from "../common/middleware/auth.middleware";
// routes
const router = express.Router();

router.post("/:token", authenticate, userController.acceptGroupInvitation);

export default router;
