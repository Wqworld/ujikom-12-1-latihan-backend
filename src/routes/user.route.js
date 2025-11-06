import express from "express";
import { checkRole, verifyToken } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const router = express.Router();

router.get("/", verifyToken, checkRole("ADMIN"), async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

export default router;