import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(entries, {status: 200});
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { description } = await req.json()
    console.log({description})

    const newEntry = await prisma.entry.create({data: { description }})

    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
