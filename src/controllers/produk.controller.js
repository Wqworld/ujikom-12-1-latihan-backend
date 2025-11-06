import { prisma } from "../config/prisma.js";

export const tambahProduk = async (req, res) => {
  try {
    const { nama, kategoriId, harga, stok } = req.body;
    if (!nama || !kategoriId || !harga || !stok) return res.status(400).json({ message: "Semua field harus diisi" });

    const produk = await prisma.produk.create({ data: { nama, kategoriId, harga, stok } });
    res.status(201).json(produk);

  } catch (error) {
    res.status(500).json({ message: "Gagal menambah produk", error: error.message });
  }
}

export const lihatSemuaProduk = async (req, res) => {
  try {
    const kategoriId = req.query;

    const where = kategoriId ? { kategoriId } : {};

    const produk = await prisma.produk.findMany({
      where,
      include: { kategori: true },
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(produk);
  } catch (error) {
    res.status(500).json({ massage: "Tidak ada Produk" });
  }
};

export const lihatProudukId = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await prisma.findUnique({
      where: { id: parseInt(id) },
      include: { kategori: true }
    });

    if (!produk) return res.status(404).json({ massage: "produk tidak di temukan" });
    res.status(200).json(produk);
  } catch (error) {
    res.status(500).json({ massage: "Gagal mengambil Prouk" });
  }
};

export const updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const {nama, harga, stok, kategoriId } = req.body;

    const updated = await prisma.produk.update({
      where : {id: parseInt(id)},
      data: {
        nama : nama,
        harga: harga,
        stok : stok,
        kategoriId: kategoriId
      }
    });
    res.status(200).json({massage : "data berasil di update"});
  } catch (error) {
    res.status(500).json({massage: "Gagal menyimpan produk"})
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const {id} = req.params;
    await prisma.produk.delete( {
      where: {id: parseInt(id)},
    })
    res.status(200).json({massage: "produk berasil di hapus"});
  } catch (error) {
    res.status(500).json({massage: "data gagal di hapus"})
  }
}