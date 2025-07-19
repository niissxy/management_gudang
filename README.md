## Aplikasi manajemen gudang barang 

Aplikasi manajemen gudang barang menggunakan Next JS + Neon DB

## fitur
- Header
- Lihat Daftar Barang
- Tambah Data Barang
- Edit Data Barang
- Hapus Data Barang

## Instalasi
## 1. Clone Repository
git clone https://github.com/nama-user/nama-repo.git
cd nama-repo

## 2. Install Dependency
git clone https://github.com/nama-user/nama-repo.git
cd nama-repo

## 3. Salin File .env dan Sesuaikan Isinya
cp .env.example .env
# contoh isi .env
DATABASE_URL="postgresql://user:password@localhost:5432/nama_database"

## 4. Setup Database
npx prisma generate
npx prisma migrate dev --name init

## 5. Jalankan Aplikasi
npm run dev

## Struktur Tabel - Barang

Tabel `barang` disimpan di database dan dikelola oleh Prisma:

| Kolom       | Tipe       | Keterangan                     |
|-------------|------------|--------------------------------|
| id          | Int        | Primary Key   
| nama        | String     | Nama barang                    |
| jumlah      | Int        | Stok saat ini                  |
| suplier     | String     | Nama suplier                   |
| kategori    | String     | Kategori barang                |
| harga       | Int        | Harga per unit (tanpa desimal) |
| created_at  | DateTime   | Otomatis saat insert           |
| updated_at  | DateTime   | Otomatis saat update           |

> Didefinisikan di `prisma/schema.prisma`
