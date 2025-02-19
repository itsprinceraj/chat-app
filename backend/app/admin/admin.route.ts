import express from "express";
import * as adminController from "./admin.controller";
import {
  authenticate,
  authorizeRoles,
} from "../common/middleware/auth.middleware";

const router = express.Router();

// Apply authentication middleware to all routes that need it
router
  .get(
    "/analytics",
    authenticate,
    authorizeRoles(["admin"]),
    adminController.getGrpAnalytics
  )
  .post(
    "/invite",
    authenticate,
    authorizeRoles(["admin"]),
    adminController.generateGroupInvitationLink
  )

  .get(
    "/",
    authenticate,
    authorizeRoles(["admin"]),
    adminController.getAllUsers
  )
  .get(
    "/:id",
    authenticate,
    authorizeRoles(["admin"]),
    adminController.getUserById
  )
  .delete(
    "/:id",
    authenticate,
    authorizeRoles(["admin"]),
    adminController.deleteUser
  );

export default router;
