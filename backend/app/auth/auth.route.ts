import express from "express";
import * as authController from "./auth.controller";
import * as validator from "./auth.validator";
// routes
const router = express.Router();

router.post("/signup", validator.signupValidator, authController.signup).post("/login", validator.loginValidator, authController.login)

export default router;