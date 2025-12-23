'use client'

import { useState } from 'react'
import { EyeOff, EyeIcon } from 'lucide-react'
import Link from 'next/link'

const ResetPasswordForm = () => {
  const [showPass, setShowPass] = useState('password')
  const [showPassConfirm, setShowPassConfirm] = useState('password')

  return (
    <form action="" className="grid gap-5">
      <div className="relative">
        {showPass === 'password'
          ? <EyeOff
            onClick={() => setShowPass('text')}
            className="absolute right-4 top-1/2 text-secondary cursor-pointer -translate-y-1/2"
            size={20}
          />
          : <EyeIcon
            onClick={() => setShowPass('password')}
            className="absolute right-4 top-1/2 text-secondary cursor-pointer -translate-y-1/2"
            size={20}
          />
        }

        <input
          placeholder="New Password"
          name="password"
          className="bg-graylight p-2 pl-3 pr-10 w-full h-13 rounded-lg border-none outline-none focus:ring-3 focus:ring-primary/30"
          type={showPass}
        />
      </div>
      <div className="relative">
        {showPassConfirm === 'password'
          ? <EyeOff
            onClick={() => setShowPassConfirm('text')}
            className="absolute right-4 top-1/2 text-secondary cursor-pointer -translate-y-1/2"
            size={20}
          />
          : <EyeIcon
            onClick={() => setShowPassConfirm('password')}
            className="absolute right-4 top-1/2 text-secondary cursor-pointer -translate-y-1/2"
            size={20}
          />
        }

        <input
          placeholder="Confirm Password"
          name="password"
          className="bg-graylight p-2 pl-3 pr-10 w-full h-13 rounded-lg border-none outline-none focus:ring-3 focus:ring-primary/30"
          type={showPassConfirm}
        />
      </div>
      <div>
        <button type="submit" className="bg-primary hover:bg-blue-300 transition-colors w-full p-3 text-white rounded-lg font-medium cursor-pointer outline-none focus:ring-3 focus:ring-primary/30">Reset Password</button>
      </div>
      <div className="flex gap-2 justify-center">
        <p className="text-sm text-secondary">Return to Sign In</p>
        <Link href="/sign-in" className="text-sm text-primary-variant hover:underline">Sign In</Link>
      </div>
    </form>
  )
}

export default ResetPasswordForm
