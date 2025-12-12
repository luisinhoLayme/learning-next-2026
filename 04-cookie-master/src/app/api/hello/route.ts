import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies()
  console.log(cookie.getAll())

  return NextResponse.json({msg: 'Hey...!!! What are you guys up to?', ...cookie.getAll()})
}
