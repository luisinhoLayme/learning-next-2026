import { Metadata } from "next";
import FormSignIn from '@/components/auth/form-sign-in'
import ButtonGoogle from '@/components/auth/button-google'

export const metadata: Metadata = {
  title: "Sign In",
  description: "Authentication OAuth - sign in",
};

const SignIn = () => {
  return (
    <section className="">
      <p className="text-7xl sm:text-8xl text-center font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L.</p>
      <h1 className="text-3xl text-center mt-5 font-mochiy-pop-one ">Sign In</h1>

      <div className="max-w-md mx-auto mt-10">
        <ButtonGoogle title="Sign in with google" />
      </div>

      <p className="text-secondary font-sans text-sm text-center my-5">Or sign in with email</p>

      <div className="max-w-md mx-auto">
        <FormSignIn />
      </div>
    </section>
  )
}

export default SignIn
