import express from "express";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import groupRoutes from "./group-chat/group.routes";
import chatRoutes from "./chats/chat.route";
import adminRoutes from "./admin/admin.route";
// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/chat", chatRoutes);
router.use("/group", groupRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
