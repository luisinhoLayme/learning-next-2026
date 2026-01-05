import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  const headerList = headers()

  const cookieStore = await cookies()
  cookieStore.set('hola', '30')

  const theme = req.cookies.get('theme')
  const refresh = req.cookies.get('refreshToken')

  console.log(requestHeaders.get('refreshToken'))
  // console.log(headerList.get('refreshToken'))

  cookieStore.set('miCookie', 'valorDeEjemplo', {
    httpOnly: true, // Solo accesible por el servidor
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    maxAge: 60 * 60 * 24 * 7, // 1 semana en segundos
    path: '/', // Disponible en toda la aplicación
  });

  console.log(theme)
  console.log(refresh)

  return new Response("<h1>Hi How's it going...</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark"
    }
  })
}
