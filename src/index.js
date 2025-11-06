import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import produkRoutes from "./routes/produk.route.js";
import usersRoutes from "./routes/user.route.js";
import kategoriRoutes from "./routes/kategori.route.js";
const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/kategori", kategoriRoutes);

app.get("/", (req, res) => res.send("LANCARR JAYAAA"));

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));