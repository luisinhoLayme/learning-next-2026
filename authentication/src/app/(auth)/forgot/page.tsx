import ForgotForm from './forgot-form'

const Forgot = () => {
  return (
    <section className="">
      <p className="text-7xl sm:text-8xl text-center font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L.</p>
      <h1 className="text-3xl text-center mt-5 font-mochiy-pop-one ">Forgot password</h1>

      <div className="max-w-md mx-auto">
        <p className="text-secondary font-sans text-sm text-center my-5">Hate it when that happens!
          Whats your email address?
          We will send you a link to reset it</p>
        <ForgotForm />
      </div>
    </section>
  )
}

export default Forgot
