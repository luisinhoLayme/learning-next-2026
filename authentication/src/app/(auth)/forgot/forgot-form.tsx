'use client'

import Link from 'next/link'

const ForgotForm = () => {

  return (
    <form action="" className="grid gap-5">
      <div>
        <input
          placeholder="Email"
          name="mail"
          className="bg-graylight p-2 pl-3 w-full h-13 rounded-lg outline-none focus:ring-3 focus:ring-primary/30"
          type="email"
        />
      </div>
      <div>
        <button type="submit" className="bg-primary hover:bg-blue-300 transition-colors w-full p-3 text-white rounded-lg font-medium cursor-pointer outline-none focus:ring-3 focus:ring-primary/30">Sign In</button>
      </div>
      <div className="flex gap-2 justify-center">
        <p className="text-sm text-secondary">Return to</p>
        <Link href="/sign-in" className="text-sm text-primary-variant hover:underline">Sign In</Link>
      </div>
    </form>
  )
}

export default ForgotForm
