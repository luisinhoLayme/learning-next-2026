'use client'

import { useActionState, useEffect, useState } from 'react'
import { EyeOff, EyeIcon, Loader } from 'lucide-react'
import Link from 'next/link'
import { signInAction } from './actions'
import FormError from '@/components/form-error'

const SignInForm = () => {
  const [showPass, setShowPass] = useState('password')

  const [state, action, pending] = useActionState(signInAction, undefined)

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state?.errors?.result) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, [state]);

  return (
    <form action={action} className="grid gap-5">
      <div>
        <input
          placeholder="Email"
          name="mail"
          className="bg-graylight p-2 pl-3 w-full h-13 rounded-lg outline-none focus:ring-3 focus:ring-primary/30"
          type="email"
        />
        <div className="">
          {<FormError error={state?.errors?.mail} />}
        </div>
      </div>
      <div className="">
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
            placeholder="Password"
            name="password"
            className="bg-graylight p-2 pl-3 pr-10 w-full h-13 rounded-lg border-none outline-none focus:ring-3 focus:ring-primary/30"
            type={showPass}
          />
        </div>
        <div className="">
          {<FormError error={state?.errors?.password} />}
        </div>
      </div>
      <div>
        <div className="text-sm flex justify-between mb-1">
          <label className="flex items-center ">
            <div className="relative">
              <input type="checkbox" name="remember" className="sr-only peer " />
              <div className="w-4 h-4 bg-gray-200 rounded-sm peer-checked:bg-primary transition-all duration-200 flex items-center justify-center peer-checked:[&>svg]:opacity-100 peer-focus:ring-3 peer-focus:ring-primary/30">
                <svg className="w-4 h-4 text-white opacity-0 " fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="ml-2 text-secondary text-sm">Keep me logged in</span>
          </label>
          <Link href="/forgot" className="text-primary-variant hover:underline">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-primary hover:bg-blue-300 flex justify-center items-center transition-colors w-full p-3 text-white rounded-lg font-medium cursor-pointer outline-none focus:ring-3 focus:ring-primary/30"
        >
          {pending ? <Loader className="animate-spin" /> : 'Sign In'}
        </button>
        {isVisible &&
          <div className="text-center text-sm bg-red-50 text-red-400 mt-1 p-3 rounded-lg">
            {state?.errors?.result?.message}
          </div>
        }
      </div>
      <div className="flex gap-2 justify-center">
        <p className="text-sm text-secondary">Don't have an account?</p>
        <Link href="/sign-up" className="text-sm text-primary-variant hover:underline">Sign Up</Link>
      </div>
    </form>
  )
}

export default SignInForm
