const express = require('express');
const router = express.Router(); 
const produkController = require('../controllers/produk.controller');
const ProdukModel = require('../models/produk.model');
router.get('/produk', produkController.getDaftarProduk);
router.get('/produk/tambah', produkController.getFormTambah);
router.post('/produk/tambah', produkController.postTambahProduk);
router.get('/produk/edit/:id', produkController.getFormEdit);
router.post('/produk/edit/:id', produkController.postUpdateProduk);
router.post('/produk/hapus/:id', produkController.postHapusProduk);
router.get('/uji-keamanan', async (req, res) => {
  try {
    const inputPayload = req.query.kategori;

    // Skenario A: Kueri Rentan Injeksi
    //const hasil = await ProdukModel.getByKategoriInsecure(inputPayload);

    // Skenario B: Kueri Aman Prepared Statement
    const hasil = await ProdukModel.getByKategoriSecure(inputPayload);

    res.json({
      input: inputPayload,
      totalDataDitemukan: hasil.length,
      data: hasil
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;