import express from "express";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
import { tambahKategori, deleteKategori, lihatSemuaKategori, updateKategori, lihatKategoriId } from "../controllers/kategori.controller.js";

const router = express.Router();

router.get("/", verifyToken, lihatSemuaKategori);
router.post("/", verifyToken, checkRole("ADMIN"), tambahKategori);
router.get("/:id", verifyToken, checkRole("ADMIN"), lihatKategoriId);
router.delete("/:id", verifyToken, checkRole("ADMIN"), deleteKategori);
router.put("/:id", verifyToken, checkRole("ADMIN"), updateKategori);

export default router;