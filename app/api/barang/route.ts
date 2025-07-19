import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { Concert_One } from "next/font/google";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const barang = await prisma.barang.findMany();
  return NextResponse.json(barang, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nama, jumlah, suplier, kategori, harga } = body;

    // Validasi input
    if (!nama || !jumlah || !suplier || !kategori || !harga) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const newBarang = await prisma.barang.create({
      data: {
        id,
        nama,
        jumlah: parseInt(jumlah),
        suplier,
        kategori,
        harga: parseFloat(harga),
      },
    });

    return NextResponse.json(newBarang, { status: 201 });
  } catch (error: any) {
    console.error("Error saat POST barang:", error);
    return NextResponse.json(
      { error: 'Gagal menambahkan barang' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, nama, jumlah, suplier, kategori, harga } = body;

  const updateBarang  = await prisma.barang.update({
    where: { id },
     data: {
        id,
        nama,
        jumlah: parseInt(jumlah),
        suplier,
        kategori,
        harga: parseFloat(harga),
      }
  })

  return NextResponse.json(updateBarang, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    // Pastikan ID ada
    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.barang.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Barang berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus barang:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}