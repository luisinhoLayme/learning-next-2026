import { Metadata } from "next";
import ButtonGoogle from "@/components/auth/button-google";
import SignUpForm from './signup-form'

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Authentication OAuth - sign up",
};

const SignUp = () => {
  return (
    <section className="">
      <p className="text-7xl sm:text-8xl text-center font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L.</p>
      <h1 className="text-3xl text-center mt-5 font-mochiy-pop-one ">Sign Up</h1>

      <div className="max-w-md mx-auto mt-10">
        <ButtonGoogle title="Sign up with google" />
      </div>

      <p className="text-secondary font-sans text-sm text-center my-5">Or sign up with email</p>

      <div className="max-w-md mx-auto">
        <SignUpForm />
      </div>
    </section>
  )
}

export default SignUp
