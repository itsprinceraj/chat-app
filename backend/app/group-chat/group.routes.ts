import express from "express";
import * as groupController from "./group.controller";
import { authenticate } from "../common/middleware/auth.middleware";
// routes
const router = express.Router();

router
  .post("/", authenticate, groupController.createGrp)
  .post("/:id", authenticate, groupController.joinPublicGroup);

export default router;
