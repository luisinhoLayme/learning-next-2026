import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EntryStatus } from "@/app/generated/prisma/enums";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: Props) {
  const { id } = await params

  try {
    const entry = await prisma.entry.findUnique({where: { id }})
    if (!entry) {
      return NextResponse.json({ message: `Entry not found with id ${id}` }, { status: 400 });
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;

  try {
    const entry = await prisma.entry.findUnique({ where: { id } })
    if (!entry) {
      return NextResponse.json({ message: `Entry not found with id ${id}` }, { status: 400 });
    }

    const { description, status } = await request.json();
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

    return NextResponse.json(updateEntry, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
