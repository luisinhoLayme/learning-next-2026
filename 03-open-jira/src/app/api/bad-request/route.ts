import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams

  const message = searchParams.get('message') ?? 'Bad Request';

  return NextResponse.json({ ok: false, message }, {status: 400});
}
