import express from "express";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const router = express.Router();

// 🧱 ADMIN dan OWNER boleh tambah produk
router.post("/", verifyToken, checkRole("ADMIN", "OWNER"), async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    const produk = await prisma.produk.create({ data: { nama, harga, stok } });
    res.status(201).json(produk);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah produk", error: error.message });
  }
});

// 📦 Semua role bisa lihat produk
router.get("/", verifyToken, async (req, res) => {
  const produk = await prisma.produk.findMany();
  res.json(produk);
});

export default router;
