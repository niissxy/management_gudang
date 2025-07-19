'use client';

import { useEffect, useState } from "react";
import Card from "../components/cards";

interface Barang {
  id: number;
  nama: string;
  jumlah: number;
  suplier: string;
  kategori: string;
  harga: number;
}

export default function Page() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [suplier, setSuplier] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');

  // State untuk mode edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState('');
  const [editJumlah, setEditJumlah] = useState('');
  const [editSuplier, setEditSuplier] = useState('');
  const [editKategori, setEditKategori] = useState('');
  const [editHarga, setEditHarga] = useState('');

  useEffect(() => {
    fetch('/api/barang')
      .then(response => response.json())
      .then(data => setBarang(data))
      .catch(error => console.error('Error fetching barang:', error));
  }, []);

  const addBarang = async () => {
    const response = await fetch('/api/barang', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, jumlah, suplier, kategori, harga }),
    });

    const newBarang: Barang = await response.json();
    setBarang(prev => [...prev, newBarang]);
    setNama(''); setJumlah(''); setSuplier(''); setKategori(''); setHarga('');
  };

  const startEdit = (b: Barang) => {
    setEditingId(b.id);
    setEditNama(b.nama);
    setEditJumlah(b.jumlah.toString());
    setEditSuplier(b.suplier);
    setEditKategori(b.kategori);
    setEditHarga(b.harga.toString());
  };

  const saveEdit = async () => {
    if (!editingId) return;

    const response = await fetch('/api/barang', {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        nama: editNama,
        jumlah: editJumlah,
        suplier: editSuplier,
        kategori: editKategori,
        harga: editHarga,
      }),
    });

    const updated = await response.json();
    setBarang(prev => prev.map(b => b.id === editingId ? updated : b));
    setEditingId(null);
  };

  const deleteBarang = async (id: number) => {
  const confirmDelete = confirm("Yakin ingin menghapus barang ini?");
  if (!confirmDelete) return;

  const response = await fetch('/api/barang', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    setBarang(prev => prev.filter(item => item.id !== id));
  } else {
    const data = await response.json();
    alert("Gagal menghapus: " + data.error);
  }
};


  return (
    <main>
      <Card title="Management Gudang">
        <div>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px' }}
            placeholder="masukkan nama barang..."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            type="number"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px' }}
            placeholder="masukkan jumlah barang..."
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px' }}
            placeholder="masukkan suplier..."
            value={suplier}
            onChange={(e) => setSuplier(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px' }}
            placeholder="masukkan kategori..."
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            type="number"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px' }}
            placeholder="masukkan harga..."
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addBarang}
          >
            Tambah Barang
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Suplier</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ maxWidth: '1000px' }}>
              {barang.length > 0 ? barang.map((b) => (
                <tr key={b.id}>
                  {editingId === b.id ? (
                    <>
                      <td>{b.id}</td>
                      
                      <td><input 
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }} 
                      value={editNama} 
                      onChange={(e) => setEditNama(e.target.value)} /></td>
                      
                      <td><input 
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '90px' }} 
                      value={editJumlah} 
                      onChange={(e) => setEditJumlah(e.target.value)} /></td>
                      
                      <td><input 
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '150px' }} 
                      value={editSuplier} 
                      onChange={(e) => setEditSuplier(e.target.value)} /></td>
                      
                      <td><input 
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '150px' }} 
                      value={editKategori} 
                      onChange={(e) => setEditKategori(e.target.value)} /></td>
                      
                      <td><input 
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '90px' }}
                      value={editHarga} onChange={(e) => 
                      setEditHarga(e.target.value)} /></td>
                      
                      <td>
                        <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Simpan</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Batal</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{b.id}</td>
                      <td>{b.nama}</td>
                      <td>{b.jumlah}</td>
                      <td>{b.suplier}</td>
                      <td>{b.kategori}</td>
                      <td>{b.harga}</td>
                      <td colSpan={2} style={{ textAlign: 'center' }}>
                        <button onClick={() => startEdit(b)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                        <button onClick={() => deleteBarang(b.id)} className="bg-red-500 text-white px-4 py-2 rounded">Hapus</button>
                      </td>

                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data barang tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .table-container {
            margin: 32px auto;
            max-width: 1000px;
          }
          table {
            color: black;
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px 16px;
            text-align: left;
          }
          th {
            background: #f5f5f5;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background: #fafafa;
          }
        `}</style>
      </Card>
    </main>
  );
}
