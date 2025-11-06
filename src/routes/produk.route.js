import express from "express";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";
import { deleteProduk, lihatProdukId, lihatSemuaProduk, tambahProduk, updateProduk } from "../controllers/produk.controller.js";

const router = express.Router();

// 🧱 ADMIN dan OWNER boleh tambah produk

router.post("/", verifyToken, checkRole("ADMIN","KASIR","OWNER"), tambahProduk);
router.get("/", verifyToken, lihatSemuaProduk)
router.get("/:id", verifyToken, lihatProdukId)
router.put("/:id", verifyToken, updateProduk);
router.delete("/:id", verifyToken, deleteProduk);

export default router;
