const db = require('../config/database');

const ProdukModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC');
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO produk (nama_produk, kategori, harga, stok)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.nama_produk,
      data.kategori,
      data.harga,
      data.stok
    ]);
    return result;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, data) => {
    const sql = `
      UPDATE produk
      SET nama_produk = ?, kategori = ?, harga = ?, stok = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.nama_produk,
      data.kategori,
      data.harga,
      data.stok,
      id
    ]);
    return result;
  },

  // Menghapus data produk berdasarkan id
  delete: async (id) => {
    const sql = 'DELETE FROM produk WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result;
  },

  // METODE TIDAK AMAN UNTUK EKSPERIMEN KEAMANAN LABORATORIUM
  getByKategoriInsecure: async (kategoriInput) => {
    const rawSql = `SELECT * FROM produk WHERE kategori = '${kategoriInput}'`;
    console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
    const [rows] = await db.query(rawSql);
    return rows;
  },

  // METODE AMAN MENGGUNAKAN PREPARED STATEMENT
  getByKategoriSecure: async (kategoriInput) => {
    const secureSql = 'SELECT * FROM produk WHERE kategori = ?';
    console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
    const [rows] = await db.query(secureSql, [kategoriInput]);
    return rows;
  }
};

module.exports = ProdukModel;