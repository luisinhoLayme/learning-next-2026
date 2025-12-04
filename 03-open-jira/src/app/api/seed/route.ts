import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: "No tiene acceso a este servicio" });
  }

  return NextResponse.json({ message: "Proceso realizado correctamente" });
}
