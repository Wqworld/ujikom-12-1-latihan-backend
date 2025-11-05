import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { nama, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nama,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ message: "User berhasil dibuat", user });
  } catch (error) {
    res.status(500).json({ message: "Gagal register", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { nama, password } = req.body;

    const user = await prisma.user.findFirst({ where: { nama } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });

    const token = generateToken(user);

    res.json({
      message: "Login berhasil",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login gagal", error: error.message });
  }
};
