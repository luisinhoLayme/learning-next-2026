"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"

interface Props {
  text: string
  href: string
}

const ActiveLink: FC<Props> = ({ text, href }) => {
  const path = usePathname()
  // console.log(router)

  return (
    <Link
      href={href}
      className={ `block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 ${ path === href ? 'dark:text-blue-700' : 'dark:text-white' }  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700` }
    >
      { text }
    </Link>
  )
}

export default ActiveLink
