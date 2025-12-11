import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EntryStatus } from "@/app/generated/prisma/enums";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { id } = await params

  try {
    const entry = await prisma.entry.findUnique({ where: { id } })
    if (!entry) {
      return NextResponse.json({ message: `Entry not found with id ${id}` }, { status: 400 });
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;

  try {
    const { description, status } = await req.json()

    const dataToUpdate: { description?: string, status?: EntryStatus } = {};

    if (description !== undefined) {
      if (typeof description !== 'string') return NextResponse.json({ message: 'description must be string' }, { status: 400 });
      dataToUpdate.description = description;
    }

    if (status !== undefined) {
      if (!(status in EntryStatus)) {
        return NextResponse.json({ message: `Invalid status. Use:: ${Object.keys(EntryStatus).join(', ')}` }, { status: 400 });
      }
      dataToUpdate.status = status as EntryStatus;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: 'No fields will be provided for updating.' }, { status: 400 });
    }

    const updateEntry = await prisma.entry.update({
      where: { id },
      data: dataToUpdate
    })
    // console.log(updateEntry)

    return NextResponse.json(updateEntry, { status: 200 });
  } catch (err: any) {
    console.error('Error:', err);

    if (err.code === 'P2025') {
      return NextResponse.json({ message: `Entry with ID ${id} not found.` }, { status: 404 });
    }
    return NextResponse.json({ message: `Internal Server Error ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const { id } = await params;

  try {
    // Elimina el registro y retorna el objeto eliminado
    await prisma.entry.delete({
      where: { id },
    });

    return NextResponse.json({ message: `Entry deleted successfully.` }, { status: 200 });
  } catch (error: any) {
    // Código P2025 de Prisma para "registro no encontrado"
    if (error.code === 'P2025') {
      return NextResponse.json({ message: `Entry with ID ${id} not found.` }, { status: 404 });
    }
    console.error(`eror`, error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}

