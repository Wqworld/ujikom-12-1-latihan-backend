import express from "express";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
import { tambahKategori, deleteKategori, lihatSemuaKategori, updateKategori } from "../controllers/kategori.controller.js";

const router = express.Router();

router.get("/", verifyToken, lihatSemuaKategori);
router.post("/", verifyToken, checkRole("ADMIN"), tambahKategori);
router.delete("/", verifyToken, checkRole("ADMIN"), deleteKategori);
router.put("/", verifyToken, checkRole("ADMIN"), updateKategori);

export default router;