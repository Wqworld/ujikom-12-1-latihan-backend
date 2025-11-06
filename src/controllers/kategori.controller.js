import { prisma } from "../config/prisma.js";

export const lihatSemuaKategori = async (req, res) => {
  try {
    const kategori = await prisma.kategori.findMany();
    res.status(200).json(kategori);
  } catch (error) {
    res.status(500).json({ massage: "kategori tidak di temukan" });
  }
};

export const tambahKategori = async (req, res) => {
  try {
    const { nama } = req.body;
    const kategori = await prisma.kategori.create({ data: { nama } });
    res.status(201).json(kategori);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah kategori", error: error.message });
  }
};

export const lihatKategoriId = async (req, res) => {
  try {
    const {id} = req.params;
    const kategori = await prisma.kategori.findUnique({where: {id: parseInt(id)}});
    res.status(200).json(kategori);
  } catch (error) {
    res.status(500).json({ massage: "kategori tidak di temukan" });
  }
} ;

export const updateKategori = async (req, res) => {
  try {
    const {id} = req.params;
    const {nama} = req.body;
    const kategori = await prisma.kategori.update({where: {id: parseInt(id)}, data: {nama : nama}});
    res.status(200).json(kategori);
  } catch (error) {
    res.status(500).json({ massage: "kategori tidak di temukan" });
  }
};

export const deleteKategori = async (req, res) => {
  try {
    const {id} = req.params;
    const kategori = await prisma.kategori.delete({where: {id: parseInt(id)}});
    res.status(200).json(kategori);
  } catch (error) {
    res.status(500).json({ massage: "kategori tidak di temukan" });
  }
};