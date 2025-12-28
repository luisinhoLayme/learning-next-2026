import ThemeRadios from '@/components/ui/radio'
import { cookies } from 'next/headers'

async function getServer() {
  const cookie = await cookies()
  const theme = cookie.get('theme') || 'light'

  const validThemes = ['light', 'dark', 'custom']

  return {
    value: 'hola',
    // theme: validThemes.includes(theme) ? theme : 'light'
  }
}

export default async function Home() {
  // const greeting = await getServer()
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')?.value ?? 'light'
  console.log(themeCookie)

  const validThemes = ['light', 'dark', 'custom']

  const theme = validThemes.includes(themeCookie) ? themeCookie : 'light'
  console.log(theme)

  const res = await fetch('http://localhost:3001/api/hello')
  console.log(res)

  return (
    <main className="bg-red-200/10 dark:bg-pink-900/10">
      <ThemeRadios themeC={theme} />
    </main>
  );
}
